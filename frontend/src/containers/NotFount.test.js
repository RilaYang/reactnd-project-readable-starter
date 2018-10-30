import React from 'react';
import ReactDOM from 'react-dom';
import NotFound from './NotFound';

import { shallow } from 'enzyme'

it('shallow render without crashing', () => {
  const wrapper = shallow(<NotFound />);
  expect(wrapper).toHaveLength(1)
});
