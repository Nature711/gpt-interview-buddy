// popup.js

document.addEventListener('DOMContentLoaded', function () {
    const startMockInterviewButton = document.getElementById('startMockInterview');
  
    startMockInterviewButton.addEventListener('click', function () {
      chrome.runtime.sendMessage({ action: 'openNewTab' });
    });
  });
  