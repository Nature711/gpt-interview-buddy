chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ interviewState: 'not_started' });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "openChat") {
        chrome.tabs.create({ url: 'https://chat.openai.com/' }, function(tab) {
            // Listen for the tab update to complete loading
            chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo, tab) {
                if (tabId === tab.id && changeInfo.status === 'complete') {
                    // Now the tab is ready, inject the script and send the message
                    injectPromptViaContentScript("Let's start an interview");
                }
            });
        });
    } else if (request.action === "addJobDescription") {
        injectPromptViaContentScript("Here's the job description:");
    }
});

function injectPromptViaContentScript(text) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        // Inject the content script into the active tab
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['scripts/content.js']
        }, () => {
            // Send a message to the content script with the job description
            chrome.tabs.sendMessage(tabs[0].id, { action: "injectText", text: text  });
        });
    });
}
