const express = require('express')
const router = express.Router()

const auth = require('../../middleware/auth')
const adminController = require('../../controllers/admin')

router.post('/admin/register', adminController.register);
router.post('/admin/login', auth, adminController.login);

module.exports = router;