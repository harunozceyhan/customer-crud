const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../index');

let mockData = {
    firstName: "Test Name",
    lastName: "Test Last name",
    gender: "w",
    customerLifetimeValue: 4.5,
    birthday: "1996-10-12",
    lastContact: "2017-06-01T23:28:56.782Z"
};
let createdCustomerId = 0;

describe('Testing the post /api route', function() {

    it('should return OK status', function() {
        return request(app)
            .post('/api')
            .send(mockData)
            .set('Accept', 'application/json')
            .then(function(response){
                console.log(response.text);
                createdCustomerId = JSON.parse(response.text).createdId;
                assert.equal(response.status, 200)
            })
    });

    it('should return 500 status', function() {
        return request(app)
            .post('/api')
            .then(function(response){
                assert.equal(response.status, 500)
            })
    });

});

describe('Testing the get /api route', function() {

    it('should return OK status', function() {
        return request(app)
            .get('/api')
            .then(function(response){
                assert.equal(response.status, 200)
            })
    });

    it('should return message on rendering', function() {
        return request(app)
            .get('/api')
            .then(function(response){
                expect(response.text).to.contain('customerID');
            })
    });

});

describe('Testing the get /api/:id route', function() {

    it('should return OK status', function() {
        return request(app)
            .get('/api/3')
            .then(function(response){
                assert.equal(response.status, 200)
            })
    });

});

describe('Testing the put /api/:id route', function() {

    it('should return OK status', function() {
        console.log(createdCustomerId);
        return request(app)
            .put('/api/' + createdCustomerId )
            .send(mockData)
            .set('Accept', 'application/json')
            .then(function(response){
                assert.equal(response.status, 200)
            })
    });

});

describe('Testing the delete /api/:id route', function() {

    it('should return OK status', function() {
        return request(app)
            .delete('/api/' + createdCustomerId )
            .set('Accept', 'application/json')
            .then(function(response){
                assert.equal(response.status, 200)
            })
    });

});