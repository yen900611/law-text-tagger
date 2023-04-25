let selectedTag = null;

  // Initialize variables to store the starting and ending offsets of the selection
let selectionStartOffset = null;
let selectionEndOffset = null;

const textContainer = document.getElementById('text-container');
const tagContainer = document.getElementById('tag-container');

// Listen for the mousedown event on the text container
textContainer.addEventListener('mousedown', (event) => {
  // Set the starting offset of the selection
  selectionStartOffset = window.getSelection().anchorOffset;

  // Listen for the mousemove event on the text container
  textContainer.addEventListener('mousemove', handleMouseMove);
});

// Define a function to handle the mousemove event
function handleMouseMove(event) {
  // Set the ending offset of the selection
  selectionEndOffset = window.getSelection().focusOffset;
}

// Listen for the mouseup event on the text container
textContainer.addEventListener('mouseup', (event) => {
  // Stop listening for the mousemove event
  textContainer.removeEventListener('mousemove', handleMouseMove);

  // Get the selected text
  const selectedText = window.getSelection().toString().trim();

  // Do something with the selected text
  console.log(selectedText);
});