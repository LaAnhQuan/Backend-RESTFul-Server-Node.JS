const { createEmptyProjectService, getProject } = require('../services/productService')

const postCreateEmptyProject = async (req, res) => {


    const result = await createEmptyProjectService(req.body)

    return res.status(200).json(
        {
            errorCode: 0,
            data: result
        }
    )
}

const getAllProject = async (req, res) => {
    let result = await getProject(req.query);
    return res.status(200).json(
        {
            errorCode: 0,
            data: result
        }
    )
}

module.exports = {
    postCreateEmptyProject, getAllProject
}