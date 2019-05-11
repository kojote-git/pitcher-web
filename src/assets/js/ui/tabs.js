const DATA_TAB_ID_BINDING = "data-tab-id-binding";
const DATA_TAB_ID = "data-tab-id";
const DATA_ACTIVE_TAB = "data-active-tab";

const DEFAULT_SETTINGS = {
    tabIdBinding: DATA_TAB_ID_BINDING,
    tabId: DATA_TAB_ID,
    activeTab: DATA_ACTIVE_TAB,
    styles: {
        activeTab: [],
        activeTabIdBinding: []
    }
};

class TabController {
    constructor(settings) {
        if (!settings)
            this.settings = DEFAULT_SETTINGS;
        else {
            this.addAllProperties(settings, DEFAULT_SETTINGS);
            this.settings = settings;
        }
        this.tabBindings = document.querySelectorAll("[" + this.settings.tabIdBinding +"]");
        this.tabs = document.querySelectorAll("[" + this.settings.tabId + "]");
        this.tabBindings.forEach(t => t.addEventListener("click", (e) => this.setActiveTabEventHandler(e)));
        this.tabs.forEach(t => {
            if (!t.hasAttribute(this.settings.activeTab))
                this.hideTab(t.getAttribute(this.settings.tabId));
        });
    }

    setActiveTabEventHandler(e) {
        this.setActiveTab(e.target);
    }

    setActiveTab(targetElement) {
        let tabId = targetElement.getAttribute(this.settings.tabIdBinding);
        this.addClass(targetElement, this.settings.styles.activeTabIdBinding);
        this.tabBindings.forEach(t => {
            if (t.getAttribute(this.settings.tabIdBinding) !== tabId) {
                this.removeClass(t, this.settings.styles.activeTabIdBinding);
            }
        });
        this.displayTab(tabId);
        this.hideOtherTabs(tabId);
    }

    setActiveTabByName(id) {
        this.setActiveTab(document.querySelector(
           `[${this.settings.tabIdBinding}="${id}"]`
        ));
    }
    
    hideOtherTabs(activeTabId) {
        this.tabs.forEach(t => {
            let tabId = t.getAttribute(this.settings.tabId);
            if (tabId === activeTabId)
                return;
            this.hideTab(tabId); 
        });
    }
    
    hideTab(tabId) {
        let tab = this.getTab(tabId);
        tab.removeAttribute(this.settings.activeTab);
        this.removeClass(tab, this.settings.styles.activeTab);
        tab.classList.add("hidden");
    }
    
    displayTab(tabId) {
        let tab = this.getTab(tabId);
        tab.setAttribute(this.settings.activeTab, "");
        this.addClass(tab, this.settings.styles.activeTab);
        tab.classList.remove("hidden");
    }
    
    getTab(tabId) {
        return document.querySelector("[" + this.settings.tabId + "='" + tabId + "']");
    };

    addAllProperties(target, source) {
        for (let k in source) {
            if (!target.hasOwnProperty(k))
                target[k] = source[k];
        }
    }
    
    removeClass(element, classList) {
        if (classList.length !== 0)
            element.classList.remove(classList);
    }
    
    addClass(element, classList) {
        if (classList.length !== 0)
            element.classList.add(classList);
    }
}