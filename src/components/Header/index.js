import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import CreateDialog from '../Exercises/Dialog';
import { withStyles } from '@material-ui/styles';

const styles = {
  flex: {
    flex: 1
  }
};

const Header = ({ classes }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.flex} variant="h5">
          Exercise Database
        </Typography>
        <CreateDialog />
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Header);
