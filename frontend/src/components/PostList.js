import React from 'react';
import { Card } from 'semantic-ui-react'
import shortid from 'shortid';
import { Form, Select } from 'semantic-ui-react'
const Post = (props) => {
  const { post, onClick } = props;
  return (
    <Card
      link
      id={post.id}
      header={post.title}
      meta={post.category}
      description={post.body}
      onClick={onClick}
    />
  )
};

const PostList = (props) => {
  const { list, onClickHandler } = props;

  const options = [
    { key: 's', text: 'voteScore', value: 'score' },
    { key: 't', text: 'timestamp', value: 'time' },
  ];

  const containerStyle = {
    marginTop: '10px'
  };

  return (
    <div>
    <Form.Field control={Select} name="filter" options={options} placeholder="Filter" onChange={this.handleSelectChange}/>
    <Card.Group itemsPerRow={3} style={containerStyle}>
        {
          list.map((post) => {
            return <Post key={shortid.generate()} post={post} onClick={onClickHandler}></Post>
          })
        }
      </Card.Group>
    </div>
  )
};

export default PostList;
