import { GET_ALL_CUSTOMERS, GET_CUSTOMER_DETAIL } from './types';
import {serverApiUrl} from '../config'
import axios from 'axios';

export const fetchAllCustomers = (customerList) => {
    return {
        type: GET_ALL_CUSTOMERS,
        customerList
    }
};

export const fetchAllCustomerData = () => {
    return (dispatch) => {
        return axios.get(`${serverApiUrl}`)
            .then(response => {
                dispatch(fetchAllCustomers(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const fetchCustomerDetail = (customerDetail) => {
    return {
        type: GET_CUSTOMER_DETAIL,
        customerDetail
    }
};

export const fetchCustomerDetailData = (id) => {
    return (dispatch) => {
        return axios.get(`${serverApiUrl}/${id}`)
            .then(response => {
                dispatch(fetchCustomerDetail(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};

