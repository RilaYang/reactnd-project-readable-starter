// import configureStore from '../configureStore'
import { createStore } from 'redux';
import { default as rootReducer } from './'
import posts from './posts'

describe('Ducks index.js', () => {
  it('should export post reducer as combined default', () => {
    const store = createStore(rootReducer)
    expect(store.getState().posts).toEqual(posts(undefined, {}))
  })
})