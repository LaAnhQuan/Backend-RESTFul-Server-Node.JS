const { createEmptyProjectService } = require('../services/productService')

postCreateEmptyProject = async (req, res) => {


    const result = await createEmptyProjectService(req.body)

    return res.status(200).json(
        {
            errorCode: 0,
            data: result
        }
    )
}

module.exports = {
    postCreateEmptyProject
}