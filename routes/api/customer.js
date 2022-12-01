const express = require('express')
const router = express.Router()

const customerController = require('../../controllers/customer')

router.route('/customers').get(customerController.index).post(customerController.register);
router.route('/customers/:id').delete(customerController.delete);

module.exports = router;