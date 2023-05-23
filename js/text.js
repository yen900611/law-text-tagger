// Get a reference to the file input element
const fileInput = document.getElementById('file-input');
let fileContents;

// Get references to the text container and navigation buttons
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
let sections = null;
// Initialize the current section index to 0
let currentSectionIndex = 0;

// Listen for the form submission event
document.getElementById('upload-form').addEventListener('submit', (event) => {
    event.preventDefault(); // prevent the default form submission
  
    // Get the selected file from the input element
const file = fileInput.files[0];
  
    // Read the contents of the file
    const reader = new FileReader();
    reader.onload = () => {
      fileContents = reader.result;
  
      // Split the file contents into sections by newline
      sections = fileContents.split('\n');
  
      // Display the first section
      displaySection(sections[currentSectionIndex], sections.length);
  
      // Listen for navigation button clicks
      prevButton.addEventListener('click', () => {
        currentSectionIndex--;
        displaySection(sections[currentSectionIndex], sections.length);
        updateNavigationButtons();
      });
  
      nextButton.addEventListener('click', () => {
        currentSectionIndex++;
        displaySection(sections[currentSectionIndex], sections.length);
        updateNavigationButtons();
      });
    };
    reader.readAsText(file);
  });
  
  function displaySection(sectionText, numSections) {
    // Display the section text in the text container
    textContainer.innerText = sectionText;
  }

  function updateNavigationButtons() {
    if (currentSectionIndex === 0) {
      prevButton.disabled = true;
    } else {
      prevButton.disabled = false;
    }
  
    if (currentSectionIndex === sections.length - 1) {
      nextButton.disabled = true;
    } else {
      nextButton.disabled = false;
    }
  }