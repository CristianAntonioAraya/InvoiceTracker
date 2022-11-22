import { Schema, model } from 'mongoose';

const userModel = new Schema(
    {
        userName: { type: String, require: true },
        password: { type: String, require: true },
        email: { type: String, require: true, unique: true },
    },
    { timestamps: true }
);

export default model('user', userModel);
