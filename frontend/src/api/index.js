const api = "http://localhost:3001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () => 
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories)

export const getCategoryPosts = name =>
    fetch(`${api}/${name}/posts`, { headers })
        .then(res => res.json())
        .then(data => data.posts)

export const getPosts = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())

/*
    post: {
        id: uid(),
        timestamp: Date.now(),
        title: [STRING],
        body: [STRING],
        author: [STRING],
        category: [CATEGORY NAME],
    }
*/
export const createPost = post =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...post })
    }).then(res => res.json())

export const getPost = id =>
    fetch(`${api}/${id}`, { headers })
        .then(res => res.json())
        .then(data => data.post)

// option = "upVote" | "downVote"
export const voteOnPost = (id, option) =>
    fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({option})
    }).then(res => res.json())

/*
    option: {
        title: [STRING],
        body: [STRING],
    }
*/
export const updatePost = post =>
    fetch(`${api}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...post})
    }).then(res => res.json())

export const deletePost = id =>
    fetch(`${api}/posts/${id}`, {
        method: 'DELETE',
        headers    
    }).then(res => res.json())

export const getPostComments = postId => 
    fetch(`${api}/posts/${postId}/comments`, { headers })
        .then(res => res.json())

export const createComment = (comment) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...comment })        
    }).then(res => res.json())

export const getComment = id =>
    fetch(`${api}/comments/${id}`, { headers })
        .then(res => res.json())
        .then(data => data.comment)

// option = "upVote" | "downVote"
export const voteOnComment = (id, option) =>
    fetch(`${api}/comments/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({option})
    }).then(res => res.json())

/*
    option: {
        timestamp: Date.now(),
        body: [STRING],
    }
*/
export const updateComment = comment =>
    fetch(`${api}/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...comment})
    }).then(res => res.json())

export const deleteComment = id =>
    fetch(`${api}/comments/${id}`, {
        method: 'DELETE',
        headers
    }).then(res => res.json())