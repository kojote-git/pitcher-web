const authorizationFormTabsController = new TabController({
    tabIdBinding: DATA_TAB_ID_BINDING,
    tabId: DATA_TAB_ID,
    activeTab: DATA_ACTIVE_TAB,
    styles: {
        activeTab: [],
        activeTabIdBinding: [
            "auth-form-tab-control-active"
        ]
    }
});

const representsCompanyCheckBox = document.getElementById("represents-company");
const companyName = document.getElementById("company-name")

representsCompanyCheckBox.addEventListener("click", (e) => {
    if (!representsCompanyCheckBox.checked) {
        companyName.disabled = true;
    } else {
        companyName.disabled = false;
    }
});

const queryParams = new URLSearchParams(window.location.search);
const formTab = queryParams.get("form_tab");

if (formTab === "sign-in") {
    authorizationFormTabsController
        .setActiveTabByName("sign-in");
} else if (formTab === "sign-up") {
    authorizationFormTabsController
        .setActiveTabByName("sign-up");
}