import { detourFunc } from "./detour.js";
import * as popup from "./popup.js";

function openMpvPopup(app: YTApp) {
    const confirmButton: YTPopupButton = popup.createButton("Close", YTButtonStyle.BlueText, YTButtonSize.Default);
    const confirmDialog: YTConfirmDialog = popup.createConfirmDialog("YouTube Customizer", "Video has been opened in mpv", confirmButton);
    const confirmPopup = popup.createConfirmPopup(confirmDialog);
    
    popup.openPopup(app, YTPopupType.Dialog, confirmPopup);
}

function detourNavigate(this: YTApp, event: any, eventData: YTNavigateEventData, origFunc: Function): any {
    const videoId = eventData.endpoint.watchEndpoint?.videoId;

    if (videoId) {
        window.ff2mpv(videoId);
        openMpvPopup(this);

        return;
    }

    return origFunc.call(this, event, eventData);
}


export default function setupDetour(app: YTApp) {
    if (window.ytCustomizerConfig.ff2mpvEnabled) {
        app.onYtNavigate = detourFunc(detourNavigate, app.onYtNavigate);
    }
}
