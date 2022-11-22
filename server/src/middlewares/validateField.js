import { validationResult } from 'express-validator';
import userModel from '../models/userModel.js';

const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(errors);
    }

    next();
};

const emailAlreadyExist = async (email = '') => {
    const existEmail = await userModel.findOne({ email: email });

    if (existEmail) {
        throw new Error(`${email} is already registered`);
    }
};

const emailNotExist = async (email = '') => {
    const existEmail = await userModel.findOne({ email: email });

    if (!existEmail) {
        throw new Error(`${email} not registered`);
    }
};

export { validateFields, emailAlreadyExist, emailNotExist };
