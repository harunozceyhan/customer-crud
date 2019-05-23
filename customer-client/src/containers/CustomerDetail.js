import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchCustomerDetailData } from '../actions';
import CustomerDetailForm from '../components/customer/CustomerDetailForm';
import axios from 'axios';
import {serverApiUrl} from '../config'
import {toastr} from 'react-redux-toastr'

class CustomerDetail extends Component {

    state = {
        customerDetail: {
            customerID: '',
            firstName: '',
            lastName: '',
            birthday: (new Date().toISOString()),
            gender: '',
            lastContact: (new Date().toISOString()),
            customerLifetimeValue: ''
        },
        validated: false
    };

    // If id exists in url, a customer will be edited. Fetch customer detail data.
    // Otherwise, new customer will be added.
    componentWillMount = () => {
        if (this.props.match.params.id) {
            this.props.fetchCustomerDetailData(this.props.match.params.id);
        }
    }
    // Customer Detail Data will be changed if customer id exists in url
    // Following method updates the state value when customerDetail changed.
    componentWillReceiveProps = nextProps => {
        if (nextProps.customerDetail !== this.state.customerDetail) {
            this.setState({customerDetail: nextProps.customerDetail});
        }
    }

    onChange = (event, modifiers, dayPickerInput) => {

        if(event === undefined ) {  // DayPicker on value deleted manually
            return
        } else if (event.target === undefined) { // DayPicker on date selected
            this.setState(state => {
                state.customerDetail[dayPickerInput.props.name] = event.toISOString();
                return state;
            });
        } else {  // Other form input values
            const target = event.target;
            const name = target.name;
            let value = target.value;
            // Allow only decimal values for Life Time Value
            if (name === 'customerLifetimeValue') {
                value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
            }

            // Update state value of changed object
            this.setState(state => {
                state.customerDetail[name] = value;
                return state;
            });
        }


    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            if(this.state.customerDetail.customerID) {  // Update customer

                axios.put(`${serverApiUrl}/${this.state.customerDetail.customerID}`, this.state.customerDetail).then(response => {
                    if (response.data.updated) {
                        toastr.success('Success', 'Customer added successfully!');
                        this.props.history.push("/customers");
                    }else {
                        toastr.error('Error', 'An error has occured while updating customer!');
                    }
                }).catch(error => {
                    toastr.error('Error', 'An error has occured while updating customer!');
                });

            } else {   // Add new Customer
                axios.post(`${serverApiUrl}`, this.state.customerDetail).then(response => {
                   if (response.data.createdId > 0) {
                       toastr.success('Success', 'Customer added successfully!');
                       this.props.history.push("/customers");
                   }else {
                       toastr.error('Error', 'An error has occured while adding customer!');
                   }
                }).catch(error => {
                    toastr.error('Error', 'An error has occured while adding customer!');
                });
            }
        }
        // Set validated: true to see error messages in form
        this.setState({ validated: true });
        event.preventDefault();
        event.stopPropagation();
    }

    onBack = () => {
        this.props.history.goBack();  // Go Customer List Page
    }


    render() {
        return (
            <div>
                <CustomerDetailForm validated={this.state.validated} customerDetail={this.state.customerDetail} onChange={this.onChange} handleSubmit={this.handleSubmit} onBack={this.onBack} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        customerDetail: state.customerReducer.customerDetail
    }
}

const mapDispatchToProps = {
    fetchCustomerDetailData
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerDetail));
