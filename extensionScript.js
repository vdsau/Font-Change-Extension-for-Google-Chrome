window.onload = function (e) {

    var enabled = false;

    let switchBtn = document.getElementById("extensionSwitch");

    switchBtn.addEventListener("click", function (e) {

        var tabDetails = { windowId: chrome.windows.WINDOW_ID_CURRENT, active: true, currentWindow: true };

        if (enabled = !enabled) {
            chrome.tabs.query(tabDetails, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { msg: "enableExt" }, function () {
                    chrome.tabs.insertCSS({
                        file: 'pageStyle.css'
                    });
                });
            });  // chrome.tabs.query
        }
        else {
            chrome.tabs.query(tabDetails, function (tabs) {
                chrome.tabs.reload(tabs[0].id);
            });
        }
    }); // addEventListener
}