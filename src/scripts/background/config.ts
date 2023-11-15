declare global {
    interface Window {
        ytCustomizerConfig: Config        
    }
}

export type Config = {
    [key: string]: boolean,
    WHAT_TO_WATCH: boolean,
    TAB_SHORTS: boolean,
    SUBSCRIPTIONS: boolean,
    VIDEO_LIBRARY_WHITE: boolean,
    ACCOUNT_BOX: boolean,
    WATCH_HISTORY: boolean,
    MY_VIDEOS: boolean,
    WATCH_LATER: boolean,
    OFFLINE_DOWNLOAD: boolean,
    LIKES_PLAYLIST: boolean,
    PLAYLISTS: boolean,
    ADD_CIRCLE: boolean,
    TRENDING: boolean,
    MUSIC: boolean,
    CLAPPERBOARD: boolean,
    LIVE: boolean,
    GAMING_LOGO: boolean,
    NEWS: boolean,
    TROPHY: boolean,
    COURSE: boolean,
    FASHION_LOGO: boolean,
    YOUTUBE_RED_LOGO: boolean,
    CREATOR_STUDIO_RED_LOGO: boolean,
    YOUTUBE_MUSIC: boolean,
    YOUTUBE_KIDS_ROUND: boolean,
    SETTINGS: boolean,
    FLAG: boolean,
    HELP: boolean,
    FEEDBACK: boolean,
    topbarLogo: boolean,
    topbarSearch: boolean,
    topbarVoiceSearchButton: boolean,
    topbarCreateButton: boolean,
    topbarNotificationsButton: boolean,
    topbarAccountButton: boolean,
    topbarSignInButton: boolean,
    disableSigninPromo: boolean,
    disableSubscriptions: boolean,
    disableFooter: boolean,
    startGuideClosed: boolean,
    redirectHome: boolean
    ff2mpvEnabled: boolean
}

const defaultConfig: Config = {
    WHAT_TO_WATCH: true,
    TAB_SHORTS: true,
    SUBSCRIPTIONS: true,
    VIDEO_LIBRARY_WHITE: true,
    ACCOUNT_BOX: true,
    WATCH_HISTORY: true,
    MY_VIDEOS: true,
    WATCH_LATER: true,
    OFFLINE_DOWNLOAD: true,
    LIKES_PLAYLIST: true,
    PLAYLISTS: true,
    ADD_CIRCLE: true,
    TRENDING: true,
    MUSIC: true,
    CLAPPERBOARD: true,
    LIVE: true,
    GAMING_LOGO: true,
    NEWS: true,
    TROPHY: true,
    COURSE: true,
    FASHION_LOGO: true,
    YOUTUBE_RED_LOGO: true,
    CREATOR_STUDIO_RED_LOGO: true,
    YOUTUBE_MUSIC: true,
    YOUTUBE_KIDS_ROUND: true,
    SETTINGS: true,
    FLAG: true,
    HELP: true,
    FEEDBACK: true,
    topbarLogo: true,
    topbarSearch: true,
    topbarVoiceSearchButton: true,
    topbarCreateButton: true,
    topbarNotificationsButton: true,
    topbarAccountButton: true,
    topbarSignInButton: true,
    disableSigninPromo: false,
    disableSubscriptions: false,
    disableFooter: false,
    startGuideClosed: false,
    redirectHome: false,
    ff2mpvEnabled: false
}

export let config: Config;

browser.runtime.onInstalled.addListener((event) => {
    if (event.reason === "install") {
        browser.storage.sync.set(defaultConfig);
    }
});

browser.runtime.onMessage.addListener((videoId) => {
    browser.runtime.sendNativeMessage("ff2mpv", {url: `https://youtu.be/${videoId}`});
});

browser.storage.sync.get()
    .then((installedConfig) => config = installedConfig as Config);
