import mongoose, { Schema, model } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const invoiceModel = new Schema({
    invoiceNumber: { type: Number, unique: true, default: 0 },
    clienName: { type: String, require: true },
    userId: { type: Schema.Types.ObjectId, ref: 'user', require: true },
    invoiceDescription: { type: String, require: true },
    invoiceDate: { type: Date, default: Date.now() },
    totalAmount: { type: Number, require: true },
    linkToPay: { type: String, require: true },
});

autoIncrement.initialize(mongoose.connection);
invoiceModel.plugin(autoIncrement.plugin, {
    model: 'invoice',
    field: 'invoiceNumber',
    startAt: 1,
    incrementBy: 1,
});

export default model('invoice', invoiceModel);
