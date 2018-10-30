import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import configureStore from "redux-mock-store";

import {
  default as reducer,
  Types,
  fetchPosts,
  upVotePost,
  downVotePost,
  getVisiblePosts,
  deletePost,
  getSortedPosts,
  getSortedAndVisiblePosts
} from "./posts";
import * as api from "../../api/readable-api";

describe("Posts Duck", () => {
  const middlewares = [thunk]; // add your middlewares like `redux-thunk`
  const mockStore = configureStore(middlewares);

  const mockPostList = [
    {
      id: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1467166872634,
      title: "Udacity is the best place to learn React",
      body: "Everyone says so after all.",
      author: "thingtwo",
      category: "react",
      voteScore: 0,
      deleted: false,
      commentCount: 2
    },
    {
      id: "8xf0y6ziyjabvozdd253ne",
      timestamp: 1467166872634,
      title: "Mock 2",
      body: "Everyone says so after all.",
      author: "thingtwo",
      category: "redux",
      voteScore: 0,
      deleted: true,
      commentCount: 2
    }
  ];

  describe("posts reducer", () => {
    it("should return an function by default", () => {
      const actual = typeof reducer;
      const expected = "function";
      expect(actual).toBe(expected);
    });

    it("should return the initial state", () => {
      const actual = reducer(undefined, {});
      const expected = {
        list: [],
        isFetching: false,
        sortBy: "voteScore_desc",
        activePost: null
      };
      expect(actual).toEqual(expected);
    });

    it("should handle FETCH_POSTS_SUCCESS", () => {
      const action = {
        type: Types.FETCH_POSTS_SUCCESS,
        payload: { list: mockPostList }
      };

      const actual = reducer(undefined, action);
      const expected = {
        list: mockPostList,
        isFetching: false,
        sortBy: "voteScore_desc",
        activePost: null
      };
      expect(actual).toEqual(expected);
    });

    it("should handle FETCH_POSTS_FAIL", () => {
      const action = {
        type: Types.FETCH_POSTS_FAIL,
        payload: { error: "Ops! some error" }
      };

      const actual = reducer(undefined, action);
      const expected = {
        list: [],
        isFetching: false,
        sortBy: "voteScore_desc",
        activePost: null
      };
      expect(actual).toEqual(expected);
    });

    it("should handle FETCH_POSTS_START", () => {
      const action = { type: Types.FETCH_POSTS_START };

      const actual = reducer(undefined, action);
      const expected = {
        list: [],
        isFetching: true,
        sortBy: "voteScore_desc",
        activePost: null
      };
      expect(actual).toEqual(expected);
    });

    it("should handle UPDATE_VOTE_SCORE", () => {
      const initialState = {
        list: [
          {
            id: "8xf0y6ziyjabvozdd253nd",
            voteScore: 0
          },
          {
            id: "haushdunx",
            voteScore: -1
          }
        ]
      };

      const action = {
        type: Types.UPDATE_VOTE_SCORE,
        payload: { id: "8xf0y6ziyjabvozdd253nd", voteScore: -1 }
      };

      const actual = reducer(initialState, action);
      const expected = {
        list: [
          {
            id: "8xf0y6ziyjabvozdd253nd",
            voteScore: -1
          },
          {
            id: "haushdunx",
            voteScore: -1
          }
        ],
        activePost: null
      };
      expect(actual).toEqual(expected);
    });

    it("should handle UPDATE_POST_SUCCESS", () => {
      const initialState = {
        list: [{ id: "xxx", title: "dummy post" }],
        isFetching: false
      };

      const action = {
        type: Types.UPDATE_POST_SUCCESS,
        payload: {
          post: {
            id: "xxx",
            title: "smart post"
          }
        }
      };

      const actual = reducer(initialState, action);
      const expected = {
        list: [{ id: "xxx", title: "smart post" }],
        isFetching: false,
        activePost: { id: "xxx", title: "smart post" }
      };

      expect(actual).toEqual(expected);
    });

    it("should handle FETCH_POST_START", () => {
      const initialState = {
        list: [],
        isFetching: false
      };

      const action = { type: Types.FETCH_POST_START };

      const actual = reducer(initialState, action);
      const expected = {
        list: [],
        isFetching: true
      };

      expect(actual).toEqual(expected);
    });

    it("should handle FETCH_POST_SUCCESS", () => {
      const initialState = {
        list: [],
        isFetching: false,
        activePost: null
      };

      const action = {
        type: Types.FETCH_POST_SUCCESS,
        payload: { post: { id: "xxx", title: "smart post" } }
      };

      const actual = reducer(initialState, action);
      const expected = {
        list: [],
        isFetching: false,
        activePost: { id: "xxx", title: "smart post" }
      };

      expect(actual).toEqual(expected);
    });

    it("should handle FETCH_POST_FAIL", () => {
      const initialState = {
        list: [],
        isFetching: false,
        activePost: null
      };

      const action = { type: Types.FETCH_POST_FAIL };

      const actual = reducer(initialState, action);
      const expected = {
        list: [],
        isFetching: false,
        activePost: null
      };

      expect(actual).toEqual(expected);
    });

    it("should handle UPDATE_SORT_BY", () => {
      const initialState = {
        sortBy: "voteScore_asc"
      };

      const action = {
        type: Types.UPDATE_SORT_BY,
        payload: {
          sortBy: "voteScore_desc"
        }
      };

      const actual = reducer(initialState, action);
      const expected = {
        sortBy: "voteScore_desc"
      };

      expect(actual).toEqual(expected);
    });

    it("should handle DELETE_POST_SUCCESS", () => {
      const initialState = {
        list: [
          {
            id: "8xf0y6ziyjabvozdd253nd"
          },
          {
            id: "haushdunx"
          }
        ]
      };

      const action = {
        type: Types.DELETE_POST_SUCCESS,
        payload: { id: "8xf0y6ziyjabvozdd253nd" }
      };

      const actual = reducer(initialState, action);
      const expected = {
        list: [
          {
            id: "haushdunx"
          }
        ]
      };
      expect(actual).toEqual(expected);
    });

    it("should getVisiblePost unfiltered using getVisiblePosts()", () => {
      const actual = getVisiblePosts({ list: mockPostList });
      const expected = [
        {
          id: "8xf0y6ziyjabvozdd253nd",
          timestamp: 1467166872634,
          title: "Udacity is the best place to learn React",
          body: "Everyone says so after all.",
          author: "thingtwo",
          category: "react",
          voteScore: 0,
          deleted: false,
          commentCount: 2
        }
      ];
      expect(actual).toEqual(expected);
    });

    it("should getVisiblePost filtered using getVisiblePosts()", () => {
      const actual = getVisiblePosts(
        { list: mockPostList },
        "a not existing category"
      );
      const expected = [];
      expect(actual).toEqual(expected);
    });

    it("should sort list by sortBy voteScore_desc using getSortedPosts()", () => {
      const initialState = {
        list: [
          {
            id: "vote1",
            timestamp: 1467166872634,
            voteScore: -10
          },
          {
            id: "vote2",
            timestamp: 1467166072634,
            voteScore: 20
          }
        ],
        sortBy: "voteScore_desc"
      };

      const actual = getSortedPosts(initialState);
      const expected = [
        {
          id: "vote2",
          timestamp: 1467166072634,
          voteScore: 20
        },
        {
          id: "vote1",
          timestamp: 1467166872634,
          voteScore: -10
        }
      ];
      expect(actual).toEqual(expected);
    });

    it("should sort list by sortBy voteScore_asc using getSortedPosts()", () => {
      const initialState = {
        list: [
          {
            id: "vote1",
            timestamp: 1467166872634,
            voteScore: -10
          },
          {
            id: "vote2",
            timestamp: 1467166072634,
            voteScore: 20
          }
        ],
        sortBy: "voteScore_asc"
      };

      const actual = getSortedPosts(initialState);
      const expected = [
        {
          id: "vote1",
          timestamp: 1467166872634,
          voteScore: -10
        },
        {
          id: "vote2",
          timestamp: 1467166072634,
          voteScore: 20
        }
      ];
      expect(actual).toEqual(expected);
    });

    it("should sort list by sortBy timestamp_desc getSortedPosts()", () => {
      const initialState = {
        list: [
          {
            id: "vote1",
            timestamp: 1467166872634,
            voteScore: -10
          },
          {
            id: "vote2",
            timestamp: 1467166072634,
            voteScore: 20
          }
        ],
        sortBy: "timestamp_desc"
      };

      const actual = getSortedPosts(initialState);
      const expected = [
        {
          id: "vote2",
          timestamp: 1467166072634,
          voteScore: 20
        },
        {
          id: "vote1",
          timestamp: 1467166872634,
          voteScore: -10
        }
      ];
      expect(actual).toEqual(expected);
    });

    it("should sort list by sortBy timestamp_asc using getSortedPosts()", () => {
      const initialState = {
        list: [
          {
            id: "vote1",
            timestamp: 1467166872634,
            voteScore: -10
          },
          {
            id: "vote2",
            timestamp: 1467166072634,
            voteScore: 20
          }
        ],
        sortBy: "timestamp_asc"
      };

      const actual = getSortedPosts(initialState);
      const expected = [
        {
          id: "vote1",
          timestamp: 1467166872634,
          voteScore: -10
        },
        {
          id: "vote2",
          timestamp: 1467166072634,
          voteScore: 20
        }
      ];
      expect(actual).toEqual(expected);
    });

    it("should get visible sorted posts using getSortedAndVisiblePosts()", () => {
      const initialState = {
        list: [
          {
            id: "vote1",
            timestamp: 1467166872634,
            voteScore: -10,
            deleted: true
          },
          {
            id: "vote2",
            timestamp: 1467166072634,
            voteScore: -20,
            deleted: false
          },
          {
            id: "vote3",
            timestamp: 1467166072634,
            voteScore: 30,
            deleted: false
          }
        ],
        sortBy: "voteScore_desc"
      };

      const actual = getSortedAndVisiblePosts(initialState);
      const expected = [
        {
          id: "vote3",
          timestamp: 1467166072634,
          voteScore: 30,
          deleted: false
        },
        {
          id: "vote2",
          timestamp: 1467166072634,
          voteScore: -20,
          deleted: false
        }
      ];
      expect(actual).toEqual(expected);
    });
  });
});
