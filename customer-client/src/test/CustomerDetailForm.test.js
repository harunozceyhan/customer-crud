import React from 'react';
import { shallow, mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import CustomerDetailForm from '../components/customer/CustomerDetailForm'

configure({ adapter: new Adapter() });

let mockData = {
    customerID: 1,
    firstName: "Test Name",
    lastName: "Test Last name",
    gender: "w",
    customerLifetimeValue: 4.5,
    birthday: "1996-10-12",
    lastContact: "2017-06-01T23:28:56.782Z"
};

describe('CustomerDetailForm component unit test', () => {
    it('renders without crashing', () => {
        shallow(<CustomerDetailForm customerDetail={mockData} />);
    });
});

describe('CustomerDetailForm snapshot test', () => {
    it('matches the snapshot', () => {
        // shallow doesn't create component tree.
        // Instead of shallow, renderer is used to create component tree
        const tree = renderer.create(<CustomerDetailForm customerDetail={mockData} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

// Check all form element values for given mockData
describe('CustomerDetailForm Component Form Element Tests', () => {
    it('Element with name firstName value should be "Test Name"', () => {
        let wrapper = mount(<CustomerDetailForm customerDetail={mockData} onChange={()=>{}}/>);
        expect(wrapper.find('input[name="firstName"]').props().value).toEqual('Test Name');
    });

    it('Element with name lastName value should be "Test Last name"', () => {
        let wrapper = mount(<CustomerDetailForm customerDetail={mockData} onChange={()=>{}}/>);
        expect(wrapper.find('input[name="lastName"]').props().value).toEqual('Test Last name');
    });

    it('Birthday Element value should be "1996-10-12"', () => {
        let wrapper = mount(<CustomerDetailForm customerDetail={mockData} onChange={()=>{}}/>);
        expect(wrapper.find('.DayPickerInput').first().find('input').props().value).toEqual('1996-10-12');
    });

    it('Radio Element with value "w" value should be checked', () => {
        let wrapper = mount(<CustomerDetailForm customerDetail={mockData} onChange={()=>{}}/>);
        expect(wrapper.find('input[value="w"]').props().checked).toEqual(true);
    });

    it('Radio Element with value "m" value should not be checked', () => {
        let wrapper = mount(<CustomerDetailForm customerDetail={mockData} onChange={()=>{}}/>);
        expect(wrapper.find('input[value="m"]').props().checked).toEqual(false);
    });


    it('LastContact Element value should be "2017-06-01"', () => {
        let wrapper = mount(<CustomerDetailForm customerDetail={mockData} onChange={()=>{}}/>);
        expect(wrapper.find('.DayPickerInput').at(1).find('input').props().value).toEqual('2017-06-01');
    });

    it('Element with name lastName value should be "4.5"', () => {
        let wrapper = mount(<CustomerDetailForm customerDetail={mockData} onChange={()=>{}}/>);
        expect(wrapper.find('input[name="customerLifetimeValue"]').props().value).toEqual(4.5);
    });
});



