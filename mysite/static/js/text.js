// Get a reference to the file input element
const fileInput = document.getElementById('file-input');
let fileContents;

// Get references to the text container and navigation buttons
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
let sections = null;
// Initialize the current section index to 0
let currentSectionIndex = 0;
let sectionLength = [0];
let file = null;

// Listen for the form submission event
document.getElementById('upload-form').addEventListener('submit', (event) => {
    event.preventDefault(); // prevent the default form submission
  
    // Get the selected file from the input element
    file = fileInput.files[0];
    const fileName = file.name;
    const reader = new FileReader();
  
    // Read the contents of the file
    reader.onload = () => {
      fileContents = reader.result;
      if(fileName.slice(-7, -4)=='tag'){
        // 已經標記過的文件
        let T0 = fileContents.indexOf('T0');
        let T1 = fileContents.indexOf('T1');
        let T0_content = fileContents.slice(T0+3, T1);
        fileContents = fileContents.slice(T1, -1); // 標記的內容
        splitFile(T0_content);
        let taggedLines = fileContents.split('\n');
        let newTagList = [];
        let tagColor = null;
        const textElement = document.getElementById('text-container');
        let newText = [];
        let textIndex = 0;
        let tagList = [];
        console.log(textElement);
        for(let i=0;i<taggedLines.length;i++){
          let a = taggedLines[i].split(' ');
          if (newTagList.includes(a[1])){
            // tag has in list
            tagColor = newTagList[newTagList.indexOf(a[1])+1];
          }
          else{
            // tag is new
            tagColor = rgbToHex(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
            newTag(a[1], tagColor);
            newTagList.push(a[1]);
            newTagList.push(tagColor);
          }
          newText.push(T0_content.slice(textIndex, a[2]));
          newText.push(T0_content.slice(a[2], a[3]));
          textIndex = a[3];
          tagList.push(tagColor);
          
          // newText = newText.slice(0, a[2]) + newNode.outerHTML + newText.slice(a[3]);
          
          // textElement.innerHTML = newText;

          let nodeData;
        if(TagTextList.head){
          nodeData = new TaggedText(a[1], a[4].slice(0,-1), a[2], a[3]);
          TagTextList.append(nodeData);
        }
        else{
          nodeData = new TaggedText(a[1], a[4].slice(0,-1), a[2], a[3]);
          TagTextList.head = nodeData;
        }
        // console.log(nodeData);
        }
        newText.push(T0_content.slice(textIndex, -1));
        for(i = 0;i<newText.length;i++){
          if(i%2==0){
            // 無標記
            textElement.innerHTML+=newText[i];

          }
          else{
            // 已標記
            const newNode = document.createElement('span');
            newNode.innerHTML = newText[i];
            newNode.style.backgroundColor = tagList[(i-1)/2];
            if(colorLuminance(tagList[(i-1)/2])<=0.5){
              newNode.style.color = "#ffffff";
            }
            textElement.innerHTML+=newNode.outerHTML;

          }
          
        }
        // console.log(newText);
        updateTagContainer();
        

      }else{
        // 沒有標記過的文章
        splitFile(fileContents);
        // Display the first section
        displaySection(sections[currentSectionIndex], sections.length);
      }
      
      // Listen for navigation button clicks
      prevButton.addEventListener('click', () => {
        currentSectionIndex--;
        updateNavigationButtons();
        displaySection(sections[currentSectionIndex], sections.length);
      });
  
      nextButton.addEventListener('click', () => {
        currentSectionIndex++;
        updateNavigationButtons();
        displaySection(sections[currentSectionIndex], sections.length);
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

  function splitFile(fileContents){
      // Split the file contents into sections by newline
      sections = fileContents.split('\n');
      for(let i=0;i<sections.length;i++){
        sectionLength.push(sections[i].length);
      }
      for(i=2;i<sectionLength.length;i++){
        sectionLength[i]=sectionLength[i-1]+sectionLength[i];
      }
  }