import React from 'react';
import { shallow } from 'enzyme';
import DashboardPage from '../../components/DashboardPage';

test('should render DashboardPage correctly', () => {
    global.window = jest.fn(() => ({
        location: {
            prototol: 'http://'
        }
    }));

    const wrapper = shallow(<DashboardPage />);
    expect(wrapper).toMatchSnapshot();
});