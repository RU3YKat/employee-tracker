const express = require('express');
const router = express.Router();

router.use(require('./departmentsRoutes'));
router.use(require('./rolesRoutes'));
router.use(require('./employeeRoutes'));

module.exports = router;