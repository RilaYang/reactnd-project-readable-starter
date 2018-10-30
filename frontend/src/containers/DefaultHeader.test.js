import React from 'react';
import ReactDOM from 'react-dom';
import DefaultHeader from './DefaultHeader';

import { shallow } from 'enzyme'

it('shallow render without crashing', () => {
  const wrapper = shallow(<DefaultHeader />);
  expect(wrapper).toHaveLength(1)
});
