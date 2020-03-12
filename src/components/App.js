import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Header from './Header';
import Footer from './Footer';
import Exercises from './Exercises';
import { muscles, exercises } from '../store';

class App extends Component {
  state = {
    exercises,
    categorySelected: '',
    selectedExerciseId: '',
    exercise: {}
  };

  getExercisesByGroup = () => {
    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
        const { muscles } = exercise;
        exercises[muscles] = exercises[muscles]
          ? [...exercises[muscles], exercise]
          : [exercise];

        return exercises;
      }, {})
    );
  };

  handleCategorySelected = category => {
    this.setState({ categorySelected: category });
  };

  handleSelectedExercise = id => {
    this.setState(({ exercises }) => {
      return {
        exercise: exercises.find(ex => ex.id === id)
      };
    });
  };

  render() {
    const exercises = this.getExercisesByGroup();
    const { categorySelected, exercise } = this.state;

    return (
      <Container>
        <Header />
        <Exercises
          category={categorySelected}
          exercise={exercise}
          exercises={exercises}
          onSelect={this.handleSelectedExercise}
        />
        <Footer
          muscles={muscles}
          category={categorySelected}
          onSelect={this.handleCategorySelected}
        />
      </Container>
    );
  }
}

export default App;
