const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const upload = require('../middleware/ImageUploadConfig');


const { check, validationResult } = require('express-validator');

const Employee = require('../models/Employee');

//@route    GET api/details
//@desc     Get all user details
//@access   Private
router.get('/', auth, async (req, res) => {
    try {
        const employees = await Employee.find().sort({ date: -1 });
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


//@route    POST api/details
//@desc     Add new detail
//@access   Private
router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('phone', 'phone is required').not().isEmpty(),
    check('designation', 'designation is required').not().isEmpty(),
]
    // , upload.single('profImage')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, phone, designation, department, profImage } = req.body;
    // req.body.profImage = req.file.filename;

    try {
        const newEmployee = new Employee({
            ...req.body
        })
        const employee = await newEmployee.save();
        res.json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')

    }
});


// update employee
router.put('/:id', async (req, res) => {

    const { name, email, phone, designation, department, profImage } = req.body;

    // Build employee object
    const employeeFields = {};
    if (name) employeeFields.name = name;
    if (email) employeeFields.email = email;
    if (phone) employeeFields.phone = phone;
    if (designation) employeeFields.designation = designation;
    if (department) employeeFields.department = department;

    try {
        let employee = await Employee.findById(req.params.id);

        if (!employee) return res.status(404).json({ msg: 'Employee not found' });

        employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { $set: employeeFields },
            { new: true },
        );

        res.json(employee);
    } catch (err) {
        console.error(er.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let employees = await Employee.findById(req.params.id);

        if (!employees) return res.status(404).json({ msg: 'employee not found' });

        await Employee.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Employee removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;
