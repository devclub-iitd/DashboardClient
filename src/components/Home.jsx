import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableHead, TableRow, Paper, Divider, Grid, Typography, TableContainer} from '@material-ui/core';
// import PendingTasks from './PendingTasks';
import {dumTasks} from './dumTasks';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`,
    overflowX: 'auto',
  },
  table: {
    // minWidth: 250,
    maxHeight: 250,
    width: '100%',
  },
  gridL: {
    border: '3px solid',
    marginTop: '2em',
    marginBottom: '2em',
  },
  gridR: {
    border: '3px solid',
    marginTop: '2em',
    marginBottom: '2em',
    // maxHeight: 330,
    // scrollBehavior: 'smooth',
  },
  textPadding: {
    paddingTop: '1em',
    paddingBottom: '0.5em',
  },
  borderJ: {
    border: '3px solid',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  // tableContainer: {
  //   maxHeight: 
  // }
}));

function TaskData() {
  const classes = useStyles();

  return (
    // <Paper className={classes.root}>
    // <h1>Pending Tasks</h1>
    <div className={classes.borderJ}>
      <Paper>
        <Grid className={classes.gcontainer} container justify="space-evenly">
          <Grid className={classes.gridL} item xs={10} sm={5}>
            <Typography className={classes.textPadding} variant="h4" align="center">
              Pending Tasks
            </Typography>
            <Typography variant="h1" align="center">
              {dumTasks.length}
            </Typography>
          </Grid>
          <Divider orientation="vertical" />
          <Grid className={classes.gridR} item xs={10} sm={5}>
            {/* <Typography>
                sfbwsgfb
            </Typography> */}
            <TableContainer className={classes.table}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Task Name</b></TableCell>
                    <TableCell align="right"><b>Deadline</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dumTasks.map(task => (
                    <TableRow hover key={task.name}>
                      <TableCell component="th" scope="row">
                        {task.name}
                      </TableCell>
                      <TableCell align="right">{task.deadline}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
      <Paper>
        <Grid className={classes.gcontainer} container justify="space-evenly">
          {/* <Divider orientation="vertical" /> */}
          <Grid className={classes.gridL} item xs={10} sm={5}>
            {/* <Typography>
                sfbwsgfb
            </Typography> */}
            <TableContainer className={classes.table}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Task Name</b></TableCell>
                    <TableCell align="right"><b>Deadline</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dumTasks.map(task => (
                    <TableRow hover key={task.name}>
                      <TableCell component="th" scope="row">
                        {task.name}
                      </TableCell>
                      <TableCell align="right">{task.deadline}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Divider orientation="vertical" />
          <Grid className={classes.gridR} item xs={10} sm={5}>
            <Typography className={classes.textPadding} variant="h4" align="center">
              Completed Tasks
            </Typography>
            <Typography variant="h1" align="center">
              {dumTasks.length}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className="">
            <TaskData />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
