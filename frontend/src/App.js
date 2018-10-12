import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCategories } from './actions/categories';
import { getPosts } from './actions/post';

import { Container, Grid } from 'semantic-ui-react';

import { PostList, Nav } from './components';
import { NewPost, PostDetail } from './containers';

class App extends Component {

  constructor(props) {
    super(props);

    this.handle_select_category = this.handle_select_category.bind(this);

    this.handle_select_post = this.handle_select_post.bind(this);

    this.filterPost = this.filterPost.bind(this);

    this.state = {
      activeCategorie: 'all',
      selectedPostId: ''
    }
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getPosts();
  }

  handle_select_category = (e, { name }) => {
    this.setState({
      activeCategorie: name,
      selectedPostId: ''
    });
  };

  handle_select_post = (e, { id }) => {
    this.setState({selectedPostId: id});
  };

  filterPost = (data) => {
    return this.state.activeCategorie === data.category;
  };

  render() {

    const { activeCategorie, selectedPostId } = this.state;
    const { categories, posts } = this.props;

    posts.sort((a, b) => {
      return -(a.voteScore - b.voteScore);
    });
    
    const filterdPost = (activeCategorie !== 'all') ? posts.filter(this.filterPost) : posts;

    const containerStyle = {
      marginTop: '20px'
    };
    
    return (
      <Container style={containerStyle}>

        <Grid>

          <Grid.Column floated="left" width={4}>
            <Nav categories={categories}
                 activeCategorie={activeCategorie}
                 onClickHandler={this.handle_select_category}/>
            <NewPost/>
          </Grid.Column>

          <Grid.Column floated="left" width={12}>
            {
              (!selectedPostId)
                ? <PostList list={filterdPost} onClickHandler={this.handle_select_post}/>
                : <PostDetail id={selectedPostId}/>
            }
          </Grid.Column>

        </Grid>

      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.list,
    posts: state.posts.list
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => {
      return dispatch(getCategories());
    },
    getPosts: () => {
      return dispatch(getPosts());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
