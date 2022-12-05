const express = require('express')
const router = express.Router()

const customerController = require('../../controllers/customer')

router.route('/customers').get(customerController.index)
router.route('/customers/register').post(customerController.register)
router.route('/customers/login').post(customerController.login);
router.route('/customers/:id').delete(customerController.delete);

module.exports = router;