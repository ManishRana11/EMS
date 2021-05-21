
const mongoose = require('mongoose');
const EmployeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true
    },
    department: {
        type: String,

    },
    profImage: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('employee', EmployeeSchema);