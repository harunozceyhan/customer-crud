import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CustomerList from '../containers/CustomerList'
import store from '../store';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });

describe('CustomerList container component unit test', () => {
    it('renders without crashing', () => {
        shallow(<Provider store={store}><CustomerList /></Provider>);
    });
});