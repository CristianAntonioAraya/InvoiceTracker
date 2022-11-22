import invoiceModel from '../models/invoiceModel.js';

const createNewInvoice = async (req, res) => {
    const { clientName, invoiceDescription, totalAmount, linkToPay } = req.body;
    try {
        const { userId } = req;

        const invoice = new invoiceModel({
            clientName,
            invoiceDescription,
            totalAmount,
            linkToPay,
            userId,
        });

        await invoice.save();

        res.json({ ok: true, msg: 'Invoice created correctly', invoice });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Internal server error' });
    }
};

const getInvoiceByOwner = async (req, res) => {
    try {
        const { userId, userName } = req;
        const invoices = await invoiceModel.find({ userId });

        res.json({
            ok: true,
            msg: `Invoices from ${userName}`,
            invoices,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Internal server error' });
    }
};

const getAllInvoices = async (req, res) => {
    const task = await invoiceModel.find();
    res.json({
        ok: true,
        task,
    });
};

export { createNewInvoice, getAllInvoices, getInvoiceByOwner };
