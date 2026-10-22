class Bookmark {
  constructor(opt) {
    this.title = opt.title || opt.url;
    this.url = opt.url;
    this.delete = opt.delete || false;

    if (this.delete) {
      return;
    }

    this.li = document.createElement('li');

    let de = document.createElement('i');
    de.classList.add(`fa`, 'fa-times');
    de.addEventListener('click', () => {
      this.deleted();
    });
    this.li.appendChild(de);

    let a = document.createElement('a');
    a.href = this.url;
    a.target = `_blank`;
    a.textContent = this.title;
    this.li.appendChild(a);

    list.appendChild(this.li);
  }

  deleted() {
    this.delete = true;
    this.li.remove();

    let encodeObj = encodeURIComponent(JSON.stringify(bookmarks));
    localStorage.setItem('obj', encodeObj);
  }
};

let bookmarks = [];
let loadBookmarks = [];
let titleValue;
let urlValue;
const titleField = document.querySelector('#title');
const urlField = document.querySelector('#url');
const addBtn = document.querySelector('#add');
const deleteBtn = document.querySelector('#delete');
const list = document.querySelector('#list');

addBtn.addEventListener('click', () => {
  titleValue = titleField.value;
  urlValue = urlField.value;

  if (urlValue === '' || !(urlValue.startsWith('http://') || urlValue.startsWith('https://'))) {
    return;
  }

  bookmarks.push(new Bookmark(
    {
      title: titleValue,
      url: urlValue
    }
  ));

  let encodeObj = encodeURIComponent(JSON.stringify(bookmarks));
  localStorage.setItem('obj', encodeObj);
});

deleteBtn.addEventListener('click', () => {
  localStorage.removeItem('obj');

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  bookmarks = [];
});

chrome.tabs.query({ active: true, currentWindow: true }, (e) => {
  titleValue = e[0].title;
  titleField.value = titleValue;

  urlValue = e[0].url;
  urlField.value = urlValue;
});

window.addEventListener('DOMContentLoaded', () => {
  let decodeObj = decodeURIComponent(localStorage.getItem('obj'));
  if (decodeObj === "null") {
    return;
  }

  loadBookmarks = JSON.parse(decodeObj);

  loadBookmarks.forEach(bookmark => {
    bookmarks.push(new Bookmark(
      {
        title: bookmark.title,
        url: bookmark.url,
        delete: bookmark.delete
      }
    ));
  });
});
