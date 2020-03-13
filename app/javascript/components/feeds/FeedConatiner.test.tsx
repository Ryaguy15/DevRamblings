import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import FeedContainer from './FeedContainer';


Enzyme.configure({adapter: new Adapter()});

beforeAll(() => {
    global.fetch = jest.fn();
    //window.fetch = jest.fn(); if running browser environment
});


let wrapper;
beforeEach(() => {
    wrapper = shallow(<FeedContainer />, { disableLifecycleMethods: true });
 });

 afterEach(() => {
    wrapper.unmount();
 });

 test("Shows an error message when API Fails", (done) => {
    const spyDidMount = jest.spyOn(FeedContainer.prototype, "componentDidMount");

    fetch.mockImplementation(() => Promise.resolve({ok: false}));

    const didMount = wrapper.instance().componentDidMount();

    expect(spyDidMount).toHaveBeenCalled();

    didMount.then(() => {
        wrapper.update();
        expect(wrapper.text()).toBe('Could not load feed from server')

        //clean up
        spyDidMount.mockRestore();
        fetch.mockClear();
        done();
    })

 })

