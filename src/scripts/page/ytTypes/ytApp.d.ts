interface YTApp extends HTMLElement {
    ephemeralResponseStore: YTResponseStore
    onYtPageDataFetched: Function
    onYtNavigate: Function
    openPopup: (action: YTAction) => void
}

interface YTResponseStore {
    get: (key: string) => Promise<{
        data: YTResponse
    }>,
    putInternal: (key: string, response: YTResponse) => void
}

interface YTResponse {
    key: string
    innertubeResponse: YTPageData
}
