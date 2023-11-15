import * as store from "./store.js";
import { getInner } from "../utils.js";

async function hashStr(str: string): Promise<string> {
    const bytes = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest("SHA-1", bytes);
    const hashBuffer = new DataView(hash);
    
    let hashStr = "";
    for (let offset = 0; offset < hashBuffer.byteLength; offset += 4) {
        const num = hashBuffer.getUint32(offset, false); // NOTE: Big Endian here is intentional, otherwise hex is reversed
        hashStr += num.toString(16).padStart(8, '0');
    }

    return hashStr;
}

function getSAPISID(): string {
    const cookie = document.cookie;
    const start = cookie.indexOf("SAPISID=") + 8;
    const end = cookie.indexOf(';', start);

    return cookie.substring(start, end);
}

// Auth token format is
// SAPISIDHASH {unix_seconds}_{hash}
// Where {hash} is SHA1 hash computed from the following string
// {unix_seconds} {SAPISID} {origin_url}
// See: https://stackoverflow.com/questions/16907352/reverse-engineering-javascript-behind-google-button#32065323
async function getAuthToken(): Promise<string> {
    const unixSeconds = Math.trunc(Date.now() / 1000);
    const SAPISID = getSAPISID();
    const hash = await hashStr(`${unixSeconds} ${SAPISID} https://www.youtube.com`);
    const token = `SAPISIDHASH ${unixSeconds}_${hash}`;

    return token;
}

// YouTube uses signals to indicate the action to execute on button press
// Unfortunately not all signals are clearly defined,
// Thus we have to resort to determening and defining them ourselves
function getSignal(button: YTButtonRenderer): string {
    if (button.menuRequest) {
        return button.menuRequest.signalServiceEndpoint.signal;
    }

    if (button.navigationEndpoint?.signInEndpoint) {
        return "SIGNIN";
    }

    return "CREATE"
}

async function updateCache(app: YTApp, pageData: YTPageData, browseId: string | null) {
    if (browseId !== "FEwhat_to_watch" && browseId !== "FEsubscriptions") {
        return;
    }

    // If we're on the home page, change page data to subscriptions page data 
    // Then duplicate it to subscriptions key, so we won't have to fetch it again.
    // Otherwise, we're on subscriptions page, just copy it to home key.

    let responseStore = app.ephemeralResponseStore;
    if (browseId === "FEwhat_to_watch") {
        await store.changePageData("service:browse/browseId:FEwhat_to_watch", pageData, responseStore);
        await store.duplicate("service:browse/browseId:FEwhat_to_watch", "service:browse/browseId:FEsubscriptions", responseStore);
    } else {
        await store.duplicate("service:browse/browseId:FEsubscriptions", "service:browse/browseId:FEwhat_to_watch", responseStore);
    }
}

async function getSubscriptionsPageData(): Promise<YTPageData> {
    const ytConfig = window.yt.config_;

    const context = ytConfig["INNERTUBE_CONTEXT"];
    const apiKey = ytConfig["INNERTUBE_API_KEY"];
    const loggedIn = ytConfig["LOGGED_IN"];
    const url = `https://www.youtube.com/youtubei/v1/browse?key=${apiKey}&prettyPrint=false`

    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            Authorization: loggedIn ? await getAuthToken() : "",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            browseId: "FEsubscriptions",
            context: context
        })
    });

    const pageData = await response.json();
    return pageData;
}

function getNewButtons(buttons: any[]): any[] {
    const config = window.ytCustomizerConfig;
    const newButtons = [];

    for (const button of buttons) {
        const innerButton = getInner(button) as YTButtonRenderer;
        const signal = getSignal(innerButton);

        let push = true;
        switch(signal) {
            case "CREATE": {
                push = config.topbarCreateButton;
                break;
            }
            case "GET_NOTIFICATIONS_MENU": {
                push = config.topbarNotificationsButton;
                break;
            }
            case "GET_ACCOUNT_MENU": {
                push = config.topbarAccountButton;
                break;
            }
            case "SIGNIN": {
                push = config.topbarSignInButton;
                break;
            }
        }

        if (push) {
            newButtons.push(button);
        }
    }

    return newButtons;
}

function modifyPageData(pageData: YTPageData): YTPageData {
    const config = window.ytCustomizerConfig;
    const topbar = pageData.topbar.desktopTopbarRenderer;

    if (!config.topbarLogo) {
        delete topbar.logo;
    }

    if (!config.topbarSearch) {
        delete topbar.searchbox;
    }

    if (!config.topbarVoiceSearchButton) {
        delete topbar.voiceSearchButton;
    }

    topbar.topbarButtons = getNewButtons(topbar.topbarButtons);
    pageData.customized = true;

    return pageData;
}

export async function getNewPageData(app: YTApp, pageData: YTPageData, browseId: string | null): Promise<YTPageData> {
    if (pageData.customized) {
        // Page was cached, no need to modify
        return pageData;
    }

    if (window.ytCustomizerConfig.redirectHome && browseId === "FEwhat_to_watch") {
        pageData = await getSubscriptionsPageData();
    }

    pageData = modifyPageData(pageData);

    if (window.ytCustomizerConfig.redirectHome) {
        // Update cache since pageData reference possibly has changed
        updateCache(app, pageData, browseId);
    }

    return pageData;
}
