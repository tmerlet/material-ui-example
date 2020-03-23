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
          fullWidth
          label="Title"
          margin="normal"
          onChange={this.handleChange('title')}
          value={this.state.title}
        />
        <br />
        <FormControl fullWidth margin="normal">
          <InputLabel id="muscles-label">Muscles</InputLabel>
          <Select
            id="muscles-select"
            labelId="muscles-label"
            onChange={this.handleChange('muscles')}
            value={this.state.muscles}
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
          fullWidth
          id="description"
          label="Description"
          margin="normal"
          multiline
          onChange={this.handleChange('description')}
          rowsMax="4"
          value={this.state.description}
        />
        <br />
        <Button
          color="primary"
          disabled={
            !this.state.title || !this.state.muscles || !this.state.description
          }
          onClick={this.handleSubmit}
          variant="contained"
        >
          {exercise ? 'Edit' : 'Create'}
        </Button>
      </form>
    );
  }
}
