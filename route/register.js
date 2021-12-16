const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { User, validateUser, validatePassword } = require('../model/User')

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const passError = validatePassword(password);
    if (passError.length > 0) return res.status(400).send(passError[0].message);


    try {
        if (await User.findOne({ email }) !== null) return res.status(401).send('Email already exist');

        const hashedPass = await bcrypt.hash(password, 10);
        let user = new User({ name, email, password: hashedPass });
        await user.save();

        const payload = {
            id: user.id,
            name
        }
        const token = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 60 * 60 * 24 * 14 });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 24 * 14
        });

        res.status(200).send('Registered');

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Something went wrong');
    }

})

module.exports = router;