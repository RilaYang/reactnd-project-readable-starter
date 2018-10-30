import React from 'react'
import configureStore from 'redux-mock-store'
import Root from './Root'
import { shallow } from 'enzyme'


describe('<Root />', () => {
  const mockStore = configureStore([])
  const store = mockStore({})

  it('should render without crash', () => {
    expect.assertions(1)
    const wrapper = shallow(<Root store={store} />)
    expect(wrapper).toBePresent()
  });
});