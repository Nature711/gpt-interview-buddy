function injectPrompt(prompt) {
  const chatbox = document.querySelector('#prompt-textarea');
  if (chatbox) {
      chatbox.value = prompt; // Set the value of the chatbox
      chatbox.focus(); // Focus the chatbox

      // Dispatch an input event to simulate user input
      const inputEvent = new InputEvent('input', { bubbles: true, cancelable: true });
      chatbox.dispatchEvent(inputEvent);
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "injectText") {
      injectPrompt(request.text);
  }
});

