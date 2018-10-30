import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Menu,
  Select,
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import * as postsDuck from "../store/ducks/posts";

import PostFormCreate from "./PostFormCreate";

const sortOptions = [
  {
    key: "votescore_desc",
    value: "voteScore_desc",
    icon: "sort numeric descending",
    text: "Vote Score desc"
  },
  {
    key: "votescore_asc",
    value: "voteScore_asc",
    icon: "sort numeric ascending",
    text: "Vote Score asc"
  },
  {
    key: "timestamp_desc",
    value: "timestamp_desc",
    icon: "sort content descending",
    text: "Date desc"
  },
  {
    key: "timestamp_asc",
    value: "timestamp_asc",
    icon: "sort content ascending",
    text: "Date asc"
  }
];

export class PostsCategoriesMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      createPostModal: false
    };
  }

  static propTypes = {
    categories: PropTypes.array
  };

  static defaultProps = {
    categories: []
  };

  componentWillReceiveProps(newProps){
    const defaults = [{ name: "Hot", path: "", active: true }];
    const links = [...defaults, ...newProps.categories].map(link => {
      link.active =
        link.path === (newProps.category ? newProps.category : "");
      return link;
    });
    this.setState({ links });
  }

  openCreatePostModal = () => {
    this.setState({ createPostModal: true });
  };

  closeCreatePostModal = () => {
    this.setState({ createPostModal: false });
  };

  render() {
    return (
      <Menu pointing>
        {this.state.links.map(link => (
          <Menu.Item
            key={link.name}
            as={Link}
            name={link.name}
            active={link.active}
            to={`/${link.path}`}
            // exact
          />
        ))}
        <Menu.Menu position="right">
          <Menu.Item>
            <Button color="blue" onClick={this.openCreatePostModal}>
              <Icon name="add" />Create Post
            </Button>
            <Modal open={this.state.createPostModal} onClose={this.closeCreatePostModal}>
              <Modal.Header>Create new post</Modal.Header>
              <Modal.Content>
                <PostFormCreate onClose={this.closeCreatePostModal} />
              </Modal.Content>
            </Modal>
          </Menu.Item>
          <Menu.Item>
            <Select
              color="blue"
              placeholder="Sort"
              options={sortOptions}
              defaultValue="voteScore_desc"
              onChange={(e, data) => {
                this.props.updateSortBy(data.value);
              }}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapDispatchToProps = {
  updateSortBy: postsDuck.updateSortBy
};

export default connect(() => ({}), mapDispatchToProps)(PostsCategoriesMenu);
