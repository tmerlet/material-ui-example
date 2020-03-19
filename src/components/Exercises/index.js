import React, { Fragment } from 'react';
import {
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
  IconButton
} from '@material-ui/core';

import { withStyles } from '@material-ui/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Form from './Form';

const styles = theme => ({
  Paper: {
    padding: 20,
    marginTop: 5,
    height: 500,
    overflowY: 'auto'
  }
});

const Exercises = withStyles(styles)(
  ({
    classes,
    editMode,
    exercise,
    exercise: {
      description = 'Please select an exercise from the list on the left',
      id,
      title = 'Welcome!'
    },
    exercises,
    category,
    muscles,
    onSelect,
    onSelectEdit,
    onDelete,
    onEdit
  }) => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.Paper}>
            {exercises.map(([group, exercises]) =>
              !category || category === group ? (
                <Fragment key={group}>
                  <Typography
                    variant="h5"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {group}
                  </Typography>
                  <List component="ul">
                    {exercises.map(({ title, id }) => (
                      <ListItem button key={id} onClick={() => onSelect(id)}>
                        <ListItemText primary={title} />
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => onDelete(id)}>
                            <DeleteIcon />
                          </IconButton>
                          <IconButton onClick={() => onSelectEdit(id)}>
                            <EditIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Fragment>
              ) : null
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.Paper}>
            <Typography variant="h6">{title}</Typography>
            {editMode ? (
              <Form
                key={id}
                exercise={exercise}
                muscles={muscles}
                onSubmit={onEdit}
              />
            ) : (
              <Typography variant="body1" style={{ marginTop: 20 }}>
                {description}
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  }
);

export default Exercises;
