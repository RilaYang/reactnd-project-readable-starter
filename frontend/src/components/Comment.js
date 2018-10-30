import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import {
  Comment as SemaComment,
  Button,
  Form,
} from "semantic-ui-react";
import Simplert from "react-simplert";

import {
  upVoteComment,
  downVoteComment,
  deleteComment,
  updateComment
} from "../store/ducks/comments";

import VoteScore from "./VoteScore";
import TimeAgo from "./TimeAgo";

export class Comment extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      promptDelete: false,
      commentText: ''
    };
  }

  static propTypes = {
    comment: PropTypes.object
  }

  componentWillMount(){
    this.setState({commentText: this.props.comment.body})
  }

  componentWillReceiveProps(newProps){
    this.setState({commentText: newProps.comment.body})
  }

  updateCommentBody = () => {
    const updated = { ...this.props.comment, body: this.state.commentText}
    this.props.updateComment(updated)
    this.setState({ editing: false })
  }

  handleCommentChange = (e) => {
    this.setState({ commentText: e.target.value })
  }

  toogleEditing = () => {
    this.setState(prev => {
      return { editing: !prev.editing };
    });
  };

  promptDelete = () => {
    this.setState({ promptDelete: true });
  };

  promptDeleteClose = () => {
    this.setState({ promptDelete: false });
  };

  deleteCommentById = () => {
    this.props.deleteComment(this.props.comment.id);
    this.setState({ promptDelete: false });
  };

  render() {
    const { id, voteScore, author, body, timestamp } = this.props.comment;
    return (
      <Fragment>
        <SemaComment>
          <SemaComment.Avatar as="div" src="/user.jpg" />
          <SemaComment.Content>
            <SemaComment.Author>{author}</SemaComment.Author>
            <SemaComment.Metadata>
              <TimeAgo time={timestamp} />
            </SemaComment.Metadata>
            <SemaComment.Text>
              <p>{body}</p>
            </SemaComment.Text>
            <SemaComment.Actions>
              <Button
                circular
                floated="right"
                icon="trash"
                title="Delete"
                onClick={this.promptDelete}
              />
              <Button
                circular
                floated="right"
                icon="pencil"
                title="Edit"
                onClick={this.toogleEditing}
              />

              <SemaComment.Action>
                <VoteScore
                  voteScore={voteScore}
                  upVote={() => this.props.upVoteComment(id)}
                  downVote={() => this.props.downVoteComment(id)}
                />
              </SemaComment.Action>
            </SemaComment.Actions>
            {this.state.editing && (
              <Form reply onSubmit={null}>
                <Form.TextArea onChange={this.handleCommentChange} autoHeight={true} value={this.state.commentText} />
                <Form.Group>
                  <Form.Button onClick={null}>Cancel</Form.Button>
                  <Form.Button color="green" onClick={this.updateCommentBody}>
                    Update
                  </Form.Button>
                </Form.Group>
              </Form>
            )}
          </SemaComment.Content>
        </SemaComment>
        <Simplert
          title={"Delete comment"}
          message={"Are you sure about deleting this comment?"}
          showSimplert={this.state.promptDelete}
          onClose={this.promptDeleteClose}
          type={"warning"}
          onConfirm={this.deleteCommentById}
          customClass="post__delete-confirm"
          useConfirmBtn={true}
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  upVoteComment,
  downVoteComment,
  deleteComment,
  updateComment
};

export default connect(null, mapDispatchToProps)(Comment);
