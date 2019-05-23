import { GET_ALL_CUSTOMERS, GET_CUSTOMER_DETAIL } from '../actions/types';

const initialState = {
    customerDetail: {
        customerID: '',
    },
    customerList: []
}

export default function customerReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_CUSTOMERS:
            return {
                ...state,
                customerList: action.customerList
            };
        case GET_CUSTOMER_DETAIL:
            return {
                ...state,
                customerDetail: action.customerDetail
            };
        default:
            return state;
    }
}