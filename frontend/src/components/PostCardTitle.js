import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const PostCardTitle = props => {
  const { title, category, id} = props
  return (
    <span className="posts-card__title">
      <Link to={`/${category}/${id}`} className="posts-card__link">
        {title}
      </Link>
    </span>
  )
}

PostCardTitle.displayName = 'PostCardTitle'

PostCardTitle.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string
}

export default PostCardTitle
