
const warningDiv = document.querySelector('.warning-message')
const dangerDiv = document.querySelector('.danger-message')
const timePostCreatedSpan = document.querySelector('#time-post-created')




if(warningDiv) warningDiv.addEventListener('click', handleHideWarning)
if(dangerDiv) dangerDiv.addEventListener('click', handleHideError)

function handleHideWarning() {
    warningDiv.style.display = 'none'
}

function handleHideError() {
    dangerDiv.style.display = 'none'
}

//function that handles all time update on the ui and executes every second
let counter = 0
const executeEverySecond = () => {
    console.log(counter++)
}
//execute this function every second
//setInterval(executeEverySecond, 1000) //1000 is in milisecond



//modifications for now lets use en
// const TimeAgo = require("javascript-time-ago")
// const en = require("javascript-time-ago/locale/en")
// TimeAgo.addDefaultLocale(en)
// //formatter english
// const timeAgo = new TimeAgo('en-US')

// console.log(timeAgo(new Date))