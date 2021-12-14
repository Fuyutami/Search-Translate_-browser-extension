let clickedEl = null

document.addEventListener(
	'contextmenu',
	(e) => {
		clickedEl = e.target
	},
	true
)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.todo === 'getWord') {
		sendResponse({ word: clickedEl.value })
	}

	if (request.translatedWord) {
		const word = request.translatedWord

		navigator.clipboard
			.writeText(word)
			.then(() => {
				clickedEl.value = word
			})
			.catch((err) => {
				console.log('Could not write word to the clipboard!', err)
			})
	}
})
