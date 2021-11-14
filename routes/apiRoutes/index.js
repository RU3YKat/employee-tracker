const express = require('express');
const router = express.Router();

router.use(require('./departmentsRoutes'));
router.use(require('./rolesRoutes'));


module.exports = router;