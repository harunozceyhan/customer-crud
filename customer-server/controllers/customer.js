var Customer = require('../models/customer');
const express = require('express');

exports.getAllCustomers = (req, res, next) => {
    Customer.find({}, function (err, customers) {
        if (err) return next(err);
        let customerList = [];
        // Iterate fetched object list and put modified data object to customerList
        customers.forEach((customer, key) =>{
            customerList.push({customerID: customer.customerID, firstName: customer.firstName, lastName: customer.lastName, birthday: customer.birthday.toISOString().split('T')[0],
                gender: customer.gender, lastContact: customer.lastContact, customerLifetimeValue: customer.customerLifetimeValue})
        });
        // Send customerList to client
        res.send(customerList);
    })
};

exports.getCustomerDetail = (req, res, next) => {
    Customer.findOne({customerID: req.params.id}, function (err, customer) {
        if (err) return next(err);
        if (customer !== null) {
            // Modify fetched data and send to client
            res.send({customerID: customer.customerID, firstName: customer.firstName, lastName: customer.lastName, birthday: customer.birthday.toISOString().split('T')[0],
                gender: customer.gender, lastContact: customer.lastContact, customerLifetimeValue: customer.customerLifetimeValue});
        }else {
            // If no customer found with given customer id, send empty object to client
            res.send({});
        }
    })
};

exports.createCustomer = (req, res, next) => {
	const customerData = req.body;
	// Create new customer object with given request body
    var customer = new Customer(
        {
            firstName: customerData.firstName,
            lastName: customerData.lastName,
			birthday: customerData.birthday,
			gender: customerData.gender,
			lastContact: customerData.lastContact,
			customerLifetimeValue: customerData.customerLifetimeValue
		}
    );
    // Save customer object to DB and return created customerID to client
    customer.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send({
			createdId: customer.customerID
		});
    })
};

exports.updateCustomer = (req, res, next) => {
    // Find the customer object with given customerID and update the properties of the object on DB
    Customer.findOneAndUpdate({customerID: req.params.id}, {$set: req.body}, {new: true}, (err, customer) => {
		if (err) {
            return next(err);
        }
        res.send({
			updated: true
		});
	});
};

exports.deleteCustomer = (req, res, next) => {
    // Find the customer object with given customerID and delete the object from DB
    Customer.findOneAndDelete({customerID: req.params.id}, (err, customer) => {
		if (err) {
            return next(err);
        }
        res.send({
			deleted: true
		});
	});
};