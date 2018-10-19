import React, { Component } from 'react';
import * as R from 'ramda'
//import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import If from './If'

class PostFormDialog extends Component {
  
  handleSubmit = (e) => {
    const { submitHandler, closeDialog } = this.props

    const post = {
      id: R.path(['id', 'value'], this.form),
      author: R.path(['author', 'value'], this.form),
      category: R.path(['category', 'value'], this.form),
      title: R.path(['title', 'value'], this.form),
      body: R.path(['body', 'value'], this.form),
    }

    e.preventDefault();

    submitHandler(post)

    closeDialog()
  }

  render() {
    const {
        //classes, 
        closeDialog,
        post, 
        selectedCategory,
        openDialog,
        title,
        categories
      } = this.props;

    return (
      <div>
        <Dialog
          open={openDialog}
          onClose={closeDialog}
          aria-labelledby="form-dialog-title"
        >
        <form id="postForm" 
            onSubmit={this.handleSubmit} 
            ref={form => (this.form = form)}
            /*noValidate*/ 
            autoComplete="off">
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
                <TextField
                  name="id"
                  type="hidden"
                  defaultValue={post.id}
                />
                <If test={selectedCategory.name !== "all categories"}>
                  <TextField
                    name="category"
                    type="hidden"
                    defaultValue={post.category}
                  />
                </If>
                <If test={selectedCategory.name === "all categories"}>
                  <TextField
                    name="category"
                    select
                    label="Category"
                    defaultValue={post.category}
                    autoFocus
                    margin="dense"
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: {
                          width: 200,
                        },
                      },
                    }}
                    fullWidth
                    helperText="Please select a category"
                  >
                    {categories.filter(category => category.name !== "all categories").map(category => (
                      <option key={category.key} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </TextField>
                </If>
                <TextField
                  id="title"
                  name="title"
                  label="Title"
                  margin="dense"
                  required={true}
                  defaultValue={post.title}
                  fullWidth
                />
                <TextField
                  name="author"
                  label="Author"
                  margin="dense"
                  required={true}
                  defaultValue={post.author}
                  fullWidth
                />
                <TextField
                  name="body"
                  label="Body"
                  required={true}
                  multiline={true}
                  margin="dense"
                  defaultValue={post.body}
                  fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    form="postForm"
                >Submit</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default PostFormDialog