import React, { Fragment } from 'react';
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography
} from '@material-ui/core';

import { withStyles } from '@material-ui/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { withContext } from '../../context';

import Form from './Form';

const styles = theme => {
  console.log('theme: ', theme);
  return {
    paper: {
      padding: theme.spacing(3),
      overflowY: 'auto',
      [theme.breakpoints.up('sm')]: {
        marginTop: 5,
        height: 'calc(100% - 10px)'
      },
      [theme.breakpoints.down('xs')]: {
        height: '100%'
      }
    },
    '@global': {
      'html, body, #root': {
        height: '100%'
      }
    },
    [theme.breakpoints.up('sm')]: {
      container: {
        height: 'calc(100% - 64px - 48px)'
      }
    },
    [theme.breakpoints.down('xs')]: {
      container: {
        height: 'calc(100% - 56px - 48px)'
      }
    },
    item: {
      [theme.breakpoints.down('xs')]: {
        height: '50%'
      }
    }
  };
};

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
    category,
    exercisesByMuscles,
    muscles,
    onDelete,
    onEdit,
    onSelect,
    onSelectEdit
  }) => {
    return (
      <Grid container className={classes.container}>
        <Grid item className={classes.item} xs={12} sm={6}>
          <Paper className={classes.paper}>
            {exercisesByMuscles.map(([group, exercises]) =>
              !category || category === group ? (
                <Fragment key={group}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {group}
                  </Typography>
                  <List component="ul">
                    {exercises.map(({ title, id }) => (
                      <ListItem button key={id} onClick={() => onSelect(id)}>
                        <ListItemText primary={title} />
                        <ListItemSecondaryAction>
                          <IconButton
                            onClick={() => onDelete(id)}
                            color="primary"
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={() => onSelectEdit(id)}
                          >
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
        <Grid item className={classes.item} xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4" color="secondary">
              {title}
            </Typography>
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

export default withContext(Exercises);
