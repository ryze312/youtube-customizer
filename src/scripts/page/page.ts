import { detourFunc } from "./detour.js";
import * as pageData from "./page/pageData.js";

function getBrowseId(endpoint: YTNavigationEndpoint): string | null {
    const browseEndpoint = endpoint.browseEndpoint;
    if (browseEndpoint) {
        return browseEndpoint.browseId;
    }

    return null;
}

// Detour setter and getter of pagePool
// To reuse the same ytd-browse element for home and subscriptions tab
function detourPageSet(this: Map<string, HTMLElement>, name: string, page: YTPage, origFunc: Function): any {
    if (name === "home") {
        name = "subscriptions"
        page.pageSubtype = "subscriptions";
    }

    return origFunc.call(this, name, page);
}

function detourPageGet(this: Map<string, HTMLElement>, name: string, origFunc: Function): any {
    if (name === "home") {
        name = "subscriptions"
    }

    return origFunc.call(this, name);
}

// Detour page fetch to modify page data
async function detourPageFetch(this: YTApp, event: any, eventData: YTPageFetchEventData, origFunc: Function): Promise<any> {
    const page = eventData.pageData.response;
    const browseId = getBrowseId(eventData.pageData.endpoint);

    eventData.pageData.response = await pageData.getNewPageData(this, page, browseId);
    return origFunc.call(this, event, eventData);
}


export default function setupDetour(app: YTApp, pageManager: YTPageManager) {
    app.onYtPageDataFetched = detourFunc(detourPageFetch, app.onYtPageDataFetched);

    if (window.ytCustomizerConfig.redirectHome) {
        const pageMap = pageManager.pagePool.pageNameToElement;

        // SAFETY: Replacing setter and getter of Map
        // SAFETY: TypeScript tries to set them as Map keys instead
        // @ts-ignore
        pageMap.set = detourFunc(detourPageSet, pageMap.set);
        // @ts-ignore
        pageMap.get = detourFunc(detourPageGet, pageMap.get);
    }
}
