import React from 'react'
import { shallow, mount } from 'enzyme'
import CommentCount from './CommentCount'

describe('<CommentCount />', () => {

  const props = {
    count: 7
  }

  it('should render without crash', () => {
    expect.assertions(1)
    const wrapper = shallow(<CommentCount count={ props.count } />)
    const actual = wrapper
    expect(actual).toBePresent();
  });

  it('should render total of a single comment', () => {
    expect.assertions(1)
    const wrapper = mount(<CommentCount count={ 1 } />)
    const actual = wrapper.find('.comments-count')
    const expected = '1 comment'
    expect(actual).toIncludeText(expected)
  })

  it('should render total of multiples comments pluralized', () => {
    expect.assertions(1)
    const wrapper = mount(<CommentCount count={ 2 } />)
    const actual = wrapper.find('.comments-count')
    const expected = '2 comments'
    expect(actual).toIncludeText(expected)
  })

  it('should have comment count passed as props', () => {
    expect.assertions(1)
    const wrapper = mount(<CommentCount count={ props.count } />)
    const actual = wrapper
    const expected = 7
    expect(actual).toHaveProp('count', expected)
  })
})
