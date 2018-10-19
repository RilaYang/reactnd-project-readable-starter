import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";

import {
  createPost,
  deletePost,
  updatePost,
  orderPostsBy,
  voteOnPost,
  selectPost,
  createComment,
  updateComment,
  getCommentsByPostId
} from "../actions";

import PostCard from "../components/PostCard";
import PostCardDetails from "./PostCardDetails";
import PostFormDialog from "../components/PostFormDialog";
import OrderByButton from "../components/OrderByButton";

import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  link: {
    marginLeft: 8,
    marginTop: 14,
    fontSize: 15,
    textDecoration: "none",
    color: "primary"
  }
});
class PostsView extends Component {
  state = {
    postForm: {},
    openDialog: false,
    postDialogTitle: ""
  };

  submitHandler = postForm => {
    const { createPost, updatePost } = this.props;

    postForm.id ? updatePost(postForm) : createPost(postForm);
  };

  closeDialog = () => this.setState({ postForm: {}, openDialog: false });

  addPost = () => {
    const { selectedCategory } = this.props;

    this.setState({
      postForm: { category: selectedCategory.name },
      openDialog: true,
      postDialogTitle: "Add Post"
    });
  };

  editPost = post =>
    this.setState({
      postForm: post,
      openDialog: true,
      postDialogTitle: "Edit Post"
    });

  render() {
    const {
      classes,
      categories,
      selectedPosts,
      selectedCategory,
      vote,
      removePost,
      orderPostsBy,
      posts,
      selectPost
    } = this.props;

    const { postForm, openDialog, postDialogTitle } = this.state;

    return (
      <div style={{ height: 500, overflowY: "auto" }}>
        <PostFormDialog
          selectedCategory={selectedCategory}
          categories={categories}
          submitHandler={this.submitHandler}
          closeDialog={this.closeDialog}
          openDialog={openDialog}
          post={postForm}
          title={postDialogTitle}
        />

        <Route
          exact
          path="/:categoryName?"
          render={props => (
            <div>
              <Button
                variant="fab"
                onClick={this.addPost}
                className={classes.fab}
                color="primary"
              >
                <AddIcon />
              </Button>

              <OrderByButton
                orderBy={{ prop: "voteScore", text: "vote" }}
                toggleClickHandler={orderPostsBy}
              />
            </div>
          )}
        />

        <Switch>
          {categories.map((category, idx) => (
            <Route
              key={idx}
              exact
              path={`/${category.path}`}
              render={() => (
                <div className="posts">
                  {selectedPosts.map((post, idx) => (
                    <PostCard
                      key={idx}
                      post={post}
                      vote={vote}
                      removePost={removePost}
                      editPost={this.editPost}
                      selectPost={selectPost}
                    />
                  ))}
                </div>
              )}
            />
          ))}

          {posts.map((post, idx) => (
            <Route
              key={categories.length + idx}
              exact
              path={`/${post.category}/${post.id}`}
              render={props => (
                <div>
                  <Typography
                    variant="caption"
                    gutterBottom
                    style={{ marginTop: 8 }}
                  >
                    <Link className={classes.link} to={`/${post.category}`}>
                      Back
                    </Link>
                  </Typography>

                  <PostCardDetails
                    {...props}
                    key={categories.length + idx}
                    post={post}
                    vote={vote}
                    removePost={removePost}
                    editPost={this.editPost}
                  />
                </div>
              )}
            />
          ))}

          <Route
            render={({ location }) => (
              <div>
                <Typography style={{ marginLeft: 10 }} variant="body2">
                  Oops! 404 Resource not found in{" "}
                  <code>{location.pathname}</code>
                </Typography>
              </div>
            )}
          />
        </Switch>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

PostsView.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      voteScore: PropTypes.number.isRequired,
      deleted: PropTypes.bool.isRequired
    })
  ).isRequired
};

const mapStateToProps = state => ({
  categories: state.categories.list,
  selectedCategory: state.categories.selectedCategory,
  selectedPosts: state.posts.selectedPosts,
  posts: state.posts.list
});

const mapDispatchToProps = dispatch => ({
  createPost: post => dispatch(createPost(post)),
  removePost: postId => dispatch(deletePost(postId)),
  vote: ({ postId, option }) => dispatch(voteOnPost(postId, option)),
  orderPostsBy: params => dispatch(orderPostsBy(params)),
  updatePost: post => dispatch(updatePost(post)),
  selectPost: postId => dispatch(selectPost(postId)),
  getCommentsByPostId: () => dispatch(getCommentsByPostId()),
  createComment: comment => dispatch(createComment(comment)),
  updateComment: comment => dispatch(updateComment(comment))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PostsView));
