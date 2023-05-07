let selectedTag = null;

  // Initialize variables to store the starting and ending offsets of the selection
let selectionStartOffset = null;
let selectionEndOffset = null;

const textContainer = document.getElementById('text-container');
const tagContainer = document.getElementById('tag-container');

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

function deleteTaggedText(node, html){
  // node
  if(node.last){
    if(node.next){
      node.last.next = a.next;
      node.next.last = a.last;
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
  html.replaceWith(html.innerText.slice(0, -1));
}

document.addEventListener('mouseup', () => {
  const selection = window.getSelection();
  if (!selection.isCollapsed && selectedTag) {
    const range = selection.getRangeAt(0);
    const newNode = document.createElement('span');
    
    console.log(newNode);
    
      newNode.style.backgroundColor = selectedTag.color;
      if(selectedTag.luminance<=0.5){
        newNode.style.color = "#ffffff";
      }
    let a;
    if(TagTextList.head){
      a = new TaggedText(selectedTag.text, selection.toString().trim(), selection.anchorOffset+1, selection.focusOffset);
      TagTextList.append(a);
    }
    else{
      a = new TaggedText(selectedTag.text, selection.toString().trim(), selection.anchorOffset+1, selection.focusOffset);
      TagTextList.head = a;
    }
    console.log(TagTextList);
    
    range.surroundContents(newNode);
    const thisDeleteButton = deleteButtonTemplate.cloneNode();
    thisDeleteButton.addEventListener('click', () => {
      deleteTaggedText(a, newNode);
    });
    thisDeleteButton.innerText = 'X';
    newNode.appendChild(thisDeleteButton);
    window.getSelection().empty();
  }
});