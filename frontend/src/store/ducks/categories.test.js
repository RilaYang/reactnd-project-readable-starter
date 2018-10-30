import thunk from 'redux-thunk'
import MockAdapter from 'axios-mock-adapter'
import configureStore from 'redux-mock-store'

import {
  default as reducer,
  Types,
  fetchCategories
} from './categories'
import * as api from '../../api/readable-api'

describe('Categories Duck', () => {
  const middlewares = [thunk] // add your middlewares like `redux-thunk`
  const mockStore = configureStore(middlewares)

  const mockCategoryList = [
    {
      name: 'react',
      path: 'react'
    },
    {
      name: 'redux',
      path: 'redux'
    },
    {
      name: 'udacity',
      path: 'udacity'
    }
  ]

  describe('categories reducer', () => {
    it('should return an function by default', () => {
      const actual = typeof reducer
      const expected = 'function'
      expect(actual).toBe(expected)
    })

    it('should return the initial state', () => {
      const actual = reducer(undefined, {})
      const expected = { list: [], isFetching: false }
      expect(actual).toEqual(expected)
    })

    it('should handle FETCH_CATEGORIES_SUCCESS', () => {
      const action = {
        type: Types.FETCH_CATEGORIES_SUCCESS,
        payload: { list: mockCategoryList }
      }

      const actual = reducer(undefined, action)
      const expected = {
        list: mockCategoryList,
        isFetching: false
      }
      expect(actual).toEqual(expected)
    })

    it('should handle FETCH_CATEGORIES_FAIL', () => {
      const action = {
        type: Types.FETCH_CATEGORIES_FAIL,
        payload: { error: 'Ops! some error' }
      }

      const actual = reducer(undefined, action)
      const expected = {
        list: [],
        isFetching: false
      }
      expect(actual).toEqual(expected)
    })

    it('should handle FETCH_CATEGORIES_START', () => {
      const action = { type: Types.FETCH_CATEGORIES_START }

      const actual = reducer(undefined, action)
      const expected = {
        list: [],
        isFetching: true
      }
      expect(actual).toEqual(expected)
    })

  })
})
