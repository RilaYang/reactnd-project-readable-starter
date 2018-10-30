import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export const TimeAgo = (prop) => {
  const timeAgo = moment(prop.time).fromNow();
  return (
    <div>
      { timeAgo }
    </div>
  )
}

TimeAgo.displayName = 'TimeAgo'

TimeAgo.propTypes = {
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default TimeAgo