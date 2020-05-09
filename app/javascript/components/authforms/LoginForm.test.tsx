import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {LoginForm}  from './LoginForm';




Enzyme.configure({adapter: new Adapter()});

beforeAll(() => {
    global.fetch = jest.fn();
    //window.fetch = jest.fn(); if running browser environment
});

let wrapper;
beforeEach(() => {
    wrapper = shallow(<LoginForm addToken={() => {}} />, { disableLifecycleMethods: true });
 });

 afterEach(() => {
    wrapper.unmount();
 });

test("It shows the error notification with incorrect auth", (done) => {
    // the fetch will fail
    fetch.mockImplementation(() => Promise.resolve({ok: false, json: () => 
        Promise.resolve({message: "Invalid Credentials"})
    })
    );

    // enter in some fake credentials
    wrapper.find("input").at(0).simulate('change',  {target: {value: "test@email.com"}});
    wrapper.find("input").at(1).simulate('change', {target: {value: "password"}});

    const didSumitForm = wrapper.instance().submitForm();
    didSumitForm.then(() => {
        wrapper.update();
        expect(wrapper.text()).toMatch(/Invalid Credentials/)
        
        // the forms should also show red as well
        expect(wrapper.find("input").at(0).prop('className').split(" ")).toContain("is-danger")
        expect(wrapper.find("input").at(1).prop('className').split(" ")).toContain("is-danger") 

        fetch.mockClear()
        done();
    });
});


test("It add the token to the store", (done) => {

    fetch.mockImplementation(() => Promise.resolve({ok: true, json: () => 
        Promise.resolve({auth_token: "This is my token"})
    })
    );

    const onSuccess = jest.fn();
    const addToken = jest.fn((token) => {
        expect(token).toBe('This is my token');
    })


    let wrapper = shallow(<LoginForm addToken={addToken} onSuccess={onSuccess}/>);
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
    
});