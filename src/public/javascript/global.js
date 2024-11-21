const warningDiv = document.querySelector('.warning-message')


if(warningDiv) warningDiv.addEventListener('click', handleHideWarning)


function handleHideWarning() {
    warningDiv.style.display = 'none'
}