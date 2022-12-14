require('dotenv').config();

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin')

module.exports = {
    register: async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!(username && password)) {
                res.status(400).send("Please fill the blank input")
            }

            const oldUser = await Admin.findOne({ username })

            if (oldUser) {
                return res.status(409).send('User already exist. Please Login')
            }

            encryptedPassword = await bcrypt.hash(password, 10);

            const admin = await Admin.create({
                username,
                password: encryptedPassword
            });

            const token = jwt.sign(
                { username: admin.username },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            admin.token = token;

            res.status(201).json({ message: 'Register Success', payload: admin });
        } catch (err) {
            console.log(err)
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!(username && password)) {
                res.status(400).send("Input Required");
            }

            const admin = await Admin.findOne({ username });

            if (admin && (await bcrypt.compare(password, admin.password))) {
                const token = jwt.sign({
                    username: admin.username
                }, process.env.TOKEN_KEY, {
                    expiresIn: "2h"
                });

                admin.token = token;

                res.status(200).json({ message: 'Login Success', payload: admin })
            }
            res.status(400).send("Invalid Credentials");
        } catch (error) {
            console.log(error)
        }
    }
}