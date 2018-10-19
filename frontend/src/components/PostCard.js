import React from 'react'
import PropTypes from 'prop-types'
import capitalize from 'capitalize'
import moment from 'moment'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import red from '@material-ui/core/colors/red'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { CardContent } from '@material-ui/core';


const styles = theme => ({
  card: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  edition: {
    marginRight: -8,
    marginLeft: 'auto',
  },
  avatar: {
    backgroundColor: red[500],
  },
  link: {
    textDecoration: 'none'
  }
});

class PostCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => this.setState(state => ({ expanded: !state.expanded }));

  render() {
    const { classes, post, removePost, vote, editPost, selectPost } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Avatar" className={classes.avatar}>
              {capitalize(post.author.charAt(0))}
            </Avatar>
          }
          action={
            <div>
              <IconButton aria-label="Remove" onClick={() => removePost(post.id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label="Edit" onClick={() => editPost(post)}>
                <EditIcon />
              </IconButton>
            </div>
          }
          title={post.title}
          subheader={`by ${post.author} \u00B7 ${moment(post.timestamp).fromNow()} \u00B7 ${post.commentCount} comment(s)`}
        />
        <CardContent>
          <Button  color="primary">
            <Link className={classes.link} to={`/${post.category}/${post.id}`} onClick={() => selectPost(post.id)}>View Details</Link>
          </Button>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton color="secondary" aria-label="Like" onClick={() => vote({ postId: post.id, option: "upVote" })}>
            <ThumbUp /> 
          </IconButton> {post.voteScore}
          <IconButton color="primary" aria-label="Dislike" onClick={() => vote({ postId: post.id, option: "downVote" })}>
            <ThumbDown />
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}

PostCard.propTypes = {
  post: PropTypes.shape({
    key: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    commentCount: PropTypes.number.isRequired,
    deleted: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
  }).isRequired
}

export default withStyles(styles)(PostCard)
