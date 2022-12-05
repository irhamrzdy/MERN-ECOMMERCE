require("dotenv").config();

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const Customer = require('../models/customer')

module.exports = {
    index: async (req, res) => {
        try {
            const customers = await Customer.find({});
            res.json({ message: 'Success', customers: customers })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    },
    register: async (req, res) => {
        try {
            const { first_name, last_name, email, password } = req.body;

            if (!(email && password && first_name && last_name)) {
                res.status(400).send("Please fill the blank input")
            }

            const oldUser = await Customer.findOne({ email })

            if (oldUser) {
                return res.status(409).send('User already exist. Please Login')
            }

            encryptedPassword = await bcrypt.hash(password, 10);

            const customer = await Customer.create({
                first_name,
                last_name,
                email: email.toLowerCase(),
                password: encryptedPassword
            });

            const token = jwt.sign(
                { customer_id: customer._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            customer.token = token;

            res.status(201).json({ message: 'Register Success', payload: customer });
        } catch (err) {
            console.log(err)
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!(email && password)) {
                res.status(400).send("Input Required");
            }

            const customer = await Customer.findOne({ email });

            if (customer && (await bcrypt.compare(password, customer.password))) {
                const token = jwt.sign({
                    customer_id: customer._id, email
                }, process.env.TOKEN_KEY, {
                    expiresIn: "2h"
                });

                customer.token = token;

                res.status(200).json({ message: 'Login Success', payload: customer })
            }
            res.status(400).send("Invalid Credentials");
        } catch (error) {
            console.log(error)
        }
    },
    delete: async (req, res) => {
        const customerId = req.params.id;
        try {
            const deletedCustomer = await Customer.findByIdAndDelete(customerId)
            res.status(200).json({ message: 'Customer Deleted', deleted_customer: deletedCustomer })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }

    }
}