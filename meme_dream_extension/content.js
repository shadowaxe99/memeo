```javascript
// Listen for right click event on images
document.addEventListener('contextmenu', function(event) {
    if(event.target.nodeName === 'IMG') {
        chrome.runtime.sendMessage({
            msg: 'SAVE_MEME', 
            data: {
                src: event.target.src,
                alt: event.target.alt
            }
        });
    }
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.msg === 'SEARCH_MEME') {
        let memes = document.querySelectorAll('img');
        let results = Array.from(memes).filter(meme => meme.alt.includes(request.data.keyword));
        sendResponse({data: results});
    }
});
```