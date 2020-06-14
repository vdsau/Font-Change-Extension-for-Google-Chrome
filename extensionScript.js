window.onload = function (e) {

    var tabDetails = { windowId: chrome.windows.WINDOW_ID_CURRENT, active: true, currentWindow: true };

    var ctabs = chrome.tabs;

    ctabs.query(tabDetails, function (tabs) {
        let currentTab = tabs[0];

        let isEnabled = localStorage.getItem(currentTab.url) || false;

        let switchBtn = document.getElementById("extensionSwitch");

        switchBtn.checked = isEnabled;
        console.log("Switch status: " + switchBtn.checked);

        switchBtn.addEventListener("click", function (e) {
            if (isEnabled = !isEnabled) {
                ctabs.query(tabDetails, function (tabs) {
                    ctabs.sendMessage(currentTab.id, { msg: "enableExt" }, function () {
                        ctabs.insertCSS({
                            file: 'pageStyle.css'
                        });
                    });
                    localStorage.setItem(currentTab.url, isEnabled);
                });  // ctabs.query
            }
            else {
                ctabs.query(tabDetails, function (tabs) {
                    localStorage.removeItem(currentTab.url);
                    ctabs.reload(currentTab.id);
                });
            }
        }); //  switchBtn.addEventListener
    }); // ctabs.query
}