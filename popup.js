document.addEventListener('DOMContentLoaded', function () {
  // Get the currently active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    
    if (currentTab && currentTab.url && currentTab.url.startsWith("https://chat.openai.com")) {
      // If the current tab is on the ChatGPT page, display "Start a mock interview"
      document.getElementById('message').textContent = 'Start a mock interview';
      
      // Add a click event listener to the "Start a mock interview" message
      document.getElementById('message').addEventListener('click', function () {
        // Send a message to the content script to start a new chat session and inject a message
        chrome.tabs.sendMessage(currentTab.id, { action: 'startInterview' });
      });
    } else {
      // If the current tab is not on the ChatGPT page, display the link to it
      const link = document.createElement('a');
      link.href = 'https://chat.openai.com/';
      link.textContent = 'GPT Buddy';
      link.target = '_blank'; // Open link in a new tab
      document.getElementById('message').appendChild(link);
    }
  });
});
