const models = require('../models')
const fs = require('fs').promises;
const { checkIfFolderExists } = require("../helpers")
const { Post } = models


const createPost = async (req, res) => {
    const { text, postCreator, content, photo } = req.body

    console.log(req.body)
    if(content === 'text') {
        const result = await Post.create(req.body)
        return res.redirect(`/#${result._id}?succes=Posted!`)
    } else if (content === 'photo') {

        const result = await Post.create(req.body)
        return res.redirect(`/#${result._id}?success=Posted!`)
    }


    return res.send(`you reach the end of createPost`)
}

const deletePost = async (req, res) => {
    const { postId } = req.params
    
    //make sure that only the session user deletes the post

    const postToDelete = await Post.findByIdAndDelete(postId).populate("postCreator")

    console.log(postToDelete.postCreator._id.toString() === req.session.user._id)

    //owner of the post so its ok to delete
    if(postToDelete.postCreator._id.toString() === req.session.user._id) return res.redirect("/?success=Deleted!")

    else return res.redirect("/?error=Error while deleting post")
} 

const postASinglePhoto = async (req, res) => {


    try {
        
        //get the currently logged in users id
        const loggedInUserId = req.session.user._id
        
        //current time in number
        //https://www.geeksforgeeks.org/javascript-program-to-convert-date-to-number/
        const numberDate = new Date().getTime()

        const photo = req.file
        const folderName = loggedInUserId
        const fileExtension = photo.mimetype.split("/")[1]
        const newFileName = `${numberDate}.${loggedInUserId}`
        const bufferFile = photo.buffer
                        
        //https://nodejs.org/en/learn/manipulating-files/working-with-folders-in-nodejs
        //1. i need to create a folder base on the user id also check first if that folder exist
        
        //check if the folder exist
        const doesTheFolderExist = await checkIfFolderExists(`${process.env.PHOTOS_FOLDER}/${folderName}`)
        
        //if not just make the folder
        if(!doesTheFolderExist) {
            await fs.mkdir(`${process.env.PHOTOS_FOLDER}/${folderName}`)
        }

        //thanks for this https://pages.git.generalassemb.ly/modular-curriculum-all-courses/intro-to-node/nodes-built-in-modules/ 
        // //2. then save that image to that folder
        await fs.writeFile(`${process.env.PHOTOS_FOLDER}/${folderName}/${newFileName}.${fileExtension}`, bufferFile, () => {
            console.log('done saving image')
        })

        //3. modify the route since we do not want to include some directory we just need the url to show the users
        const arr = process.env.PHOTOS_FOLDER.split("/") 
        const modifiedAddress = arr.splice(3).join("/") //just the url that we need t show the image beginning from uploads
        const pathToImage = `/${modifiedAddress}/${folderName}/${newFileName}.${fileExtension}`
        console.log(modifiedAddress)
        //4. returns the url of the saved image minus 2 embedded directory
        //so it should look like /uploads/posts/images/userid/image.png
        return res.status(200).json({ pathToImage })

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

module.exports = {
    createPost,
    deletePost,
    postASinglePhoto
}


