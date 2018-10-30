import React, { Component } from "react";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import yup from "yup";
import moment from "moment";
import cuid from "cuid";

import { Button, Form, TextArea, Select } from "semantic-ui-react";

import { createPost } from "../store/ducks/posts";
import { getCategoriesAsOptions } from "../store/ducks/categories";
import { toastWarn } from "../store/ducks/toastify";

const defaultFormSttate = {
  title: "",
  body: "",
  category: ""
};

export class PostFormCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: { ...defaultFormSttate }
    };
  }

  static propTypes = {
    onClose: PropTypes.func.isRequired
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    });
  };

  handleChangeCategory = (e, data) => {
    this.setState({
      form: {
        ...this.state.form,
        category: data.value
      }
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { form }  = this.state
    if(await this.validateSubmit(form)){
      
      const newPost = {
        ...form,
        id: cuid(),
        timestamp: moment().valueOf(),
      }
      this.props.createPost(newPost)
      this.clearForm()
      this.props.onClose()
    } else {
      this.props.toastWarn({message: 'Please check post inputed data!'})
    }
  };

  validateSubmit = (formData) => {
    const schema = yup.object().shape({
      title: yup.string().required().min(2),
      body: yup.string().required().min(2),
      category: yup.string().required(),
      author: yup.string().required().min(2)
    })
    return schema.isValid(formData)
  };

  clearForm = () => {
    this.setState({ form: { ...defaultFormSttate }})
    this.props.onClose()
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Title</label>
          <input
            placeholder="Title"
            name="title"
            onChange={this.handleChange}
            value={this.state.form.title}
            autoComplete="off"
          />
        </Form.Field>
        <Form.Field>
          <label>Body</label>
          <TextArea
            autoHeight
            placeholder="Body"
            rows={2}
            name="body"
            onChange={this.handleChange}
            value={this.state.form.body}
            autoComplete="off"
          />
        </Form.Field>
        <Form.Field>
          <label>Category</label>
          <Select
            placeholder="Select a category"
            options={this.props.categories}
            name="category"
            onChange={this.handleChangeCategory}
            defaultValue={this.state.form.category}
          />
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <TextArea
            autoHeight
            placeholder="Author"
            rows={2}
            name="author"
            onChange={this.handleChange}
            value={this.state.form.author}
            autoComplete="off"
          />
        </Form.Field>
        <Button onClick={this.clearForm}>Cancel</Button>
        <Button type="submit" primary>Submit</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  categories: getCategoriesAsOptions(state.categories)
});

const mapDispatchToProps = {
  createPost,
  toastWarn
};

export default connect(mapStateToProps, mapDispatchToProps)(PostFormCreate);
