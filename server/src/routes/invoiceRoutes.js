import { Router } from 'express';
import { check } from 'express-validator';
import {
    createNewInvoice,
    getAllInvoices,
    getInvoiceByOwner,
} from '../controllers/invoiceControllers.js';
import { validateJwt } from '../helpers/jwt.js';
import { validateFields } from '../middlewares/validateField.js';

const route = Router();

route.post(
    '/create',
    [
        validateJwt,
        check('clientName').not().isEmpty(),
        check('invoiceDescription').not().isEmpty(),
        check('totalAmount').not().isEmpty(),
        check('linkToPay').not().isEmpty(),
        validateFields,
    ],
    createNewInvoice
);
route.get('/all', getAllInvoices);
route.get('/invoices', validateJwt, getInvoiceByOwner);

export default route;
