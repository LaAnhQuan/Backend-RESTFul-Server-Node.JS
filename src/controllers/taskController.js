const {
    createTaskService,
    getTaskService,
    updateTaskService,
    delTaskService
} = require('../services/taskService')

module.exports = {
    postCreateEmptyTask: async (req, res) => {

        const result = await createTaskService(req.body)

        return res.status(200).json(
            {
                errorCode: 0,
                data: result
            }
        )
    },
    getAllTask: async (req, res) => {
        let result = await getTaskService(req.query);
        return res.status(200).json(
            {
                errorCode: 0,
                data: result
            }
        )
    },
    putUpdateTask: async (req, res) => {
        console.log(req.body)
        const result = await updateTaskService(req.body);


        return res.status(200).json(
            {
                errorCode: 0,
                data: result
            }
        )
    },
    delHandleRemoveTask: async (req, res) => {

        const { id } = req.body;
        const result = await delTaskService(id);
        return res.status(200).json(
            {
                errorCode: 0,
                data: result
            }
        )
    }

}