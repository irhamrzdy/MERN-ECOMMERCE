const express = require('express')
const router = express.Router()

const auth = require('../../middleware/auth')
const customerController = require('../../controllers/customer')

router.route('/customers').get(customerController.index)
router.route('/customer/:id').delete(customerController.delete);

router.post('/customer/register', customerController.register);
router.post('/customer/login', auth, customerController.login);

module.exports = router;