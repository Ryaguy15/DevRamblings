import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {NavBar} from "./NavBar";
import React from "react";

Enzyme.configure({adapter: new Adapter()});


test("NavBar shows menu on mobile", () => {
    const wrapper = shallow(<NavBar />);

    // the burger and menu should not have the is-active class
    expect(wrapper.find(".is-active").length).toBe(0);

    // click the burger
    wrapper.find(".burger").simulate("click");

    expect(wrapper.find(".is-active").length).toBe(2)

});

test("NavBar shows login form modal", () => {
    const wrapper = shallow(<NavBar />);

    // the modal should not have the is-active css class
    expect(wrapper.find('.is-active').length).toBe(0);

    // click on the login button
    wrapper.find('.is-light').simulate("click")

    // Check if the modal div now has the is-active class
    expect(wrapper.find('.is-active').length).toBe(1);
    expect(wrapper.find('.is-active').prop('className').split(" ")).toContain('modal')

})