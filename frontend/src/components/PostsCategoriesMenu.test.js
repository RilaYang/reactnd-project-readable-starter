import React from 'react'
import { createStore } from 'redux'
import { shallow, mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'

import PostsCategoriesMenu from './PostsCategoriesMenu'

describe('<PostsCategoriesMenu />', () => {
  const props = {
    categories: [
      {name: 'React', path: 'react', active: false }
    ]
  }

  let defaultWrapper = null
  let clearWrapper = null

  beforeEach(() => {
    const store = createStore(() => {})
    defaultWrapper = <Router><PostsCategoriesMenu  {...props} /></Router>
    clearWrapper = <PostsCategoriesMenu {...props} />
  })


  it('should render without crash', () => {
    expect.assertions(1)
    const wrapper = shallow(defaultWrapper)
    const actual = wrapper
    expect(actual).toBePresent()
  })

  xit('should render links based on props', () => {
    expect.assertions(1)
    const wrapper = mount(defaultWrapper)
    const actual = wrapper.find('MenuItem')
    expect(actual).toHaveLength(3)
  })

  // it('should have all property passed ', () => {
  //   expect.assertions(2)
  //   const wrapper = mount(<Router><PostsCategories {...props} /></Router>)
  //   const actual = wrapper.find('PostsCategories')
  //   expect(actual).toHaveProp('title', 'Udacity is the best place to learn React')
  //   expect(actual).toHaveProp('path', '/posts/1')
  // })
})
