function injectPrompt(request) {
  const { text, send } = request;
  const chatbox = document.querySelector('#prompt-textarea');
  if (chatbox) {
      chatbox.value = text; // Set the value of the chatbox
      chatbox.focus(); // Focus the chatbox

      // Dispatch an input event to simulate user input
      const inputEvent = new InputEvent('input', { bubbles: true, cancelable: true });
      chatbox.dispatchEvent(inputEvent);

      // if (send) {
      //   const keyboardEvent = new KeyboardEvent('keydown', {
      //     key: 'Enter',
      //     keyCode: 13,
      //     bubbles: true,
      //     cancelable: true,
      //   });
      //   chatbox.dispatchEvent(keyboardEvent);
      // }
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);
  if (request.action === "injectText") {
      injectPrompt(request);
  }
});

