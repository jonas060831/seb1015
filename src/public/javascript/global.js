const warningDiv = document.querySelector('.warning-message')
const dangerDiv = document.querySelector('.danger-message')

if(warningDiv) warningDiv.addEventListener('click', handleHideWarning)
if(dangerDiv) dangerDiv.addEventListener('click', handleHideError)

function handleHideWarning() {
    warningDiv.style.display = 'none'
}

function handleHideError() {
    dangerDiv.style.display = 'none'
}