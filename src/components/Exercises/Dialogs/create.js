import React, { Component } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  formControl: {
    width: 500
  }
});

export default withStyles(styles)(
  class extends Component {
    state = {
      open: false,
      exercise: {
        title: '',
        description: '',
        muscles: ''
      }
    };

    handleToggle = () => this.setState({ open: !this.state.open });

    handleChange = name => event =>
      this.setState({
        exercise: {
          ...this.state.exercise,
          [name]: event.target.value
        }
      });

    handleSubmit = () => {
      // todo: validation
      const { exercise } = this.state;

      console.log('exercise.title ', exercise.title);

      this.props.onCreate({
        ...exercise,
        id: exercise.title
          .toLocaleLowerCase()
          .split(' ')
          .join('-')
      });

      this.setState({
        open: false,
        exercise: {
          title: '',
          description: '',
          muscles: ''
        }
      });
    };

    render() {
      const { open } = this.state;
      const { muscles, classes } = this.props;
      console.log('*** muscles, ', muscles);

      console.log('*** state: ', this.state);

      return (
        <>
          <Fab aria-label="add" size="small" onClick={this.handleToggle}>
            <AddIcon />
          </Fab>
          <Dialog
            open={open}
            onClose={this.handleToggle}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
              </DialogContentText>
              <form noValidate autoComplete="off">
                <TextField
                  label="Title"
                  value={this.state.exercise.title}
                  onChange={this.handleChange('title')}
                  className={classes.formControl}
                />
                <br />
                <TextField
                  id="description"
                  label="description"
                  multiline
                  rowsMax="4"
                  value={this.state.exercise.description}
                  onChange={this.handleChange('description')}
                  className={classes.formControl}
                />
                <br />
                <FormControl className={classes.formControl}>
                  <InputLabel id="muscles-label">Muscles</InputLabel>
                  <Select
                    labelId="muscles-label"
                    id="muscles-select"
                    value={this.state.exercise.muscles}
                    onChange={this.handleChange('muscles')}
                  >
                    {muscles.map(muscle => (
                      <MenuItem key={muscle} value={muscle}>
                        {muscle}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                onClick={this.handleSubmit}
                variant="contained"
              >
                Create new exercise
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }
  }
);
