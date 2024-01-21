const getPageContent = () => {
    const userContent = document.querySelector(".user_content")
    const paragraphs = Array.from(userContent.querySelectorAll("p")).map(p => p.textContent).filter(p => p.trim() && p.length > 50)
    const headings = Array.from(userContent.querySelectorAll("h1, h2, h3")).map(h => h.textContent)
    const listItems = Array.from(userContent.querySelectorAll("ul, li")).map(i => i.textContent
        .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
        .replace(/^\s+|\s+$/g, '') // Trim leading and trailing whitespace
        .replace(/\n/g, '')) // Remove newline characters)
    console.log({ paragraphs, headings, listItems })
    return { paragraphs, headings, listItems }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.message === 'buttonClicked') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: getPageContent
                });
            }
        });
    }
});

