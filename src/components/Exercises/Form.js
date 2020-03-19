import React, { Component } from 'react';

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';

export default class extends Component {
  state = this.getInitialState();

  getInitialState() {
    const { exercise } = this.props;
    return exercise ? exercise : { title: '', description: '', muscles: '' };
  }

  handleChange = name => ({ target: { value } }) =>
    this.setState({
      [name]: value
    });

  handleSubmit = () => {
    this.props.onSubmit({
      id: this.state.title
        .toLocaleLowerCase()
        .split(' ')
        .join('-'),
      ...this.state
    });
  };

  render() {
    const { muscles: categories, exercise } = this.props;

    return (
      <form noValidate autoComplete="off">
        <TextField
          label="Title"
          value={this.state.title}
          onChange={this.handleChange('title')}
          fullWidth
          margin="normal"
        />
        <br />
        <FormControl fullWidth margin="normal">
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
        <TextField
          id="description"
          label="Description"
          multiline
          rowsMax="4"
          value={this.state.description}
          onChange={this.handleChange('description')}
          fullWidth
          margin="normal"
        />
        <br />
        <Button
          color="primary"
          onClick={this.handleSubmit}
          variant="contained"
          disabled={
            !this.state.title || !this.state.muscles || !this.state.description
          }
        >
          {exercise ? 'Edit' : 'Create'}
        </Button>
      </form>
    );
  }
}
