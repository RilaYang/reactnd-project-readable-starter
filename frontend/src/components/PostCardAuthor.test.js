import React from 'react'
import { shallow, mount } from 'enzyme'
import PostCardAuthor from './PostCardAuthor'

describe('<PostCardAuthor />', () => {

  const props = {
    author: 'Mario Costa Junior'
  }

  it('should render without crash', () => {
    expect.assertions(1)
    const wrapper = shallow(<PostCardAuthor {...props} />)
    const actual = wrapper
    expect(actual).toBePresent();
  });

  it('should render author', () => {
    expect.assertions(1)
    const wrapper = shallow(<PostCardAuthor {...props} />)
    const actual = wrapper.find('.author-name')
    const expected = 'Mario Costa Junior'
    expect(actual).toHaveText(expected)
  })
  
  it('should have all property passed ', () => {
    expect.assertions(1)
    const wrapper = mount(<PostCardAuthor {...props} />)
    const actual = wrapper
    expect(actual).toHaveProp('author', 'Mario Costa Junior')
  })
})
