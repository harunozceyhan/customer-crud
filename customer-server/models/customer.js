const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

let CustomerSchema = new Schema({
    customerID: {type: Number, index: true},
	firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
	birthday: {type: Date, required: true},
	gender: {type: String, required: true, max: 1},
	lastContact: {type: Date, required: true},
	customerLifetimeValue: {type: Number, required: true},
});

// Adds sequence to schema and auto-increment customerId field by using the sequence.
CustomerSchema.plugin(AutoIncrement, {id:'customer_seq', inc_field: 'customerID'});

// Export the model
module.exports = mongoose.model('Customer', CustomerSchema);