// Initialize the interview state when the extension is first loaded
chrome.runtime.onInstalled.addListener(() => {
    updateInterviewState('not_started');
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.action) {
        case 'startInterview':
            startInterview();
            updateInterviewState("not_uploaded_background");
            break;
        case 'showAddBackgroundInputs': 
            updateInterviewState("adding_background");
        default: 
            break;
    } 
});

function startInterview() {
    chrome.tabs.create({ url: 'https://chat.openai.com/' }, function (tab) {
        // content.js will be executed according to configuration in manifest.json
    });
}

function updateInterviewState(newState) {
    chrome.storage.local.set({ interviewState: newState });
}




  