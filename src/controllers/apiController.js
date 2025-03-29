const User = require("../models/user");
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../services/CRUDService');
const { uploadSingleFile, uploadMultipleFiles } = require('../services/fileService')
const getUsersAPI = async (req, res) => {

    // let results = [];
    const results = await User.find({});

    return res.status(200).json(
        {
            errorCode: 0,
            data: results
        }
    )
}

const postCreateUserAPI = async (req, res) => {
    console.log(">>> check req.body : ", req.body)

    let { email, myname, city } = req.body;

    let user = await User.create({
        email: email,
        name: myname,
        city: city
    })

    return res.status(200).json(
        {
            errorCode: 0,
            data: user
        }
    )

}


const putUpdateUserAPI = async (req, res) => {
    const { email, myname, city, userId } = req.body;


    const user = await updateUserById(email, myname, city, userId);

    // return res.send('Update user success')
    return res.status(200).json(
        {
            errorCode: 0,
            data: user
        }
    )
}


const postHandleRemoveUserAPI = async (req, res) => {

    const { userId } = req.body;

    const user = await deleteUserById(userId);

    res.status(200).json(
        {
            errorCode: 0,
            data: user
        }
    )
}

const postUploadSingleFileAPI = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
    }

    let result = await uploadSingleFile(req.files.image);
    console.log(">>> check results :", result)
    res.status(200).json(
        {
            errorCode: 0,
            data: result
        }
    )
}

const postUploadMultipleFilesAPI = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
    }

    //upload single => files is a object 
    //upload multiple => files is a array

    if (Array.isArray(req.files.image)) {
        // upload multiple 
        let result = await uploadMultipleFiles(req.files.image);
        return res.status(200).json({
            errorCode: 0,
            data: result
        })
    } else {
        //upload single 
        return await postUploadSingleFileAPI(req, res);
    }
}





module.exports = {
    getUsersAPI, postCreateUserAPI, putUpdateUserAPI, postHandleRemoveUserAPI,
    postUploadSingleFileAPI, postUploadMultipleFilesAPI
}