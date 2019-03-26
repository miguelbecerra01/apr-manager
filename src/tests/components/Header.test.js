import React from 'react';
//** https://airbnb.io/enzyme/docs/api/shallow.html
import { shallow } from 'enzyme';

//***test only the component not the all dom
// import ReactShallowRenderer from 'react-test-renderer/shallow';
import { Header } from '../../components/Header';


test('should render Header correctly', () => {
  const wrapper = shallow(<Header startLogout={() => { }} />);
  //creates a new snapshot 
  expect(wrapper).toMatchSnapshot();

  // ** access to elements in the component using enzyme
  // expect(wrapper.find('h1').length).toBe(1);
  // expect(wrapper.find('h1').text()).toBe('Expensify');

  // *** create snapshots
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
});


test('should startLogout on button click ', () => {
  //declare the function spy
  let startLogout = jest.fn();
  //send the function spy to the component
  const wrapper = shallow(<Header startLogout={startLogout} />);

  //simulate the action click
  wrapper.find('button').simulate('click');

  //expect that the startLogout function has been called
  expect(startLogout).toHaveBeenCalled();
});

