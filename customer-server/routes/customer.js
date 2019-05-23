var express = require('express');
var router = express.Router();

// Require the controllers to perform CRUD operations!
var customerController = require('../controllers/customer');

/* 
 *Gets the requests and sends them to controller methods 
 */
router.get('/', customerController.getAllCustomers);

router.get('/:id', customerController.getCustomerDetail);

router.post('/', customerController.createCustomer);

router.put('/:id', customerController.updateCustomer);

router.delete('/:id', customerController.deleteCustomer);

module.exports = router;