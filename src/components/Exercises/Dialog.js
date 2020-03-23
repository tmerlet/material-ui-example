import React, { Component } from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab
} from '@material-ui/core';

import Form from './Form';

import AddIcon from '@material-ui/icons/Add';

export default class extends Component {
  state = {
    open: false
  };

  handleToggle = () => this.setState({ open: !this.state.open });

  handleFormSubmit = exercise => {
    this.handleToggle();
    this.props.onCreate(exercise);
  };

  render() {
    const { open } = this.state;

    const { muscles } = this.props;

    return (
      <>
        <Fab
          aria-label="add"
          size="small"
          onClick={this.handleToggle}
          color="secondary"
        >
          <AddIcon />
        </Fab>
        <Dialog
          open={open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle id="form-dialog-title">
            Create a new exercise
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Please fill in the form below</DialogContentText>
            <Form muscles={muscles} onSubmit={this.handleFormSubmit} />
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
