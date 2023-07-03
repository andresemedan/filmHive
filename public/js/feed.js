// Truncate the captions in the Feed page to only be 85 characters, otherwise add an Elipsis.

let feedCaps = document.getElementsByClassName('feedCaptions');

for(let i = 0; i < feedCaps.length; i++){
    let textContent = feedCaps[i].innerText;
    let truncatedText = textContent.length > 85 ? textContent.slice(0,85) + '...' : textContent
    feedCaps[i].innerText = truncatedText
    
}

