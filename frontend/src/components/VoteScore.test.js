import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import VoteScore from './VoteScore'

describe('<VoteScore />', () => {
  const props = {
    voteScore: 66,
    upVote: jest.fn(),
    downVote: jest.fn()
  }
  let defaultWrapper = null
  let clearWrapper = null

  beforeEach(() => {
    const store = createStore(() => {})
    defaultWrapper = <VoteScore  {...props} />
  })

  it('should render without crash', () => {
    expect.assertions(1)
    const wrapper = mount(defaultWrapper)
    const actual = wrapper
    expect(actual).toBePresent()
  })

  it('should render an increase votes button', () => {
    expect.assertions(1)
    const wrapper = shallow(defaultWrapper)
    const actual = wrapper.find('.vote-score__button--increase')
    expect(actual).toBePresent()
  })

  it('should render an decrease votes button', () => {
    expect.assertions(1)
    const wrapper = shallow(defaultWrapper)
    const actual = wrapper.find('.vote-score__button--decrease')
    expect(actual).toBePresent()
  })

  it('should render total of votes', () => {
    expect.assertions(1)
    const wrapper = mount(defaultWrapper)
    const actual = wrapper.find('.vote-score__counter')
    const expected = "66"
    expect(actual).toHaveText(expected)
  })

  it('should have total of votes passed as props', () => {
    expect.assertions(1)
    const wrapper = mount(defaultWrapper)
    const actual = wrapper.find('VoteScore')
    const expected = 66
    expect(actual).toHaveProp('voteScore', expected)
  })

  it('should call upVotePost', () => {
    expect.assertions(1)
    const mockProps = {
      upVote: jest.fn()
    }
    const wrapper = shallow(<VoteScore {...props} {...mockProps}/>)
    const actual = wrapper.find('.vote-score__button--increase')
    actual.simulate('click')
    expect(mockProps.upVote).toHaveBeenCalledTimes(1);
  })

  it('should call downVotePost', () => {
    expect.assertions(1)
    const mockProps = {
      downVote: jest.fn()
    }
    const wrapper = shallow(<VoteScore {...props} {...mockProps}/>)
    const actual = wrapper.find('.vote-score__button--decrease')
    actual.simulate('click')
    expect(mockProps.downVote).toHaveBeenCalledTimes(1);
  })
})
