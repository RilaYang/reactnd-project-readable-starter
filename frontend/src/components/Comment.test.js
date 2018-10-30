import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'

import Comment, { Comment as CommentClear } from './Comment'

describe('<Comment />', () => {
  const props = {
    // post: {
    //   id: 'yy12gy12',
    //   title: 'Udacity is the best place to learn React',
    //   body:
    //     'Body of post --- Body of post --- Body of post --- Body of post --- Body of post --- Body of post ---',
    //   voteScore: 66,
    //   timestamp: 1467166872634
    // }
  }

  let defaultWrapper = null
  let clearWrapper = null
  let store = null

  beforeEach(() => {
    store = createStore(() => {})
    defaultWrapper = (
      <Provider store={store}>
        <Router>
          <Comment {...props} />
        </Router>
      </Provider>
    )
    clearWrapper = <CommentClear {...props} />
  })

  it('should render without crash', () => {
    expect.assertions(1)
    const wrapper = shallow(defaultWrapper)
    const actual = wrapper
    expect(actual).toBePresent()
  })
})
