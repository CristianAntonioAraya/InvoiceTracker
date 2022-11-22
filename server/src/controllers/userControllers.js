import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateJwt } from '../helpers/jwt.js';

const signUp = async (req, res) => {
    const { userName, password, email } = req.body;

    try {
        const newUser = new userModel({ userName, password, email });

        const salt = bcrypt.genSaltSync();
        const encryptPassword = bcrypt.hashSync(password, salt);

        newUser.password = encryptPassword;
        await newUser.save();

        const token = await generateJwt(newUser.id, newUser.email);

        res.json({
            ok: true,
            msg: 'User create correctly',
            email: newUser.email,
            userName: newUser.userName,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Internal server error' });
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        const correctPassword = bcrypt.compareSync(password, user.password);
        if (!correctPassword) {
            return res
                .status(401)
                .json({ ok: false, msg: 'Passwords or Email doesnt match' });
        }

        const token = await generateJwt(user.id, user.email);
        res.json({
            ok: true,
            msg: 'User login correctly',
            email: user.email,
            userName: user.userName,
            token: token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Internal server error' });
    }
};

export { signUp, signIn };
