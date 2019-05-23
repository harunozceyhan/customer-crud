import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllCustomerData } from '../actions';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import {toastr} from 'react-redux-toastr'
import axios from 'axios';
import {serverApiUrl} from '../config'

class CustomerList extends Component {

    componentDidMount = () => {
        this.props.fetchAllCustomerData();
    }

    onCustomerDeleteClick = (customerId) => {

        axios.delete(`${serverApiUrl}/${customerId}`).then(response => {
            toastr.success('Success', 'Customer deleted successfully!');
            this.props.fetchAllCustomerData();
        }).catch(error => {
            toastr.error('Error', 'An error has occured while deleting customer!');
        });
    };

    render() {
        const {customers} = this.props;
        return (
            <div>
                <Card>
                    <Card.Header>
                        <h3 className="float-left">Customer List</h3>
                        <Link to={`/customer-detail`} className="btn btn-success float-right">Create New Customer</Link>
                    </Card.Header>
                    <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Customer ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>BirthDay</th>
                                        <th>LifeTime Value</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {customers.map(customer =>
                                    <tr key={customer.customerID}>
                                        <td>{customer.customerID}</td>
                                        <td>{customer.firstName}</td>
                                        <td>{customer.lastName}</td>
                                        <td>{customer.birthday}</td>
                                        <td>{customer.customerLifetimeValue}</td>
                                       <td className="buttons">
                                            <Link className="btn btn-primary btn-sm" to={`/customer-detail/${customer.customerID}`}>Edit</Link>
                                            <Button variant="danger" size="sm" className="margin-left-12" onClick={() => this.onCustomerDeleteClick(customer.customerID)}>Delete</Button>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <span>Number Of Customers: {customers.length}</span>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        customers: state.customerReducer.customerList
    }
}

const mapDispatchToProps = {
    fetchAllCustomerData
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
