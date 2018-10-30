import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'


export const CommentCount = (props) => {
  const commentCount = props.count
  const commentCountSumary = commentCount === 1 ? `${commentCount} comment` : `${commentCount} comments`
  return (
    <span>
      <Icon name="comments" />
      <span className="comments-count">{commentCountSumary}</span>
    </span>
  )
}

CommentCount.displayName = 'CommentCount'

CommentCount.propTypes = {
  count: PropTypes.number.isRequired
}

CommentCount.defaultProps = {
  count: 0
}

export default CommentCount
