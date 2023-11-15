interface YTPageManager extends HTMLElement {
    pagePool: {
        pageNameToElement: Map<string, YTPage>
    }
}

interface YTPage {
    pageSubtype: string
}

interface YTPageData {
    contents: any[]
    header: any[],
    topbar: {
        desktopTopbarRenderer: YTTopbar,
    }
    customized?: boolean
}

interface YTTopbar {
    logo: any
    searchbox: any,
    voiceSearchButton: any
    topbarButtons: any[],
}

interface YTButtonRenderer {
    menuRequest?: YTMenuRequest,
    menuRenderer?: any 
    navigationEndpoint?: YTNavigationEndpoint
}

interface YTMenuRequest {
    signalServiceEndpoint: {
        signal: string
    }
}

interface YTNavigationEndpoint {
    browseEndpoint?: YTBrowseEndpoint
    signInEndpoint?: any
    watchEndpoint?: YTWatchEndpoint
}

interface YTBrowseEndpoint {
    browseId: string
}

interface YTWatchEndpoint {
    videoId: string
}

interface YTPageFetchEventData {
    pageData: {
        response: YTPageData
        endpoint: YTNavigationEndpoint
    }
}

interface YTNavigateEventData {
    endpoint: YTNavigationEndpoint
}
