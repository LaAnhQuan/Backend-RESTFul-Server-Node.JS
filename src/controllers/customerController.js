const { uploadSingleFile } = require("../services/fileService")
const { createCustomerService,
    createArrayCustomerService,
    getAllCustomerService,
    putUpdateCustomerService,
    deleteACustomerService,
    deleteArrayCustomerService

} = require("../services/customerService");
const Customer = require("../models/customer");

// {key : value}

module.exports = {
    postCreateCustomer: async (req, res) => {

        let { name, address, phone, email, description } = req.body;

        console.log(">>> name", name, description);

        let imageUrl = "";

        //image: String,
        if (!req.files || Object.keys(req.files).length === 0) {
            //do nothing
        } else {
            let result = await uploadSingleFile(req.files.image);
            imageUrl = result.path;
        }

        let customerData = {
            name,
            address,
            phone,
            email,
            description,
            image: imageUrl
        }

        let customer = await createCustomerService(customerData)



        return res.status(200).json(
            {
                errorCode: 0,
                data: customer
            }
        )
    },
    postCreateArrayCustomer: async (req, res) => {
        let customer = await createArrayCustomerService(req.body.customers);
        if (customer) {
            return res.status(200).json(
                {
                    errorCode: 0,
                    data: customer
                }
            )
        } else {
            return res.status(200).json(
                {
                    errorCode: -1,
                    data: customer
                }
            )
        }
    },
    getAllCustomers: async (req, res) => {
        let limit = req.query.limit;
        let page = req.query.page;
        let name = req.query.name;
        let result = null;
        if (limit && page) {
            result = await getAllCustomerService(limit, page, name, req.query);
        } else {
            result = await getAllCustomerService();
        }

        return res.status(200).json(
            {
                errorCode: 0,
                data: result
            }
        )
    },
    putUpdateCustomers: async (req, res) => {

        const { name, email, address, id } = req.body;

        const result = await putUpdateCustomerService(name, email, address, id);

        return res.status(200).json(
            {
                errorCode: 0,
                data: result
            }
        )
    },
    postHandleRemoveCustomer: async (req, res) => {
        const { id } = req.body;
        const result = await deleteACustomerService(id);
        return res.status(200).json(
            {
                errorCode: 0,
                data: result
            }
        )
    },
    delHandleRemoveArrayCustomer: async (req, res) => {
        const result = await deleteArrayCustomerService(req.body.customersId);


        return res.status(200).json(
            {
                errorCode: 0,
                data: result
            }
        )

    }


}