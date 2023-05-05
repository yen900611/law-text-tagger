let selectedTag = null;

  // Initialize variables to store the starting and ending offsets of the selection
let selectionStartOffset = null;
let selectionEndOffset = null;

const textContainer = document.getElementById('text-container');
const tagContainer = document.getElementById('tag-container');

document.addEventListener('mouseup', () => {
  const selection = window.getSelection();
  console.log(selection);
  if (!selection.isCollapsed) {
    const range = selection.getRangeAt(0);
    const newNode = document.createElement('span');
    if(selectedTag){
      newNode.style.backgroundColor = selectedTag.color;
      if(selectedTag.luminance<=0.5){
        newNode.style.color = "#ffffff";
      }
    }
    range.surroundContents(newNode);
  }
});


 class TaggedText{
  constructor(tag, text, firstIndex, lastIndex) {
    this.tag = tag;
    this.text = text;
    this.firstIndex = firstIndex;
    this.lastIndex = lastIndex;
    this.doubt = false;
    this.next = null;
  }
 }

 class TaggedTextList{
  constructor(tag, text, firstIndex, lastIndex) {
    this.head = new TaggedText(tag, text, firstIndex, lastIndex);
  }

  append(tag, text, firstIndex, lastIndex) {
    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = new TaggedText(tag, text, firstIndex, lastIndex);
  }
 }
console.log(selectedTag);