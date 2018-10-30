import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, Form } from 'semantic-ui-react'

import { updatePost } from '../store/ducks/posts'

export class PostFormEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      body: ''
    }
  }

  componentWillReceiveProps(newProps) {
    const { title, body } = newProps.post
    this.setState({ title, body })
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { id } = this.props.post
    const { title, body } = this.state
    this.props.updatePost({ id, title, body })
    this.props.onClose()
  }

  render() {
    return (
      this.props.show && (
        <Card fluid color="blue">
          <Card.Content header={this.props.post.title || 'PostForm'} color="blue" />
          <Card.Description>
            <Form style={{ padding: '1rem' }}>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Title"
                  placeholder="Title"
                  onChange={this.handleChange}
                  name="title"
                  value={this.state.title}
                />
                <Form.Input
                  fluid
                  label="Body"
                  placeholder="Body"
                  onChange={this.handleChange}
                  name="body"
                  value={this.state.body}
                />
              </Form.Group>
              <Form.Group>
                <Form.Button onClick={this.props.onClose}>Cancel</Form.Button>
                <Form.Button color="green" onClick={this.handleSubmit}>
                  Update
                </Form.Button>
              </Form.Group>
            </Form>
          </Card.Description>
        </Card>
      )
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  updatePost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFormEdit)
