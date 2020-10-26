const Joi = require("joi");
const bcrypt = require("bcryptjs");
const moment = require("moment");
moment().format();
function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        isAdmin: Joi.boolean().required(),
    });

    return schema.validate(user);
}

function validateLoginInput(input) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(input);
}

function validateRegisterInput(input) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        company: Joi.string().required(),
        email: Joi.string().required().email(),
        address: Joi.string().required(),
        password: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(input);
}

function validateEmail(input) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
    });

    return schema.validate(input);
}

function validatePassword(input) {
    const schema = Joi.object({
        password: Joi.string().min(5).max(255).required(),
    });
    return schema.validate(input);
}

exports.validateUser = validateUser;
exports.validateRegisterInput = validateRegisterInput;
exports.validateEmail = validateEmail;
exports.validateLoginInput = validateLoginInput;
exports.validatePassword = validatePassword;
