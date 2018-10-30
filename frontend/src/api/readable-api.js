import { create } from 'apisauce'

// define the api
const api = create({
  baseURL: 'http://localhost:3001',
  headers: { Authorization: 'MarioJuniorPro' }
})
// Categories 
export const getCategories = category => {
  const url = '/categories'
  return api.get(url)
}

// Posts

export const getPosts = category => {
  const url = category ? `/${category}/posts` : '/posts'
  return api.get(url)
}

export const upVotePost = id => {
  const url = `/posts/${id}`
  return api.post(url, {
    option: 'upVote'
  })
}

export const downVotePost = id => {
  const url = `/posts/${id}`
  return api.post(url, {
    option: 'downVote'
  })
}

export const deletePost = id => {
  const url = `/posts/${id}`
  return api.delete(url)
}

export const updatePost = post => {
  const {id, title, body } = post
  const url = `/posts/${id}`
  return api.put(url, {title, body})
}

export const createPost = post => {
  const url = `/posts`
  return api.post(url, post)
}

export const getPost = id => {
    const url = `/posts/${id}`
  return api.get(url)
}

// Comments


export const getComments = postId => {
  const url = `/posts/${postId}/comments`
  return api.get(url)
}

export const createComment = comment => {
  const url = `/comments`
  return api.post(url, comment)
}

export const getComment = id => {
  const url = `/comments/${id}`
  return api.get(url)
}

export const updateComment = comment => {
  const url = `/comments/${comment.id}`
  return api.put(url, comment)
}

export const deleteComment = id => {
  const url = `/comments/${id}`
  return api.delete(url)
}


export const upVoteComment = id => {
  const url = `/comments/${id}`
  return api.post(url, {
    option: 'upVote'
  })
}

export const downVoteComment = id => {
  const url = `/comments/${id}`
  return api.post(url, {
    option: 'downVote'
  })
}


export const axiosInstance = api.axiosInstance
