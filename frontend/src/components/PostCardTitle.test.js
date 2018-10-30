import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'

import PostCardTitle from './PostCardTitle'

describe('<PostCardTitle />', () => {
  const props = {
    title: 'Udacity is the best place to learn React',
    id: '8xf0y6ziyjabvozdd253nd',
    category: 'react'
  }

  it('should render without crash', () => {
    expect.assertions(1)
    const wrapper = shallow(<PostCardTitle {...props} />)
    const actual = wrapper
    expect(actual).toBePresent()
  })

  it('should render the title inside a link', () => {
    expect.assertions(1)
    const wrapper = mount(<Router><PostCardTitle {...props} /></Router>)
    const actual = wrapper.find('.posts-card__link').first()
    const expected = 'Udacity is the best place to learn React'
    expect(actual).toHaveText(expected)
  })

  it('should have all property passed ', () => {
    expect.assertions(3)
    const wrapper = mount(<Router><PostCardTitle {...props} /></Router>)
    const actual = wrapper.find('PostCardTitle')
    expect(actual).toHaveProp('id', '8xf0y6ziyjabvozdd253nd')
    expect(actual).toHaveProp('title', 'Udacity is the best place to learn React')
    expect(actual).toHaveProp('category', 'react')
  })
})
