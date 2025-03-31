const mongoose = require('mongoose');
const mongoose_delete = require('mongoose_delete')


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    city: String,
})


const projectSchema = new mongoose.Schema({
    name: String,
    startDate: String,
    endDate: String,
    description: String,
});

//shape data

const taskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        description: String,
        status: String,
        startDate: String,
        endDate: String,
        usersInfo: userSchema,
        projectInfo: projectSchema
    },
    {
        timestamps: true
    }
)


//Override all methods

taskSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;


