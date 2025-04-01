const express = require('express');

const routerAPI = express.Router();

const {
    getUsersAPI, postCreateUserAPI, putUpdateUserAPI,
    postHandleRemoveUserAPI, postUploadSingleFileAPI,
    postUploadMultipleFilesAPI
} = require('../controllers/apiController')

const { postCreateCustomer,
    postCreateArrayCustomer,
    getAllCustomers,
    putUpdateCustomers,
    postHandleRemoveCustomer,
    delHandleRemoveArrayCustomer
} = require('../controllers/customerController')


const {
    postCreateEmptyProject,
    getAllProject,
    delHandleRemoveProject,
    putUpdateProject
} = require('../controllers/projectController')


const {
    postCreateEmptyTask,
    getAllTask,
    putUpdateTask,
    delHandleRemoveTask
} = require('../controllers/taskController')

routerAPI.get('/', (req, res) => {
    res.send("hello world with apis")
})

routerAPI.get('/abc', (req, res) => {
    res.status(200).json({
        data: 'hello world first api'
    })
})

routerAPI.get('/users', getUsersAPI)
routerAPI.post('/users', postCreateUserAPI)
routerAPI.put('/users', putUpdateUserAPI)
routerAPI.delete('/users', postHandleRemoveUserAPI)

routerAPI.post('/file', postUploadSingleFileAPI)
routerAPI.post('/files', postUploadMultipleFilesAPI)


routerAPI.post('/customers', postCreateCustomer)
routerAPI.post('/customers-many', postCreateArrayCustomer)
routerAPI.get('/customers', getAllCustomers)
routerAPI.put('/customers', putUpdateCustomers)
routerAPI.delete('/customers', postHandleRemoveCustomer)
routerAPI.delete('/customers-many', delHandleRemoveArrayCustomer)


routerAPI.post('/projects', postCreateEmptyProject);
routerAPI.get('/projects', getAllProject)
routerAPI.delete('/projects', delHandleRemoveProject);
routerAPI.put('/projects', putUpdateProject)


routerAPI.post('/tasks', postCreateEmptyTask);
routerAPI.get('/tasks', getAllTask)
routerAPI.put('/tasks', putUpdateTask)
routerAPI.delete('/tasks', delHandleRemoveTask);

routerAPI.get('/info', (req, res) => {
    return res.status(200).json({
        data: req.query
    })
})

routerAPI.get('/info/:name/:address', (req, res) => {
    return res.status(200).json({
        data: req.params
    })
})



module.exports = routerAPI;