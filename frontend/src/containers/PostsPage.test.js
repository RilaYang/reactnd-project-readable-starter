import React from 'react';
import ReactDOM from 'react-dom';
import PostsPage from './PostsPage';

import { shallow } from 'enzyme'

xit('shallow render without crashing', () => {
  const wrapper = shallow(<PostsPage />);
  expect(wrapper).toHaveLength(1)
});
