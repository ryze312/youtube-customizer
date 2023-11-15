function ff2mpv(videoId: string) {
    browser.runtime.sendMessage(videoId);
}

// Firefox doesn't support ExecutionWorld.MAIN yet
// So just inject manually
// See: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/scripting/ExecutionWorld
async function injectScript() {
    const config = await browser.storage.sync.get();

    // SAFETY: Cannot import Config from config.ts, because content scripts aren't modules
    // SAFETY: WrappedJObject and exportFunction aren't defined in @types module, so use ts-ignore
    // @ts-ignore
    window.wrappedJSObject.ytCustomizerConfig = cloneInto(config, window);
    // @ts-ignore
    exportFunction(ff2mpv, window, {defineAs: "ff2mpv"})

    const script = document.createElement("script");
    script.type = "module";
    script.src = browser.runtime.getURL("scripts/page/ytCustomizer.js");

    document.head.appendChild(script);
}

injectScript();

