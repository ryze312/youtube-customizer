import { detourFunc } from "./detour.js";
import * as guideData from "./guide/guideData.js";

// Detour guide fetch to modify guide data
async function detourGuideFetch(this: YTGuideService, origFunc: Function): Promise<YTGuideData> {
    let guide = await origFunc.call(this);
    guide = guideData.getNewGuide(guide);

    return guide;
}

// Detour guide after it's init once to disable footer
// Guide renderer gets created only after calling setGuideDataAfterInit
function detourAfterInit(this: YTGuideService, data: any, origFunc: Function): any {
    let ret = origFunc.call(this, data);

    if (window.ytCustomizerConfig.disableFooter) {
        const guideRenderer = document.getElementById("guide-renderer") as YTGuideRenderer;
        guideRenderer.showFooter = false;
    }

    if (window.ytCustomizerConfig.startGuideClosed) {
        // NOTE: closeGuide doesn't update guideUserStateOpened, do it manually
        this.closeGuide();
        this.guideUserStateOpened = false; 
    }

    // Restore original function, we don't need do this more than once
    this.setGuideDataAfterInit = origFunc;
    return ret;   
}

export default function setupDetour(guideService: YTGuideService) {
    guideService.fetchGuideData = detourFunc(detourGuideFetch, guideService.fetchGuideData);
    guideService.setGuideDataAfterInit = detourFunc(detourAfterInit, guideService.setGuideDataAfterInit);
}
