```javascript
let memeLibrary = [];

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveMeme",
    title: "Save Meme",
    contexts: ["image"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveMeme") {
    saveMeme(info.srcUrl);
  }
});

function saveMeme(url) {
  let meme = {
    id: new Date().getTime(),
    url: url,
    tags: [],
    category: "",
  };

  memeLibrary.push(meme);
  chrome.storage.sync.set({ memeLibrary: memeLibrary });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "SAVE_MEME") {
    saveMeme(request.url);
  } else if (request.message === "DELETE_MEME") {
    deleteMeme(request.id);
  } else if (request.message === "SEARCH_MEME") {
    searchMeme(request.keyword);
  } else if (request.message === "ADD_TAG") {
    addTag(request.id, request.tag);
  } else if (request.message === "ADD_CATEGORY") {
    addCategory(request.id, request.category);
  }
});

function deleteMeme(id) {
  memeLibrary = memeLibrary.filter((meme) => meme.id !== id);
  chrome.storage.sync.set({ memeLibrary: memeLibrary });
}

function searchMeme(keyword) {
  let results = memeLibrary.filter((meme) =>
    meme.tags.includes(keyword) || meme.category.includes(keyword)
  );
  chrome.runtime.sendMessage({ message: "SEARCH_RESULTS", results: results });
}

function addTag(id, tag) {
  let meme = memeLibrary.find((meme) => meme.id === id);
  if (meme) {
    meme.tags.push(tag);
    chrome.storage.sync.set({ memeLibrary: memeLibrary });
  }
}

function addCategory(id, category) {
  let meme = memeLibrary.find((meme) => meme.id === id);
  if (meme) {
    meme.category = category;
    chrome.storage.sync.set({ memeLibrary: memeLibrary });
  }
}
```