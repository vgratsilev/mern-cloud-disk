const Router = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

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
            const hashPassword = await bcrypt.hash(password, 15);
            const user = new User({ email, password: hashPassword });
            await user.save();
            return response.json({ message: 'User was created' });
        } catch (error) {
            console.log(error);
            return response.send({ message: 'Server Error' });
        }
    }
);

module.exports = router;
