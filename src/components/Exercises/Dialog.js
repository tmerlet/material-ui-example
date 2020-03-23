import React, { Component } from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { withContext } from '../../context';
import Form from './Form';

class CreateDialog extends Component {
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
          color="secondary"
          onClick={this.handleToggle}
          size="small"
        >
          <AddIcon />
        </Fab>
        <Dialog
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="xs"
          onClose={this.handleToggle}
          open={open}
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

export default withContext(CreateDialog);
