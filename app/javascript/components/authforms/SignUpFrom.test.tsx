import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {SignUpForm} from './SignUpForm'

Enzyme.configure({adapter: new Adapter()});

beforeAll(() => {
    global.fetch = jest.fn();
    //window.fetch = jest.fn(); if running browser environment
});

let wrapper;
beforeEach(() => {
    wrapper = shallow(<SignUpForm addToken={() => {}}/>, { disableLifecycleMethods: true });
 });

 afterEach(() => {
    wrapper.unmount();
 });

 test("It shows an error message when the passwords do not match", (done) => {
    // fill out the form
    wrapper.find("input").at(0).simulate('change',  {target: {value: "Tester"}});
    wrapper.find("input").at(1).simulate('change',  {target: {value: "test@email.com"}});
    wrapper.find("input").at(2).simulate('change', {target: {value: "password"}})
    wrapper.find("input").at(3).simulate('change', {target: {value: "not the same"}})

    // submit the form
    const didSumitForm = wrapper.instance().submitForm();

    didSumitForm.then(() => {
        // check if the error message appears
        expect(wrapper.text()).toMatch(/Passwords are not the same!/)

        done()
    });
 });

 test("Shows an error message when the request fails", (done) => {
    
    fetch.mockImplementation(() => Promise.resolve({ok: false, json: () => 
            Promise.resolve({message: "Server Failed"})
        })
    );
    
    
    wrapper.find("input").at(0).simulate('change',  {target: {value: "Tester"}});
    wrapper.find("input").at(1).simulate('change',  {target: {value: "test@email.com"}});
    wrapper.find("input").at(2).simulate('change', {target: {value: "password"}})
    wrapper.find("input").at(3).simulate('change', {target: {value: "password"}})
   
    // submit the form
    const didSumitForm = wrapper.instance().submitForm();

    didSumitForm.then(() => {
        wrapper.update();
        // check if the error message appears
        expect(wrapper.text()).toMatch(/Server Failed/);
        fetch.mockClear();
        done()
    });
 });


 test("It adds the token to the store", (done) => {
    fetch.mockImplementation(() => Promise.resolve({ok: true, json: () => 
        Promise.resolve({auth_token: "This is my token"})
    })
    );

    const onSuccess = jest.fn();
    const addToken = jest.fn((token) => {
        expect(token).toBe('This is my token');
    })


    let wrapper = shallow(<SignUpForm addToken={addToken} onSuccess={onSuccess}/>);
    // enter in some fake credentials
    wrapper.find("input").at(0).simulate('change',  {target: {value: "test@email.com"}});
    wrapper.find("input").at(1).simulate('change', {target: {value: "password"}});
    const didSubmitForm = wrapper.instance().submitForm();

    didSubmitForm.then(() => {
        wrapper.update()
        expect(addToken).toBeCalled(); 
        expect(onSuccess).toBeCalled();
        done();
    })
 })