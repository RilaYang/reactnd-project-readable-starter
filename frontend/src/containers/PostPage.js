import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import moment from "moment";
import cuid from "cuid";
import {
  Container,
  Dimmer,
  Loader,
  Form,
  Comment as SemaComment,
  Button
} from "semantic-ui-react";


import { fetchPost } from "../store/ducks/posts";
import {
  fetchComments,
  getLatestComments,
  createComment
} from "../store/ducks/comments";

import PostCard from "../components/PostCard";
import Comment from "../components/Comment";

import DefaultLayout from "./DefaultLayout";
import NotFound from "./NotFound";

export class PostPage extends Component {
  constructor() {
    super();

    this.state = {
      commentText: ""
    };
  }
  static propTypes = {
    category: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired
  };

  componentWillMount() {
    this.props.fetchPost(this.props.postId);
    this.props.fetchComments(this.props.postId);
  }

  renderNotFound() {
    const { post } = this.props;
    return !post && !this.props.isFetching ? <NotFound /> : null;
  }

  createComment = e => {
    if (this.state.commentText.trim() === "") return;
    const timestamp = moment();
    const comment = {
      id: cuid(),
      timestamp: timestamp.valueOf(),
      body: this.state.commentText.trim(),
      author: "Annon",
      parentId: this.props.postId
    };
    this.props.createComment(comment);
    this.setState({ commentText: "" });
  };

  handleCommentChange = e => {
    this.setState({ commentText: e.target.value });
  };

  onPostDelete = () => {
    const { history } = this.props
    history.push({
      pathname: '/'
    })
  }

  renderContent() {
    const post = {
      ...this.props.post,
      commentCount: this.props.comments.length
    };

    return (
      <Fragment>
        <SemaComment.Group>
          <PostCard key={post.id} post={post} onDelete={this.onPostDelete} />
        </SemaComment.Group>
        <SemaComment.Group>
          <Form reply onSubmit={this.createComment}>
            <Form.TextArea
              onChange={this.handleCommentChange}
              autoHeight={true}
              value={this.state.commentText}
            />
            <Button
              content="Add Comment"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
          {this.props.comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </SemaComment.Group>
      </Fragment>
    );
  }

  render() {
    const { post } = this.props;

    return (
      <DefaultLayout>
        <Dimmer active={this.props.isFetching} inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>

        <Container text style={{ marginTop: "5rem" }}>
          {this.renderNotFound()}
          {post && this.renderContent()}
        </Container>
      </DefaultLayout>
    );
  }
}

const mapStateToProps = (state, props) => ({
  post: state.posts.activePost,
  isFetching: state.posts.isFetching,
  comments: getLatestComments(state.comments, props.postId)
});

const mapDispatchToProps = {
  fetchPost,
  fetchComments,
  createComment
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostPage));
