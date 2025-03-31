const mongoose = require('mongoose')
const Project = require('../models/project');


const createEmptyProjectService = async (data) => {

    try {
        let result = await Project.create(data)
        return result
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createEmptyProjectService
}
