import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';

const Footer = ({ category, muscles, onSelect }) => {
  const index = category ? muscles.indexOf(category) + 1 : 0;

  const onIndexSelect = (event, index) => {
    onSelect(index === 0 ? '' : muscles[index - 1]);
  };
  return (
    <Paper>
      <Tabs
        value={index}
        onChange={onIndexSelect}
        centered
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

export default Footer;
