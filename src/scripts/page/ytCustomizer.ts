import setupPageDetour from "./page.js";
import setupGuideDetour from "./guide.js";
import setupFF2MpvDetour from "./ff2mpv.js";

// TODO: Do the general review and clean up before release

{
    const app = document.getElementsByTagName("ytd-app")[0] as YTApp; 
    const pageManager = document.getElementById("page-manager") as YTPageManager;
    const guideService = document.getElementById("guide-service") as YTGuideService;

    setupPageDetour(app, pageManager);
    setupGuideDetour(guideService);
    setupFF2MpvDetour(app);
}
