import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import Footer from './Footer';
import Exercises from './Exercises';
import { muscles, exercises } from '../store';

class App extends Component {
  state = {
    exercises,
    categorySelected: '',
    selectedExerciseId: '',
    exercise: {},
    editMode: false
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

  handleCategorySelected = category =>
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

  onExerciseCreate = exercise =>
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

  render() {
    const exercises = this.getExercisesByGroup();
    const { categorySelected, exercise, editMode } = this.state;

    return (
      <CssBaseline>
        <Header muscles={muscles} onExerciseCreate={this.onExerciseCreate} />
        <Exercises
          category={categorySelected}
          editMode={editMode}
          exercise={exercise}
          exercises={exercises}
          muscles={muscles}
          onDelete={this.handleExerciseDelete}
          onSelect={this.handleExerciseSelect}
          onSelectEdit={this.handleExerciseSelectEdit}
          onEdit={this.handleExerciseEdit}
        />
        <Footer
          muscles={muscles}
          category={categorySelected}
          onSelect={this.handleCategorySelected}
        />
      </CssBaseline>
    );
  }
}

export default App;
