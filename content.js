// content.js

console.log("Content script is running.");

// Function to simulate a key press event
function injectPrompt() {
    const chatbox = document.querySelector('#prompt-textarea'); // Replace with the correct selector for the chatbox
    
    if (chatbox) {
      chatbox.focus(); // Ensure the chatbox is focused
      chatbox.value = "Let's start a mock interview";
  
      // Create and dispatch an input event to simulate user input
      const inputEvent = new InputEvent('input', {
        bubbles: true,
        cancelable: true,
        data: "Let's start a mock interview",
      });
      chatbox.dispatchEvent(inputEvent);
  
      // Optionally, you can also trigger a keydown event to simulate pressing Enter
      const keydownEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        keyCode: 13,
        bubbles: true,
        cancelable: true,
      });
      chatbox.dispatchEvent(keydownEvent);
    }
  }  
  
  // Inject text and simulate key press when the page is loaded
  window.addEventListener('load', () => {
    injectPrompt();
  });
  