// Retrieve the interview state and update the UI
chrome.storage.local.get('interviewState', (data) => {
    const interviewState = data.interviewState;
    updatePopupUI(interviewState);
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    const startInterviewButton = document.getElementById('startButton');
    const addBackgroundButton = document.getElementById('addBackgroundButton');
    const uploadResumeButton = document.getElementById('uploadResumeButton');
    const scriptButtons = document.querySelectorAll('.scriptButton');
    
    startInterviewButton.addEventListener('click', function () {
      chrome.runtime.sendMessage({ action: 'startInterview' });
    });

    addBackgroundButton.addEventListener('click', function () {
        chrome.runtime.sendMessage({ action: 'showAddBackgroundInputs' });
        updatePopupUI('adding_background');
    });
    
    // Loop through scriptButtons and add event listeners
    scriptButtons.forEach((button, index) => {
      button.addEventListener('click', function () {
        // Handle click event for script buttons
        console.log(`Script button ${index + 1} clicked.`);
        // You can perform specific actions for each script button here
      });
    });
  });
  
  // Function to update the popup UI based on the interview state
  function updatePopupUI(interviewState) {
    const startInterviewButton = document.getElementById('startButton');
    const addBackgroundButton = document.getElementById('addBackgroundButton');
    const scriptButtons = document.querySelectorAll('.scriptButton');
  
    switch (interviewState) {
      case 'not_started':
        showElement(startInterviewButton);
        hideElement(addBackgroundButton);
        hideElements(scriptButtons);
        break;
      case 'not_uploaded_background':
        showElement(addBackgroundButton);
        hideElement(startInterviewButton);
        hideElements(scriptButtons);
        break;
      case 'adding_background':
        showElements(scriptButtons);
        hideElement(startInterviewButton);
        hideElement(addBackgroundButton);
      // Add more cases for other states as needed
    }
  }
  
  // Function to show an element
  function showElement(element) {
    element.style.display = 'block';
  }
  
  // Function to hide an element
  function hideElement(element) {
    element.style.display = 'none';
  }
  
  // Function to show multiple elements
  function showElements(elements) {
    elements.forEach((element) => {
      element.style.display = 'block';
    });
  }
  
  // Function to hide multiple elements
  function hideElements(elements) {
    elements.forEach((element) => {
      element.style.display = 'none';
    });
  }
  