const { uploadSingleFile } = require("../services/fileService")
const { createCustomerService, createArrayCustomerService } = require("../services/customerService");

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
    }
}