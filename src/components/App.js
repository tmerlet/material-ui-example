import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import Footer from './Footer';
import Exercises from './Exercises';
import { muscles, exercises } from '../store';
import { Provider } from '../context';

class App extends Component {
  state = {
    categorySelected: '',
    editMode: false,
    exercise: {},
    exercises,
    selectedExerciseId: ''
  };

  getExercisesByGroup = () => {
    const initialExercises = muscles.reduce(
      (exercises, category) => ({
        ...exercises,
        [category]: []
      }),
      {}
    );

    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
        const { muscles } = exercise;
        exercises[muscles] = [...exercises[muscles], exercise];

        return exercises;
      }, initialExercises)
    );
  };

  handleCategorySelect = category =>
    this.setState({ categorySelected: category });

  handleExerciseSelect = id =>
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id),
      editMode: false
    }));

  handleExerciseSelectEdit = id =>
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id),
      editMode: true
    }));

  handleExerciseEdit = exercise => {
    this.setState(({ exercises }) => ({
      exercises: [...exercises.filter(ex => ex.id !== exercise.id), exercise],
      exercise,
      editMode: false
    }));
  };

  handleExerciseCreate = exercise =>
    this.setState(({ exercises }) => ({
      exercises: [...exercises, exercise],
      editMode: false,
      exercise: {}
    }));

  handleExerciseDelete = id =>
    this.setState(({ exercises, exercise, editMode }) => ({
      exercises: exercises.filter(ex => ex.id !== id),
      editMode: exercise.id === id ? false : editMode,
      exercise: exercise.id === id ? {} : exercises
    }));

  getContext = () => ({
    muscles,
    ...this.state,
    exercisesByMuscles: this.getExercisesByGroup(),
    onCategorySelect: this.handleCategorySelect,
    onCreate: this.handleExerciseCreate,
    onDelete: this.handleExerciseDelete,
    onEdit: this.handleExerciseEdit,
    onSelect: this.handleExerciseSelect,
    onSelectEdit: this.handleExerciseSelectEdit
  });

  render() {
    return (
      <Provider value={this.getContext()}>
        <CssBaseline>
          <Header />
          <Exercises />
          <Footer />
        </CssBaseline>
      </Provider>
    );
  }
}

export default App;
