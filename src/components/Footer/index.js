import React, { Component } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/styles';
import { withContext } from '../../context';

const styles = theme => ({
  [theme.breakpoints.down('sm')]: {
    tab: {
      minWidth: 'auto'
    }
  }
});

class Footer extends Component {
  onIndexSelect = (e, index) => {
    const { onCategorySelect, muscles } = this.props;
    onCategorySelect(index === 0 ? '' : muscles[index - 1]);
  };

  getIndex = () => {
    const { category, muscles } = this.props;
    return category ? muscles.indexOf(category) + 1 : 0;
  };

  render() {
    const { muscles, width, classes } = this.props;

    return (
      <AppBar color="primary" position="sticky">
        <Tabs
          centered={width !== 'xs'}
          indicatorColor="secondary"
          onChange={this.onIndexSelect}
          scrollButtons="on"
          textColor="secondary"
          value={this.getIndex()}
          variant={width === 'xs' ? 'scrollable' : undefined}
        >
          <Tab className={classes.tab} label="All" />
          {muscles.map(group => (
            <Tab className={classes.tab} key={group} label={group} />
          ))}
        </Tabs>
      </AppBar>
    );
  }
}

export default withContext(withWidth()(withStyles(styles)(Footer)));
