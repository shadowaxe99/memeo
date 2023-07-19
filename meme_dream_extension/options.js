document.addEventListener('DOMContentLoaded', function() {
    let saveButton = document.getElementById('saveMemeButton');
    let tagInput = document.getElementById('tagInput');
    let categoryInput = document.getElementById('categoryInput');

    saveButton.addEventListener('click', function() {
        let newTag = tagInput.value;
        let newCategory = categoryInput.value;
        chrome.runtime.sendMessage({type: 'ADD_TAG', tag: newTag});
        chrome.runtime.sendMessage({type: 'ADD_CATEGORY', category: newCategory});
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'SAVE_MEME') {
        let memeLibrary = request.memeLibrary;
        let memeContainer = document.getElementById('memeContainer');
        memeContainer.innerHTML = '';
        for (let meme of memeLibrary) {
            let memeElement = document.createElement('div');
            memeElement.innerHTML = `<img src="${meme.url}" alt="meme image">
                                     <p>Tags: ${meme.tags.join(', ')}</p>
                                     <p>Category: ${meme.category}</p>`;
            memeContainer.appendChild(memeElement);
        }
    }
});