import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import CreateDialog from '../Exercises/Dialog';
import { withStyles } from '@material-ui/styles';

const styles = {
  flex: {
    flex: 1
  }
};

const Header = ({ muscles, onExerciseCreate, classes }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.flex}>
          Exercise Database
        </Typography>
        <CreateDialog onCreate={onExerciseCreate} muscles={muscles} />
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Header);
