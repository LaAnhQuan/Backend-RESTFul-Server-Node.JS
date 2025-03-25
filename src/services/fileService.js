

const uploadSingleFile = async (fileObject) => {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

    let uploadPath = __dirname + fileObject.name;

    // Use the mv() method to place the file somewhere on your server

    //save => public/images/upload
    //abc.png => abc-timestamp.png
    //upload multiple file
    try {
        await fileObject.mv(uploadPath);
        return {
            status: 'success',
            path: 'link-image',
            error: null
        }
    } catch (error) {
        console.log(">>> check err: ", error)
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(err)
        }
    }

}

const uploadMultipleFiles = () => {

}

module.exports = {
    uploadMultipleFiles, uploadSingleFile
}