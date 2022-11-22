import { Router } from 'express';
import { check } from 'express-validator';
import { signIn, signUp } from '../controllers/userControllers.js';
import {
    emailAlreadyExist,
    emailNotExist,
    validateFields,
} from '../middlewares/validateField.js';

const route = Router();

route.post(
    '/signUp',
    [
        check('userName').not().isEmpty(),
        check('password').not().isEmpty(),
        check('email').isEmail(),
        check('email').custom(emailAlreadyExist),
        validateFields,
    ],
    signUp
);
route.post(
    '/signIn',
    [
        check('password').not().isEmpty(),
        check('email').isEmail(),
        check('email').custom(emailNotExist),
        validateFields,
    ],
    signIn
);

export default route;
