import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";

import {
  voteOnPost,
  selectPost,
  createComment,
  selectCategory,
  updateComment,
  getCommentsByPostId,
  updatePost,
  deletePost,
  voteOnComment,
  deleteComment
} from "../actions";

import CommentFormDialog from "../components/CommentFormDialog";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { CardContent } from "@material-ui/core";

const styles = theme => ({
  card: {
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  actions: {
    display: "flex"
  },
  edition: {
    marginRight: -8,
    marginLeft: "auto"
  },
  avatar: {
    backgroundColor: red[500]
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  smallIconButton: {
    width: 25,
    height: 25,
    bottom: 3
  },
  smallIcon: {
    width: 15,
    height: 15,
    bottom: 3
  }
});

class PostCardDetails extends Component {
  state = {
    commentForm: {},
    openDialog: false
  };

  componentDidMount() {
    const { getCommentsByPostId, selectPost, post } = this.props;

    getCommentsByPostId(post.id).then(() => selectPost(post.id));
  }

  submitHandler = commentForm => {
    const { createComment, updateComment } = this.props;

    commentForm.id ? updateComment(commentForm) : createComment(commentForm);
  };

  closeDialog = () => this.setState({ commentForm: {}, openDialog: false });

  removePost = postId => {
    const { removePost, selectedPost, selectCategory, history } = this.props;

    removePost(postId)
      .then(() => selectCategory(selectedPost.category))
      .then(() => history.push(`/${selectedPost.category}`));
  };

  addComment = () => {
    const { selectedPost } = this.props;

    this.setState({
      commentForm: { parentId: selectedPost.id },
      openDialog: true
    });
  };

  editComment = comment =>
    this.setState({ commentForm: comment, openDialog: true });

  render() {
    const {
      classes,
      selectedPost,
      voteOnPost,
      selectedComments,
      voteOnComment,
      removeComment,
      editPost
    } = this.props;
    const { commentForm, openDialog } = this.state;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Avatar" className={classes.avatar}>
              D
            </Avatar>
          }
          action={
            <div>
              <IconButton
                aria-label="Remove"
                onClick={() => this.removePost(selectedPost.id)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                aria-label="Edit"
                onClick={() => editPost(selectedPost)}
              >
                <EditIcon />
              </IconButton>
            </div>
          }
          title={selectedPost.title}
          subheader={
            <div>
              {`by ${selectedPost.author} \u00B7 ${moment(
                selectedPost.timestamp
              ).format("YY/DD/mm HH:MM:ss")} \u00B7 ${
                selectedPost.commentCount
              } comment(s) \u00B7 `}
              <IconButton
                className={classes.smallIconButton}
                color="secondary"
                aria-label="Like"
                onClick={() =>
                  voteOnPost({ postId: selectedPost.id, option: "upVote" })
                }
              >
                <ThumbUp className={classes.smallIcon} />
              </IconButton>
              {selectedPost.voteScore}
              <IconButton
                className={classes.smallIconButton}
                color="primary"
                aria-label="Dislike"
                onClick={() =>
                  voteOnPost({ postId: selectedPost.id, option: "downVote" })
                }
              >
                <ThumbDown className={classes.smallIcon} />
              </IconButton>
            </div>
          }
        />
        <CardContent>{selectedPost.body}</CardContent>
        <CardContent>
          <Typography variant="caption" gutterBottom>
            Comments
          </Typography>
          {selectedComments.map((comment, idx) => (
            <div key={idx}>
              <Typography variant="body1" gutterBottom>
                {comment.body}
              </Typography>
              <Typography variant="caption" gutterBottom>
                {`by ${comment.author} \u00B7 ${moment(
                  comment.timestamp
                ).format("YY/DD/mm HH:MM:ss")} \u00B7 `}
                <IconButton
                  className={classes.smallIconButton}
                  aria-label="Like"
                  onClick={() =>
                    voteOnComment({ commentId: comment.id, option: "upVote" })
                  }
                >
                  <ThumbUp className={classes.smallIcon} />
                </IconButton>{" "}
                {comment.voteScore}
                <IconButton
                  className={classes.smallIconButton}
                  aria-label="Dislike"
                  onClick={() =>
                    voteOnComment({ commentId: comment.id, option: "downVote" })
                  }
                >
                  <ThumbDown className={classes.smallIcon} />
                </IconButton>
                {"\u00B7"}
                <IconButton
                  className={classes.smallIconButton}
                  aria-label="Remove"
                  onClick={() => removeComment(comment.id)}
                >
                  <DeleteIcon className={classes.smallIcon} />
                </IconButton>
                <IconButton
                  className={classes.smallIconButton}
                  aria-label="Edit"
                  onClick={() => this.editComment(comment)}
                >
                  <EditIcon className={classes.smallIcon} />
                </IconButton>
              </Typography>
            </div>
          ))}
        </CardContent>

        <CardContent>
          <Button onClick={this.addComment} color="primary">
            Add Comment
          </Button>
          <CommentFormDialog
            title="Comment"
            submitHandler={this.submitHandler}
            closeDialog={this.closeDialog}
            openDialog={openDialog}
            comment={commentForm}
          />
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  selectedCategory: state.categories.selectedCategory,
  selectedPost: state.posts.selectedPost,
  selectedComments: state.comments.selectedComments
});

const mapDispatchToProps = dispatch => ({
  voteOnPost: ({ postId, option }) => dispatch(voteOnPost(postId, option)),
  selectPost: postId => dispatch(selectPost(postId)),
  updatePost: post => dispatch(updatePost(post)),
  removePost: postId => dispatch(deletePost(postId)),
  getCommentsByPostId: postId => dispatch(getCommentsByPostId(postId)),
  voteOnComment: ({ commentId, option }) =>
    dispatch(voteOnComment(commentId, option)),
  removeComment: commentId => dispatch(deleteComment(commentId)),
  createComment: comment => dispatch(createComment(comment)),
  updateComment: comment => dispatch(updateComment(comment)),
  selectCategory: categoryName => dispatch(selectCategory(categoryName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PostCardDetails));
