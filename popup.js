const startInterviewBtn = document.getElementById('startInterview');
const uploadResumeBtn = document.getElementById('uploadResume');
const addJobDescBtn = document.getElementById('addJobDesc');
const startProcessBtn = document.getElementById('startProcess');

document.addEventListener('DOMContentLoaded', function() {
  startInterviewBtn.addEventListener('click', startInterview);
  uploadResumeBtn.addEventListener('click', uploadResume);
  addJobDescBtn.addEventListener('click', addJobDescription);
  startProcessBtn.addEventListener('click', startProcess);

  updateUI();
});

function updateUI() {
  // Check the current state when popup is opened
  chrome.storage.local.get(['interviewState'], function(result) {
    switch (result.interviewState) {
      case 'not_started':
        showElement(startInterviewBtn);
        hideElement(uploadResumeBtn);
        hideElement(addJobDescBtn);
        break;
      case 'uploading_info': 
        hideElement(startInterviewBtn);
        showElement(uploadResumeBtn);
        showElement(addJobDescBtn);
        break;
      default:
        break;
    }
  });
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
  elements.forEach(element => {
      showElement(element);
  });
}

function startInterview() {
  // Logic to open new tab and inject "Let's start an interview" into chatbox
  chrome.runtime.sendMessage({ action: "openChat" });
  chrome.storage.local.set({ interviewState: 'uploading_info' });
}

function uploadResume() {
  // Logic for resume upload and text extraction
  document.getElementById('resumeUpload').click();
}

function handleResumeUpload(event) {

}

function addJobDescription() {
  chrome.runtime.sendMessage({ action: "addJobDescription" });
  chrome.storage.local.set({ interviewState: 'uploading_info' });
}

function startProcess() {
  // Logic for starting the interview process
  // Hide all other buttons
  hideElement(document.getElementById('uploadResume'));
  hideElement(document.getElementById('addJobDesc'));
  hideElement(document.getElementById('startProcess'));

  // Show some indication that the interview is in progress
  // You might want to update this part with your own logic
  alert('Interview in progress');
}
