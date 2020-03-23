import React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  [theme.breakpoints.down('sm')]: {
    tab: {
      minWidth: 'auto'
    }
  }
});

const Footer = ({ category, muscles, onSelect, width, classes }) => {
  console.log(width);
  const index = category ? muscles.indexOf(category) + 1 : 0;

  const onIndexSelect = (event, index) => {
    onSelect(index === 0 ? '' : muscles[index - 1]);
  };
  return (
    <AppBar color="primary" position="sticky">
      <Tabs
        value={index}
        onChange={onIndexSelect}
        variant={width === 'xs' ? 'scrollable' : undefined}
        centered={width !== 'xs'}
        scrollButtons="on"
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab className={classes.tab} label="All" />
        {muscles.map(group => (
          <Tab key={group} label={group} className={classes.tab} />
        ))}
      </Tabs>
    </AppBar>
  );
};

export default withWidth()(withStyles(styles)(Footer));
