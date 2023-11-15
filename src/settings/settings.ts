class ConfigOption extends HTMLElement {
    constructor() {
        super();

        const localizedText = browser.i18n.getMessage(this.i18nMessage);
        const text = document.createTextNode(localizedText);
        this.append(text);

        this.addEventListener("change", () => setConfigOption(this.key, this.enabled));
        this.addEventListener("click", () => this.enabled = !this.enabled);
    }

    get i18nMessage(): string {
        return this.getAttribute("msg") as string;
    }

    get key(): string {
        return this.getAttribute("key") as string;
    }

    set enabled(value: boolean) {
        if (value) {
            this.setAttribute("enabled", "");
            this.className = "config-option-enabled";
        } else {
            this.removeAttribute("enabled");
            this.className = "";
        }

        this.dispatchEvent(new Event("change"));
    }

    get enabled(): boolean {
        return this.hasAttribute("enabled");
    }
}

class ConfigSection extends HTMLElement {
    constructor() {
        super();
        
        const heading = document.createElement("h4");
        const localizedHeading = browser.i18n.getMessage(this.i18nMessage);
        const text = document.createTextNode(localizedHeading);
        heading.className = "config-heading";
        heading.appendChild(text);

        const enableButton = document.createElement("button");
        const localizedEnable = browser.i18n.getMessage("enableAllButton");
        const enableText = document.createTextNode(localizedEnable);
        enableButton.addEventListener("click", () => this.enabled = true);
        enableButton.appendChild(enableText);

        const disableButton = document.createElement("button");
        const localizedDisable = browser.i18n.getMessage("disableAllButton");
        const disableText = document.createTextNode(localizedDisable);
        disableButton.addEventListener("click", () => this.enabled = false);
        disableButton.appendChild(disableText);

        const buttons = document.createElement("div");
        buttons.className = "config-buttons";
        buttons.append(enableButton, disableButton);

        this.prepend(heading);
        this.append(buttons);
    }

    set enabled(value: boolean) {
        const options = this.getElementsByTagName("config-option") as HTMLCollectionOf<ConfigOption>;
        for (const option of options) {
            option.enabled = value;
        }
    }

    get i18nMessage(): string {
        return this.getAttribute("msg") as string;
    }
}

async function setConfigOption(key: string, value: any) {
    browser.storage.sync.set({[key]: value})
}

async function populateOptions() {
    const config = await browser.storage.sync.get();
    const options = document.getElementsByTagName("config-option") as HTMLCollectionOf<ConfigOption>;
    
    for (const option of options) {
        option.enabled = config[option.key];
    }
}

window.customElements.define("config-option", ConfigOption);
window.customElements.define("config-section", ConfigSection);
populateOptions();

