chrome.runtime.onInstalled.addListener(() => {
    resetState();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "injectText") return; // handled by content.js

    fetch('http://localhost:5000/getPrompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: request.action }),
    })
    .then(response => response.json())
    .then(data => {
        const prompt = data.prompt;
        console.log(request.action);
        if (request.action === "Unknown action") {
            return;
        }
        if (request.action === "openChat") {
            handleOpenChat(prompt);
        } else if (request.action === "endInterview") {
            handleEndInterview(prompt);
        } else if (request.action === "uploadResume") {
            const resume = request.extractedText;
            injectPromptViaContentScript(prompt + resume, true);
        } else if (request.action === "addJobDescription") {
            injectPromptViaContentScript(prompt, false);
        } else {
            injectPromptViaContentScript(prompt, true);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function injectPromptViaContentScript(text, send) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        // Inject the content script into the active tab
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['scripts/content.js']
        }, () => {
            // Send a message to the content script with the job description
            chrome.tabs.sendMessage(tabs[0].id, { action: "injectText", text: text, send: send });
        });
    });
}

function handleOpenChat(prompt) {
    chrome.tabs.create({ url: 'https://chat.openai.com/' }, function(tab) {
        // Listen for the tab update to complete loading
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo, tab) {
            if (tabId === tab.id && changeInfo.status === 'complete') {
                // Now the tab is ready, inject the script and send the message
                injectPromptViaContentScript(prompt, true);
                chrome.tabs.onUpdated.removeListener(listener);
            }
        });
    });
}

function handleEndInterview(prompt) {
    injectPromptViaContentScript(prompt, true);
    resetState();
}

function resetState() {
    chrome.storage.local.set({ interviewState: 'not_started' });
    chrome.storage.local.set({ hasResume: false });
    chrome.storage.local.set({ hasJobDesc: false });
}

  