// Get a reference to the file input element
const fileInput = document.getElementById('file-input');

// Get references to the text container and navigation buttons
const textContainer = document.getElementById('text-container');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');


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
    const fileContents = reader.result;

    // Split the file contents into sections by newline
    const sections = fileContents.split('\n');

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

// Get a reference to the tag form and container
const tagForm = document.getElementById('tag-form');
const tagContainer = document.getElementById('tag-container');

// Initialize the tags array
let tags = [];

// Listen for the tag form submission event
tagForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the default form submission

  // Get the tag text and color from the form inputs
  const tagText = document.getElementById('tag-text').value;
  const tagColor = document.getElementById('tag-color').value;
  const tagLuminance = colorLuminance(tagColor)

    // Add the tag to the tags array
    tags.push({ text: tagText, color: tagColor, luminance: tagLuminance });

  // Update the tag container with the new tag
  updateTagContainer();
//   resetTagForm();
});

function updateTagContainer() {
    tagContainer.innerHTML = tags.map(tag => {
      const darkClass = tag.luminance <= 0.5 ? 'tag-dark' : '';
      console.log(tag.luminance)
      return `<label>
      <input type="radio" name="selected-tag" ${tag.selected ? "checked" : ""}>
      <span class="${darkClass}" style="background-color: ${tag.color}; padding: 5px; margin-right: 5px;">${tag.text}</span>
      </label>
      `
    }).join('');
  }

  tagContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'SPAN') {
      target.classList.toggle('tag-selected');
    }
  });

  function colorLuminance(hexColor) {
    // Convert the hex color to an RGB color
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  }
