require('dotenv').config();
const express = require('express') //commonjs
const configViewEngine = require('./config/viewEngine')
const app = express()
const port = process.env.PORT || 8888;//port => hartcode . uat .pord
const hostname = process.env.HOST_NAME;
const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api')
const fileUpload = require('express-fileupload');
const connection = require('./config/database')

//config fileUpload
// default options
app.use(fileUpload());

//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

//config template engine
configViewEngine(app);

//khai báo route
app.use('/', webRoutes);
app.use('/v1/api/', apiRoutes);



(async () => {

    try {
        //test connection
        await connection();
        app.listen(port, hostname, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }
    catch (error) {
        console.log(">>> Error connect to DB: ", error)
    }

})()

