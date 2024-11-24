
const warningDiv = document.querySelector('.warning-message')
const dangerDiv = document.querySelector('.danger-message')
const timePostCreatedSpan = document.querySelector('#time-post-created')
const mediaInputRadios = document.querySelectorAll(".media-process-input") 
const mediaContainerDiv = document.querySelector(".media-upload-container") 
const uploadedMediaContainer = document.querySelector('.uploaded-media-container')
const photoUrlToUpload = document.querySelector("#photoUrlToUpload")
const videoUrlToUpload = document.querySelector("#videoUrlToUpload")

if(warningDiv) warningDiv.addEventListener('click', handleHideWarning)
if(dangerDiv) dangerDiv.addEventListener('click', handleHideError)

function handleHideWarning() {
    warningDiv.style.display = 'none'
}

function handleHideError() {
    dangerDiv.style.display = 'none'
}

const inputFilePhoto = document.createElement('input')
inputFilePhoto.type = 'file'
inputFilePhoto.style.display = 'none' //so i can toggle between none or block
inputFilePhoto.name = 'photo'
inputFilePhoto.accept = "image/*"
inputFilePhoto.id = 'input-file-photo'

inputFilePhoto.addEventListener('change', async(e) => {

    //https://stackoverflow.com/questions/3528359/html-input-type-file-file-selection-event

    const file = e.target.files[0]
    if(file) {
        //1. create a form
        let formData = new FormData()
        formData.append('photo', file) //should be the same with multer file name
        
        //2. prepare the headers
        //https://www.geeksforgeeks.org/javascript-fetch-method/
        let options = {
            method: 'POST',
            body: formData
        }

        try {
            const response = await fetch('/posts/a-single-photo', options) // api for the get request
            const data = await response.json()

            //show the image
            const photoPreview = document.createElement('img')
            photoPreview.src = data.pathToImage
            photoPreview.style.zIndex = 100;
            photoPreview.style.width = '10rem'
            uploadedMediaContainer.append(photoPreview)
            

            //add this value to the hidden input so when the user hit share or submit the form
            //it will then be available
            photoUrlToUpload.value = data.pathToImage

        } catch (error) {
            //image failed to upload
            console.log(error)
        }
    }
})



const inputFileVideo = document.createElement('input')
inputFileVideo.type = 'file'
inputFileVideo.style.display = 'none' //so i can toggle between none or block
inputFileVideo.name = 'video'
inputFileVideo.accept = "video/*"
inputFileVideo.id = 'input-file-video'

inputFileVideo.addEventListener('change', async(e) => {

    //https://stackoverflow.com/questions/3528359/html-input-type-file-file-selection-event

    const file = e.target.files[0]
    if(file) {
        //1. create a form
        let formData = new FormData()
        formData.append('video', file) //should be the same with multer file name
        
        //2. prepare the headers
        //https://www.geeksforgeeks.org/javascript-fetch-method/
        let options = {
            method: 'POST',
            body: formData
        }

        try {
            const response = await fetch('/posts/a-single-video', options) // api for the get request
            const data = await response.json()

            //show the video
            const videoPreview = document.createElement('video')
            const videoSource = document.createElement('source')
            videoSource.src = data.pathToVideo
            videoPreview.controls = true
            videoPreview.appendChild(videoSource)
            videoPreview.style.zIndex = 100;
            videoPreview.style.width = '10rem'
            uploadedMediaContainer.append(videoPreview)
            

            //add this value to the hidden input so when the user hit share or submit the form
            //it will then be available
            videoUrlToUpload.value = data.pathToVideo

        } catch (error) {
            //image failed to upload
            console.log(error)
        }
    }
})


const codeTextArea = document.createElement('textarea')
codeTextArea.id = 'code-text-area'
codeTextArea.class = "prism-live"
codeTextArea.style.height = '15rem'
codeTextArea.placeholder = "//Paste or write your code here"
codeTextArea.style.display = 'none'
codeTextArea.name = 'code'
const preFormattedCode = document.createElement('pre')
preFormattedCode.id = 'code-pre-formatted'
preFormattedCode.class = 'language-javascript' //so we can use prism themes minified version etc we call this in our index.ejs


//buttons access

mediaInputRadios.forEach((radioInput) => {
    radioInput.addEventListener('click', (event) => {
        let userSelection = event.target.value

        switch (userSelection) {
            case 'photo':
                //show the image input file
                inputFilePhoto.style.display = 'block'

                //i want to remove the input file from the view once the photo option is selected
                //so i guess by checking a style property i can tell weather is showing or not
                //doing test

                //this works
                if(inputFileVideo.style.display !== 'none') inputFileVideo.style.display = 'none'
                if(codeTextArea.style.display !== 'none') codeTextArea.style.display = 'none'
                if(preFormattedCode.style.display !== 'none') preFormattedCode.style.display = 'none'

                //remove any previous value
                inputFilePhoto.value = null
                //uploadedMediaContainer.innerHTML = "<i class='fa-regular fa-image' style='font-size: 10rem'></i>"
                mediaContainerDiv.append(inputFilePhoto)
                
                break;
            case 'video':
                //show the video input file
                inputFileVideo.style.display = 'block'
                //if there is a value from previous input files
                if(inputFilePhoto.style.display !== 'none') inputFilePhoto.style.display = 'none'
                if(codeTextArea.style.display !== 'none') codeTextArea.style.display = 'none'
                if(preFormattedCode.style.display !== 'none') preFormattedCode.style.display = 'none'

                //remove any previous value
                inputFileVideo.value = null
                //uploadedMediaContainer.innerHTML = "<i class='fa-solid fa-film' style='font-size: 10rem'></i>"
                mediaContainerDiv.append(inputFileVideo)

                break;
            case 'code':
                mediaContainerDiv.position = 'relaive'
                mediaContainerDiv.width = '100%'
                codeTextArea.style.display = 'block'
                preFormattedCode.style.display = 'block'
                //if there is a value from previous input files
                if(inputFilePhoto.style.display !== 'none') inputFilePhoto.style.display = 'none'
                if(inputFileVideo.style.display !== 'none') inputFileVideo.style.display = 'none'
                
                codeTextArea.value = null
                preFormattedCode.value = null
                
                mediaContainerDiv.append(preFormattedCode)
                mediaContainerDiv.append(codeTextArea)
                
                break;
            default:
                userSelection.value = "text"
                break;
        }
    })
})
