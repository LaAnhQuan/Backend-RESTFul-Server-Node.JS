const {
    createEmptyProjectService,
    getProject,
    delProjectService,
    updateProjectService
} = require('../services/productService')

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


const delHandleRemoveProject = async (req, res) => {

    const { id } = req.body;
    const result = await delProjectService(id);
    return res.status(200).json(
        {
            errorCode: 0,
            data: result
        }
    )
}

const putUpdateProject = async (req, res) => {

    const result = await updateProjectService(req.body);

    return res.status(200).json(
        {
            errorCode: 0,
            data: result
        }
    )
}

module.exports = {
    postCreateEmptyProject, getAllProject, delHandleRemoveProject, putUpdateProject
}