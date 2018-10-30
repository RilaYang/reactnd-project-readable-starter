import React from 'react';
import ReactDOM from 'react-dom';
import ScrollToTop from './ScrollToTop';

import { shallow } from 'enzyme'

it('shallow render without crashing', () => {
  const wrapper = shallow(<ScrollToTop />);
  expect(wrapper).toHaveLength(1)
});
