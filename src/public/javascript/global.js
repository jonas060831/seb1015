
const warningDiv = document.querySelector('.warning-message')
const dangerDiv = document.querySelector('.danger-message')
const timePostCreatedSpan = document.querySelector('#time-post-created')
const mediaInputRadios = document.querySelectorAll(".media-process-input") 
const mediaContainerDiv = document.querySelector(".media-upload-container") 
const uploadedPhotoContainer = document.querySelector('.uploaded-photo-container')
const photoUrlToUpload = document.querySelector("#photoUrlToUpload")

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
inputFilePhoto.name = 'photo'
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
            photoPreview.style.width = '10rem'
            uploadedPhotoContainer.append(photoPreview)
            

            //add this value to the hidden input so when the user hit share or submit the form
            //it will then be available
            photoUrlToUpload.value = data.pathToImage

            //then remove the image uploader file
            body.removeChild(inputFilePhoto)

        } catch (error) {
            //image failed to upload
            console.log(error)
        }
    }
})

mediaInputRadios.forEach((radioInput) => {
    radioInput.addEventListener('click', (event) => {
        let userSelection = event.target.value

        switch (userSelection) {
            case 'photo':
                //remove any previous value
                inputFilePhoto.value = null
                mediaContainerDiv.append(inputFilePhoto)
                break;
            case 'video':
                mediaContainerDiv.removeChild(inputFilePhoto)
                break;
            case 'code':
                mediaContainerDiv.removeChild(inputFilePhoto)  
                break;
            default:
                userSelection.value = "text"
                break;
        }
    })
})
