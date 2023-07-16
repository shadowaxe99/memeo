```javascript
let memeLibrary = [];
let currentMeme = {};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveMemeButton').addEventListener('click', saveMeme);
    document.getElementById('searchInput').addEventListener('keyup', searchMeme);
    document.getElementById('tagInput').addEventListener('keyup', addTag);
    document.getElementById('categoryInput').addEventListener('keyup', addCategory);
});

function saveMeme() {
    chrome.runtime.sendMessage({type: 'SAVE_MEME', meme: currentMeme}, function(response) {
        memeLibrary.push(response.meme);
        displayMemes();
    });
}

function deleteMeme(memeId) {
    chrome.runtime.sendMessage({type: 'DELETE_MEME', id: memeId}, function(response) {
        memeLibrary = memeLibrary.filter(meme => meme.id !== memeId);
        displayMemes();
    });
}

function searchMeme() {
    let keyword = document.getElementById('searchInput').value;
    chrome.runtime.sendMessage({type: 'SEARCH_MEME', keyword: keyword}, function(response) {
        memeLibrary = response.memes;
        displayMemes();
    });
}

function addTag() {
    let tag = document.getElementById('tagInput').value;
    chrome.runtime.sendMessage({type: 'ADD_TAG', tag: tag, meme: currentMeme}, function(response) {
        currentMeme = response.meme;
        displayMemes();
    });
}

function addCategory() {
    let category = document.getElementById('categoryInput').value;
    chrome.runtime.sendMessage({type: 'ADD_CATEGORY', category: category, meme: currentMeme}, function(response) {
        currentMeme = response.meme;
        displayMemes();
    });
}

function displayMemes() {
    let memeContainer = document.getElementById('memeContainer');
    memeContainer.innerHTML = '';
    memeLibrary.forEach(meme => {
        let memeElement = document.createElement('div');
        memeElement.innerHTML = `<img src="${meme.url}" alt="meme" /><p>${meme.tags.join(', ')}</p><p>${meme.category}</p>`;
        memeContainer.appendChild(memeElement);
    });
}
```