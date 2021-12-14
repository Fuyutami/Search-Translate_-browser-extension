chrome.runtime.onInstalled.addListener(() => {
	const menuItem = {
		id: 'searchTranslate',
		title: 'Versti į anglų',
		contexts: ['editable'],
	}
	
	chrome.contextMenus.create(menuItem)
	
	
})


chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId == 'searchTranslate') {
		chrome.tabs.sendMessage(tab.id, { todo: 'getWord' }, (res) => {
			const word = res.word
			fetch(
				`https://api.mymemory.translated.net/get?q=${word}&langpair=lt|en`
			).then(function (res) {
				return res.json()
			}).then(function (data) {
		chrome.tabs.sendMessage(tab.id, { translatedWord: data.responseData.translatedText})
	  })

		})
	}
})


