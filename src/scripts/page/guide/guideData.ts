import * as utils from "../utils.js";

function shouldRemoveRenderer(renderer: YTGuideDataItem): boolean {
    // Removing guide entries based on their icon
    const inner = utils.getInner(renderer) as YTGuideDataRenderer;
    const iconType = inner.icon.iconType;
    return !window.ytCustomizerConfig[iconType];
}

function getNewCollapsableSection(section: YTGuideDataItem): any {
    const inner = utils.getInner(section);
    inner.sectionItems = getNewRenderers(inner.sectionItems);

    if (shouldRemoveRenderer(inner.headerEntry)) {
        // Don't leave the header empty
        // Replace with the first collapsed item 
        inner.headerEntry = inner.sectionItems.shift();
    }

    if (inner.sectionItems.length > 0) {
        return section;
    }

    // If only the header left, unpack and just use it
    return inner.headerEntry ? inner.headerEntry : null;
}

function getNewCollapsableRenderer(renderer: YTGuideDataItem): any {
    const inner = utils.getInner(renderer) as YTGuideDataCollapsibleRenderer;
    inner.expandableItems = getNewRenderers(inner.expandableItems);

    return inner.expandableItems.length > 0 ? renderer : null;
}

function getNewDownloadsRenderer(renderer: YTGuideDataItem): any {
    const inner = utils.getInner(renderer) as YTGuideDataDownloads;
    return shouldRemoveRenderer(inner.entryRenderer) ? null : renderer; 
}

function getNewRenderer(renderer: YTGuideDataItem): any {
    switch (utils.getInnerName(renderer)) {
        case "guideCollapsibleSectionEntryRenderer": {
            return getNewCollapsableSection(renderer);
        }
        case "guideCollapsibleEntryRenderer": {
            return getNewCollapsableRenderer(renderer);
        }
        case "guideDownloadsEntryRenderer": {
            return getNewDownloadsRenderer(renderer);
        }
        default: {
            return shouldRemoveRenderer(renderer) ? null : renderer;
        }
    }
}

function getNewRenderers(renderers: YTGuideDataItem[]): any {
    const newRenderers = [];

    for (const renderer of renderers) {
        const newRenderer = getNewRenderer(renderer);
        if (newRenderer) {
            newRenderers.push(newRenderer);
        }
    }

    return newRenderers;
}

function modifySection(section: YTGuideDataItem): any {
    const inner = utils.getInner(section) as YTGuideSection;
    inner.items = getNewRenderers(inner.items);

    return inner.items.length > 0 ? section : null;
}


function getNewSection(section: YTGuideDataItem): any {
    switch (utils.getInnerName(section)) {
        case "guideSigninPromoRenderer": {
            return window.ytCustomizerConfig.disableSigninPromo ? null : section;
        }
        case "guideSubscriptionsSectionRenderer": {
            return window.ytCustomizerConfig.disableSubscriptions ? null : section;
        }
        default: {
            return modifySection(section);
        }
    }
}

function getNewSections(sections: YTGuideDataItem[]): any {
    const newSections = [];

    for (const section of sections) {
        const newSection = getNewSection(section);
        if (newSection) {
            newSections.push(newSection);
        }
    }

    return newSections;
}

export function getNewGuide(guide: YTGuideData): YTGuideData {
    guide.items = getNewSections(guide.items);
    return guide;
}
