import jwt from 'jsonwebtoken';

const generateJwt = (id, userName) => {
    return new Promise((resolve, reject) => {
        console.log(id, userName);

        const secret = process.env.JWT_SECRET;
        const payload = { id, userName };
        jwt.sign(payload, secret, { expiresIn: '1d' }, (error, token) => {
            if (error) {
                console.log(error);
                reject('Error generating token');
            }
            resolve(token);
        });
    });
};
const validateJwt = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({ ok: false, msg: 'Token missing' });
    }
    try {
        const { id, userName } = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = id;
        req.userName = userName;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Invalid Token!',
        });
    }
};

export { generateJwt, validateJwt };
