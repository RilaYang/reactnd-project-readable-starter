import React from 'react';
import ReactDOM from 'react-dom';
import DefaultLayout from './DefaultLayout';

import { shallow } from 'enzyme'

it('shallow render without crashing', () => {
  const wrapper = shallow(<DefaultLayout />);
  expect(wrapper).toHaveLength(1)
});
