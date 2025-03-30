const Customer = require("../models/customer");
const mongoose = require('mongoose')
const aqp = require('api-query-params');

const createCustomerService = async (customerData) => {

    console.log("check customerData", customerData)
    try {
        let result = await Customer.create({
            name: customerData.name,
            address: customerData.address,
            phone: customerData.phone,
            email: customerData.email,
            description: customerData.description,
            image: customerData.image
        })
        return result
    } catch (error) {
        console.log(error);
        return null;
    }
}

const createArrayCustomerService = async (arr) => {
    try {
        let result = await Customer.insertMany(arr);
        return result;

    } catch (error) {
        console.log("error");
        return null;
    }
}

const getAllCustomerService = async (limit, page, name, queryString) => {
    try {
        let result = null;
        if (limit && page) {
            let offset = (page - 1) * limit;

            const { filter } = aqp(queryString);
            delete filter.page;

            result = await Customer.find(filter).skip(offset).limit(limit).exec();
        } else {
            result = await Customer.find({});
        }
        return result;
    } catch (error) {
        console.log("error", error);
        return null;
    }
}

const putUpdateCustomerService = async (name, email, address, id) => {
    try {
        const result = await Customer.updateOne({ _id: id }, { email, name, address });
        return result

    } catch (error) {
        console.log("error", error);
        return null;
    }
}


const deleteACustomerService = async (id) => {
    try {
        const result = await Customer.deleteById(id);
        return result;

    } catch (error) {
        console.log("error", error);
        return null;
    }
}

const deleteArrayCustomerService = async (arr) => {
    try {
        const result = await Customer.delete({ _id: { $in: (arr) } });
        // Customer.find({ deleted: true })
        //     .then((deletedDocs) => {
        //         console.log('Các tài liệu đã xóa mềm:', deletedDocs);
        //     })
        //     .catch((err) => {
        //         console.error('Lỗi khi tìm tài liệu đã xóa mềm:', err);
        //     });
        return result;
    } catch (error) {
        console.log("error", error);
        return null;
    }


}

module.exports = {
    createCustomerService,
    createArrayCustomerService,
    getAllCustomerService,
    putUpdateCustomerService,
    deleteACustomerService,
    deleteArrayCustomerService
}

