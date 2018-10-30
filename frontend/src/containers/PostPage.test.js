import React from 'react';
import ReactDOM from 'react-dom';
import PostPage from './PostPage';

import { shallow } from 'enzyme'

xit('shallow render without crashing', () => {
  const wrapper = shallow(<PostPage />);
  expect(wrapper).toHaveLength(1)
});
