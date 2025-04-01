const Task = require('../models/task');
const aqp = require('api-query-params');



const createTaskService = async (data) => {
    try {
        if (data.type === "EMPTY-TASK") {
            const result = await Task.create(data)
            return result;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getTaskService = async (queryString) => {
    const page = queryString.page;

    const { filter, limit, population } = aqp(queryString);
    delete filter.page;

    let offset = (page - 1) * limit;
    result = await Task.find(filter)
        .populate(population)
        .skip(offset)
        .limit(limit)
        .exec();

    return result
}

const updateTaskService = async (dataUpdate) => {
    const { id, name, startDate, endDate, description, status } = dataUpdate;

    try {
        const result = await Task.updateOne({ _id: id }, { ...dataUpdate });
        return result

    } catch (error) {
        console.log("error", error);
        return null;
    }

}

const delTaskService = async (id) => {
    try {
        const result = await Task.deleteById(id);
        return result;

    } catch (error) {
        console.log("error", error);
        return null;
    }
}

module.exports = {
    createTaskService, getTaskService, updateTaskService, delTaskService
}