// background.js

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'openNewTab') {
      chrome.tabs.create({ url: 'https://chat.openai.com/' }, function (tab) {
        // No need to inject content script here; it's specified in manifest.json
      });
    }
  });
  