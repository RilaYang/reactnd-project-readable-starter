import React from 'react'
import PropTypes from 'prop-types'

import { Icon, Button } from 'semantic-ui-react'

export const VoteScore = props => {
  const { voteScore } = props
  return (
    <div className="vote-score">
      <Button
        size="mini"
        negative
        title="Down"
        onClick={() => {
          props.downVote()
        }}
        className="vote-score__button--decrease"
      >
        <Icon name="thumbs down outline" />
      </Button>
      <span className={`vote-score__counter vote-score__counter--${voteScore > 0? 'positive': 'negative'}`} style={styles.voteScoreCounter}>
        {voteScore}
      </span>
      <Button
        size="mini"
        positive
        title="Up"
        onClick={() => {
          props.upVote()
        }}
        className="vote-score__button--increase"
      >
        <Icon name="thumbs up outline" />
      </Button>
    </div>
  )
}

VoteScore.displayName = 'VoteScore'

VoteScore.propTypes = {
  voteScore: PropTypes.number.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired
}

const styles = {
  voteScoreCounter: {
    padding: '0 0.5rem',
    minWidth: '4rem',
    display: 'inline-block',
    textAlign: 'center',
  }
}

export default VoteScore
