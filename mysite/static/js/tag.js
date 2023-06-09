// Get a reference to the tag form and container
const tagForm = document.getElementById('tag-form');

// Initialize the tags array
let tags = [];

// Listen for the tag form submission event
tagForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the default form submission

  newTag(document.getElementById('tag-text').value, document.getElementById('tag-color').value)

  // Update the tag container with the new tag
  updateTagContainer();
});

function newTag(text, color){
  // Add the tag to the tags array
  tags.push({ text: text, color: color, luminance: colorLuminance(color) });

}

// Listen for tag selection
tagContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'INPUT') {
        // Find the selected tag
        const selectedTagName = event.target.parentElement.querySelector('span').textContent;
        selectedTag = tags.find(tag => tag.text === selectedTagName);
    
        // Update the tag container to reflect the new selection
        updateTagContainer();
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

function updateTagContainer() {
    tagContainer.innerHTML = tags.map(tag => {
      const darkClass = tag.luminance <= 0.5 ? 'tag-dark' : '';
      const selectedClass = tag === selectedTag ? 'selected-tag' : '';
      return `<label>
      <input type="radio" name="selected-tag" class="selected-tag" ${selectedClass? "checked" : ""}>
      <span class="${darkClass}" style="background-color: ${tag.color}; padding: 5px; margin-right: 5px;">${tag.text}</span>
      </label>
      `
    }).join('');
  }
// upload tag file(.json)
const tagFileInput = document.getElementById('tag-file-input');
tagFileInput.addEventListener('change', (event) => {
  const selectedFile = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const fileContents = reader.result;

    // Parse the JSON data
    const tagData = JSON.parse(fileContents);

    // Add the new tags to the existing tags array
    for (let i = 0; i < tagData.length; i++) {
      tags.push({ text: tagData[i]["name"], color: "#"+tagData[i]["color"], luminance:  colorLuminance("#"+tagData[i]["color"])});
      console.log(tags);
    }
    
    updateTagContainer();
  };
  reader.readAsText(selectedFile);
}
);

function rgbToHex(r, g, b) {
  const hexR = r.toString(16).padStart(2, '0'); // 將紅色值轉換為 2 位的 HEX 格式
  const hexG = g.toString(16).padStart(2, '0'); // 將綠色值轉換為 2 位的 HEX 格式
  const hexB = b.toString(16).padStart(2, '0'); // 將藍色值轉換為 2 位的 HEX 格式

  return `#${hexR}${hexG}${hexB}`; // 組合為 HEX 格式的顏色碼並返回
}