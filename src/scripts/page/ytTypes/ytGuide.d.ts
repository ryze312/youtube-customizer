interface YTGuideService extends HTMLElement {
    guideUserStateOpened: boolean,
    setGuideDataAfterInit: Function,
    fetchGuideData: Function,
    closeGuide: () => void
}

interface YTGuideRenderer extends HTMLElement {
    showFooter: boolean
}

interface YTGuideData {
    items: YTGuideDataItem[]
}

interface YTGuideSection {
    items: YTGuideDataItem[]
}

// This is wrapper for the guide item itself
// with only one key as the name of the type, holding the item object.
// We use utils.getInner and utils.getInnerName to find out what item it holds 
interface YTGuideDataItem {
    [key: string]: any
}

interface YTGuideDataRenderer {
    icon: {
        iconType: string
    }
}

interface YTGuideDataDownloads {
    entryRenderer: YTGuideDataItem
}

interface YTGuideDataCollapsibleSection {
    headerEntry: YTGuideDataItem
    sectionItems: YTGuideDataItem[]
}

interface YTGuideDataCollapsibleRenderer {
    expandableItems: YTGuideDataItem[]
}
