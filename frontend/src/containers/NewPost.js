import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { Button, Modal, Form, Input, Select, TextArea } from 'semantic-ui-react';
import { newPosts } from '../actions/post';

class NewPost extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            id: shortid.generate(),
            timestamp: Date.now(),
            modalOpen: false
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            id: shortid.generate(),
            timestamp: Date.now(),
            modalOpen: false
        });

        this.props.newPosts(this.state);
    }

    handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleSelectChange(e, result) {
        let select = {};
        select[result.name] = result.value;
        this.setState(select);
    }

    handleOpen = () => this.setState({modalOpen: true});
    handleClose = () => this.setState({modalOpen: false});

    render() {
        const { categories } = this.props;

        let options = categories.map((data) => {
            return { key: shortid.generate(), text: data.name, value: data.name };
        });

        options.shift();

        const inlineStyle = {
            modal : {
              marginTop: '300px !important',
              marginLeft: '20%',
              marginRight: 'auto'
            }
          };

        return (
            <Modal
            size="small"
            trigger={<Button onClick={this.handleOpen} fluid primary>New Post</Button>}
            open={this.state.modalOpen}
            onClose={this.handleClose}
            style={inlineStyle.modal}>
                <Modal.Header>New Post</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form action="/posts" onSubmit={(e) => this.handleSubmit(e)}>
                            <Form.Group widths='equal'>
                                <Form.Field control={Input} label='Title' name="title" placeholder='Title' onChange={this.handleChange} required/>
                                <Form.Field control={Input} label='Author' name="author" placeholder='Author' onChange={this.handleChange} required/>
                                <Form.Field control={Select} label='Category' name="category" options={options} placeholder='Category' onChange={this.handleSelectChange} required/>
                            </Form.Group>
                            <Form.Field control={TextArea} label='Body' name="body" placeholder='Body' onChange={this.handleChange} required/>
                            <Button type='submit'>Submit</Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories.list,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        newPosts: (data) => {
            return dispatch(newPosts(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);