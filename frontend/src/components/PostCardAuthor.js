import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

export const PostCardAuthor = props => {
  const { author } = props
  return (
    <span>
      <Icon name="user" />
      <span className="author-name">{author}</span>
    </span>
  )
}

PostCardAuthor.displayName = 'PostCardAuthor'

PostCardAuthor.propTypes = {
  author: PropTypes.string.isRequired
}

PostCardAuthor.defaultProps = {
  author: 'Unknown'
}

export default PostCardAuthor
