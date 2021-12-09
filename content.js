let clickedEl = null


document.addEventListener("contextmenu", (e) => {
    clickedEl = e.target
},true)


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(request)
      if (request.todo === 'getWord') {
        sendResponse({word: clickedEl.value})
    }

      if(request.translatedWord) {
        clickedEl.value = request.translatedWord

        window.dispatchEvent(new KeyboardEvent('keypress', {'key': 'a'}))
      }
    })