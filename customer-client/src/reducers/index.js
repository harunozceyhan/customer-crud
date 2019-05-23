import { combineReducers } from 'redux';
import customerReducer from './customerReducer';
import {reducer as toastrReducer} from 'react-redux-toastr'

export default combineReducers({
    customerReducer,
    toastr: toastrReducer // <- Mounted at toastr.
});