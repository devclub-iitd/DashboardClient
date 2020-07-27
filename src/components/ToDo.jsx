/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Grid, Typography, Paper, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    todoBox: {
        borderWidth: '3px',
        borderColor: '#979797',
        borderRadius: '15px',
        backgroundColor: '#323234',
        margin: theme.spacing(2, 3, 1, 3),
        padding: theme.spacing(2),
    },
    avatar: {
        backgroundColor: '#fff',
        width: theme.spacing(3),
        height: theme.spacing(3),
        border: '2px solid #979797',
    },
}));

const Todo = (todo) => {
    const classes = useStyles();
    return (
        <Grid
            key={todo.title}
            item
            container
            justify="flex-start"
            alignItems="center"
        >
            <Grid item xs={2}>
                <Avatar className={classes.avatar} />
            </Grid>
            <Grid item xs={10}>
                <Typography style={{ fontWeight: 500 }} variant="h4">
                    {todo.title}
                </Typography>
                <Typography variant="body1">{todo.desc}</Typography>
            </Grid>
        </Grid>
    );
};

export default function ToDoBox({ todos }) {
    const classes = useStyles();

    return (
        <Paper variant="outlined" className={classes.todoBox}>
            <Grid container justify="center" alignItems="center">
                {todos.map((todo) => Todo(todo))}
            </Grid>
        </Paper>
    );
}

ToDoBox.propTypes = {
    todos: PropTypes.array.isRequired,
};
