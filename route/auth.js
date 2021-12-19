const bcrypt = require('bcryptjs');
const config = require('config');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { User } = require('../model/User');

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        return res.send(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Something went wrong');
    }
})

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    const { error } = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().max(30).required()
    }).validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const user = await User.findOne({ email })
        if (!user || !await bcrypt.compare(password, user.password)) return res.status(400).send('Invalid user name or password');

        const payload = {
            id: user.id,
            name: user.name
        };

        const token = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 60 * 60 * 24 * 14 });
        res.cookie('token', token)
        res.send('Logged in');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Something went wrong');
    }
});

router.delete('/', auth, async (req, res) => {
    res.clearCookie('token');
    res.send('Logout');
})

module.exports = router