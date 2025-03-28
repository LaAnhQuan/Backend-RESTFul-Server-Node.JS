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
    putUpdateCustomer
} = require('../controllers/customerController')

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
routerAPI.put('/customers', putUpdateCustomer)

module.exports = routerAPI;