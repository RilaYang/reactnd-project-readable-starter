import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'

import PostFormEdit, { PostFormEdit as PostFormEditClear } from './PostFormEdit'

describe('<Comment />', () => {
  const props = {
  }

  let defaultWrapper = null
  let clearWrapper = null
  let store = null

  beforeEach(() => {
    store = createStore(() => {})
    defaultWrapper = (
      <Provider store={store}>
        <Router>
          <PostFormEdit {...props} />
        </Router>
      </Provider>
    )
    clearWrapper = <PostFormEditClear {...props} />
  })

  it('should render without crash', () => {
    expect.assertions(1)
    const wrapper = shallow(defaultWrapper)
    const actual = wrapper
    expect(actual).toBePresent()
  })
})
