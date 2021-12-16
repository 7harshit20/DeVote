const mongoose = require('mongoose');
const Joi = require('joi');
const passwordValidator = require('password-validator');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const validateUser = user => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required()
    });
    return schema.validate(user);
}

const validatePassword = password => {
    const schema = new passwordValidator();
    schema
        .has().uppercase(1, 'The password should have a minimum of 1 uppercase letter')
        .has().lowercase(1, 'The password should have a minimum of 1 lowercase letter')
        .has().digits(1, 'The password should have a minimum of 1 digit');
    return schema.validate(password, { details: true });
}

module.exports = {
    User: mongoose.model('user', userSchema),
    validateUser,
    validatePassword
}