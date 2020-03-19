import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';

const Footer = ({ category, muscles, onSelect, width }) => {
  console.log(width);
  const index = category ? muscles.indexOf(category) + 1 : 0;

  const onIndexSelect = (event, index) => {
    onSelect(index === 0 ? '' : muscles[index - 1]);
  };
  return (
    <Paper>
      <Tabs
        value={index}
        onChange={onIndexSelect}
        variant={width === 'xs' ? 'scrollable' : undefined}
        centered={width !== 'xs'}
        scrollButtons="on"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="All" />
        {muscles.map(group => (
          <Tab key={group} label={group} />
        ))}
      </Tabs>
    </Paper>
  );
};

export default withWidth()(Footer);
