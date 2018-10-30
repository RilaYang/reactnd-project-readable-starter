import React from 'react';
import ReactDOM from 'react-dom';
import DefaultFooter from './DefaultFooter';

import { shallow } from 'enzyme'

it('shallow render without crashing', () => {
  const wrapper = shallow(<DefaultFooter />);
  expect(wrapper).toHaveLength(1)
});
