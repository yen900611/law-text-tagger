let selectedTag = null;

  // Initialize variables to store the starting and ending offsets of the selection
let selectionStartOffset = null;
let selectionEndOffset = null;

const textContainer = document.getElementById('text-container');
const tagContainer = document.getElementById('tag-container');
const exportButton = document.getElementById('export-button');

 class TaggedText{
  constructor(tag, text, firstIndex, lastIndex) {
    this.tag = tag;
    this.text = text;
    this.firstIndex = firstIndex;
    this.lastIndex = lastIndex;
    this.doubt = false;
    this.next = null;
    this.last = null;
  }
 }

 class TaggedTextList{
  constructor() {
    this.head = null;
  }

  append(node) {
    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = node;
    current.next.last = current;
  }
 }


const TagTextList = new TaggedTextList()
const deleteButtonTemplate = document.createElement('button');
deleteButtonTemplate.id = "delete-button"
const doubtButtonTemplate = document.createElement('button');
doubtButtonTemplate.id = "doubt-button"

function deleteTaggedText(node, html){
  // node
  if(node.last){
    if(node.next){
      node.last.next = node.next;
      node.next.last = node.last;
    }
    else{
      node.last = null;
    }
    
  }
  else{
    if(node.next){
      TagTextList.head = node.next;
      node.next.last = null;
    }
    else{
      TagTextList.head = null;
    }
   
  }
  console.log(TagTextList);

  // html
  html.replaceWith(html.innerText.slice(0, -2));
}

function doubtTaggedText(node, html){
  if(node.doubt){
    node.doubt = false;
    html.innerText = "\u{2705}";
  }
  else{
    node.doubt = true;
    html.innerText = "\u{26A0}"
  }
}

document.addEventListener('mouseup', () => {
  const selection = window.getSelection();
  if (!selection.isCollapsed && selectedTag) {
    const range = selection.getRangeAt(0);
    const newNode = document.createElement('span');
    
      newNode.style.backgroundColor = selectedTag.color;
      if(selectedTag.luminance<=0.5){
        newNode.style.color = "#ffffff";
      }
    let nodeData;
    if(TagTextList.head){
      nodeData = new TaggedText(selectedTag.text, selection.toString().trim(), selection.anchorOffset, selection.focusOffset);
      TagTextList.append(nodeData);
    }
    else{
      nodeData = new TaggedText(selectedTag.text, selection.toString().trim(), selection.anchorOffset, selection.focusOffset);
      TagTextList.head = nodeData;
    }
    
    range.surroundContents(newNode);
    const thisDeleteButton = deleteButtonTemplate.cloneNode();
    const thisDoubtButton = doubtButtonTemplate.cloneNode();
    newNode.appendChild(thisDeleteButton);
    newNode.appendChild(thisDoubtButton);
    thisDeleteButton.addEventListener('click', () => {
      deleteTaggedText(nodeData, newNode);
    });
    thisDeleteButton.innerText = '\u{274C}';
    thisDoubtButton.addEventListener('click', () => {
      doubtTaggedText(nodeData, thisDoubtButton);
    });
    thisDoubtButton.innerText = '\u{2705}';
    window.getSelection().empty();
  }
});

exportButton.addEventListener('click', () => {
  // console.log(TagTextList);
  export_label();
});

function export_label(){
  // text
  let text = '';
  let id = 1;
  let node = TagTextList.head;
  text += 'T0 ' + fileContents;
  while(node){
    console.log(node);
    text += `T${id} ${node.tag} ${node.firstIndex} ${node.lastIndex} ${node.text}\n`;
    node = node.next;
    id += 1;
  }
  downloadFile(text, 'text.txt', 'text/plain');

  // tags
  let tagJson = [];
  for(let i=0; i<tags.length; i++){
    tagJson.push({"id":i+1,"name":tags[i]["text"], "color":tags[i]["color"]});
  }
  const jsonString = JSON.stringify(tagJson);
  downloadFile(jsonString, 'tag.json', 'application/json')
}

function downloadFile(data, filename, mimeType) {
  const blob = new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;

  link.click();

  URL.revokeObjectURL(url);
}