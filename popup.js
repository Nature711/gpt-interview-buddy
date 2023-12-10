const startProcessBtn = document.getElementById('startProcess');
const uploadResumeBtn = document.getElementById('uploadResume');
const addJobDescBtn = document.getElementById('addJobDesc');
const skipQuestionBtn = document.getElementById('skipQuestion');
const endInterviewBtn = document.getElementById('endInterview');

document.addEventListener('DOMContentLoaded', function() {
  startProcessBtn.addEventListener('click', startProcess);
  uploadResumeBtn.addEventListener('click', uploadResume);
  addJobDescBtn.addEventListener('click', addJobDescription);
  skipQuestionBtn.addEventListener('click', skipQuestion);
  endInterviewBtn.addEventListener('click', endInterview);

  updateUI();
});

function updateUI() {
  // Check the current state when popup is opened
  chrome.storage.local.get(['interviewState'], function(result) {
    switch (result.interviewState) {
      case 'not_started':
        showElement(startProcessBtn);
        hideElement(uploadResumeBtn);
        hideElement(addJobDescBtn);
        hideElement(skipQuestionBtn);
        hideElement(endInterviewBtn);
        break;
      case 'uploading_info': 
        hideElement(startProcessBtn);
        showElement(uploadResumeBtn);
        showElement(addJobDescBtn);
        break;
      case 'interviewing':
        hideElement(startProcessBtn);
        hideElement(uploadResumeBtn);
        hideElement(addJobDescBtn);
        showElement(skipQuestionBtn);
        showElement(endInterviewBtn);
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

function startProcess() {
  // Logic to open new tab and inject "Let's start an interview" into chatbox
  chrome.runtime.sendMessage({ action: "openChat" });
  chrome.storage.local.set({ interviewState: 'uploading_info' });
}

function uploadResume() {
  // Logic for resume upload and text extraction
  document.getElementById('resumeUpload').click();
  chrome.storage.local.set({ hasResume: true });
  checkInfoUpload();
}

document.getElementById('resumeUpload').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      chrome.runtime.sendMessage({ action: "uploadResume", extractedText: data.text });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
});


function addJobDescription() {
  chrome.runtime.sendMessage({ action: "addJobDescription" });
  chrome.storage.local.set({ hasJobDesc: true });
  checkInfoUpload();
}

function checkInfoUpload() {
  chrome.storage.local.get(['hasResume', 'hasJobDesc'], function(result) {
    if (result.hasResume && result.hasJobDesc) {
      // Both indicators are set, show the Start Interview button
      chrome.storage.local.set({ interviewState: 'interviewing' });
      updateUI();
    }
  });
}

function skipQuestion() {
  chrome.runtime.sendMessage({ action: "skipQuestion" });
}

function endInterview() {
  chrome.runtime.sendMessage({ action: "endInterview" });
}