import React, { Component } from 'react';

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  formControl: {
    width: 300
  }
});

export default withStyles(styles)(
  class extends Component {
    state = this.getInitialState();

    getInitialState() {
      const { exercise } = this.props;
      return exercise ? exercise : { title: '', description: '', muscles: '' };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      const { exercise } = nextProps;
      this.setState({
        ...exercise
      });
    }

    handleChange = name => ({ target: { value } }) =>
      this.setState({
        [name]: value
      });

    handleSubmit = () => {
      // todo: validation

      this.props.onSubmit({
        id: this.state.title
          .toLocaleLowerCase()
          .split(' ')
          .join('-'),
        ...this.state
      });

      this.setState(this.getInitialState());
    };

    render() {
      const { muscles: categories, exercise, classes } = this.props;

      return (
        <form noValidate autoComplete="off">
          <TextField
            label="Title"
            value={this.state.title}
            onChange={this.handleChange('title')}
            className={classes.formControl}
          />
          <br />
          <TextField
            id="description"
            label="description"
            multiline
            rowsMax="4"
            value={this.state.description}
            onChange={this.handleChange('description')}
            className={classes.formControl}
          />
          <br />
          <FormControl className={classes.formControl}>
            <InputLabel id="muscles-label">Muscles</InputLabel>
            <Select
              labelId="muscles-label"
              id="muscles-select"
              value={this.state.muscles}
              onChange={this.handleChange('muscles')}
            >
              {categories.map(muscle => (
                <MenuItem key={muscle} value={muscle}>
                  {muscle}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <Button
            color="primary"
            onClick={this.handleSubmit}
            variant="contained"
          >
            {exercise ? 'Edit' : 'Create'}
          </Button>
        </form>
      );
    }
  }
);
