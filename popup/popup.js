const askAQestionButton = document.querySelector(".ask-a-question")

askAQestionButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({message: 'buttonClicked'});
});
