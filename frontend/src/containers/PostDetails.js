import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getPostsComment } from '../actions/post';
import { addComment } from '../actions/comments';
import { Container, Header, Icon, Breadcrumb, Comment, Form, Button, Input, TextArea } from 'semantic-ui-react';
import update from 'react-addons-update';
import shortid from 'shortid';

class PostDetail extends Component {
    constructor(props) {
        super(props);
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleChange = this.handleChange.bind(this);

         this.state = {
             comment_data: {
                 id: shortid.generate(),
                 timestamp: Date.now(),
                 parentId: this.props.id,
                 author: '',
                 body: ''
             }
         };
    }

    handleSubmit(e) {
        e.preventDefault();

        let defaultSubmitCommentData = {
            id: shortid.generate(),
            timestamp: Date.now(),
            parentId: this.props.id
        };

        this.setState({
            comment_data: update(
                this.state.comment_data,
                {
                    $merge: defaultSubmitCommentData
                }
            )
        });

        this.props.addComment(this.state.comment_data);
    }

    handleChange(e) {
        this.setState({
            comment_data: update(
                this.state.comment_data,{
                    $merge: {[e.target.name]: e.target.value}
                }
            )
        });
    }

    componentDidMount() {
        const { id, getPostsComment } = this.props;
        getPostsComment(id);
    };

    filterPost = (data) => {
        const { id } = this.props;
        return id === data.id;
    };

    render() {
        
        const { posts, comments } = this.props;
        const post = posts.filter(this.filterPost).pop();

        return (
            <Container>
                <Header size="huge">{post.title}</Header>

                <Breadcrumb>
                    <Breadcrumb.Section><Icon name="calendar"/> {new Date(post.timestamp).toLocaleDateString()}</Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section><Icon name="user" /> {post.author}</Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section><Icon name= "thumbs outline up"/> {post.voteScore}</Breadcrumb.Section>
                </Breadcrumb>

                <p>{post.body}</p>

                <Comment.Group>
                    <Header as='h3' diving>Comments</Header>
                    {
                        comments.map(function(comment, i){
                            return (
                                <Comment key={1}>
                                    <Comment.Content>
                                        <Comment.Author as='a'>{comment.author}</Comment.Author>
                                        <Comment.Metadata>
                                            <div>{new Date(comment.timestamp).toLocaleDateString()}</div>
                                        </Comment.Metadata>
                                        <Comment.Text>{comment.body}</Comment.Text>
                                    </Comment.Content>
                                </Comment>
                            )
                        })
                    }

                    <Form reply action="/comments" onSubmit={(e) => this.handleSubmit(e)}>
                        <Form.Group>
                            <Form.Field contorl={Input} label='Author' name='author' placeholder='Author' onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group control={TextArea} label='Body' name="body" placeholder='Write what you want' onChange={this.handleChange}/>
                        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                    </Form>
                </Comment.Group>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        props: state.posts.list,
        comments: state.posts.comments
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPostsComment: (id) => {
            return dispatch(getPostsComment(id));
        },
        addComment: (data) => {
            return dispatch(addComment(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);