chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
    });
  }
});


chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  if (message.type === 'consoleLog') {
    // Log the console message received from the content script
    console.log('Received console log:', message.message);
    // You can now process or display the log message in your extension.
  }
});