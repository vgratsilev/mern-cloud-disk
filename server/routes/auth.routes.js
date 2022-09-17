const Router = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');
const authMiddleware = require('../middleware/auth.middleware');

const router = new Router();

router.post(
    '/registration',
    [check('email', 'Incorrect email').isEmail(), check('password', 'Password must be min 3 and max 12 symbols').isLength({ min: 3, max: 12 })],
    async (request, response) => {
        try {
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                return response.status(400).json({ message: 'Incorrect request' });
            }

            const { email, password } = request.body;

            // check if user exists in DB
            const candidate = await User.findOne({ email });
            if (candidate) {
                return response.status(400).json({ message: `User with email ${email} already exists` });
            }

            // create a new user
            const hashPassword = await bcrypt.hash(password, 8);
            const user = new User({ email, password: hashPassword });
            await user.save();
            return response.json({ message: 'User was created' });
        } catch (error) {
            console.log(error);
            return response.send({ message: 'Server Error' });
        }
    }
);

router.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;

        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).json({ message: `User with email "${email}" is not found` });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return response.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });

        return response.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                userSpace: user.usedSpace,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.log(error);
        return response.send({ message: 'Server Error' });
    }
});

router.get('/auth', authMiddleware, async (request, response) => {
    try {
        const user = await User.findOne({ _id: request.user.id });
        const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });
        return response.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                userSpace: user.usedSpace,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.log(error);
        return response.send({ message: 'Server Error' });
    }
});

module.exports = router;
