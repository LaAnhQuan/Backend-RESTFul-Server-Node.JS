const mongoose = require('mongoose')
const Project = require('../models/project');
const aqp = require('api-query-params');

const createEmptyProjectService = async (data) => {

    try {
        if (data.type === "EMPTY-PROJECT") {
            let result = await Project.create(data)
            return result
        }
        if (data.type === "ADD-USERS") {
            let myProject = await Project.findById(data.projectId).exec();

            for (let i = 0; i < data.usersArr.length; i++) {
                myProject.usersInfor.push(data.usersArr[i]);
            }

            let newResult = await myProject.save();


            return newResult

        }
        if (data.type === "REMOVE-USERS") {
            let myProject = await Project.findById(data.projectId).exec();
            for (let i = 0; i < data.usersArr.length; i++) {
                myProject.usersInfor.pull(data.usersArr[i]);
            }
            let newResult = await myProject.save();


            return newResult
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getProject = async (queryString) => {
    const page = queryString.page;

    const { filter, limit, population } = aqp(queryString);
    delete filter.page;

    let offset = (page - 1) * limit;
    result = await Project.find(filter)
        .populate(population)
        .skip(offset)
        .limit(limit)
        .exec();

    return result
}

const delProjectService = async (id) => {
    try {
        const result = await Project.deleteById(id);
        return result;

    } catch (error) {
        console.log("error", error);
        return null;
    }
}

const updateProjectService = async (dataUpdate) => {
    const { id, name, endDate, description } = dataUpdate;

    try {
        const result = await Project.updateOne({ _id: id }, { name, endDate, description });
        return result

    } catch (error) {
        console.log("error", error);
        return null;
    }

}

module.exports = {
    createEmptyProjectService, getProject, delProjectService, updateProjectService
}
