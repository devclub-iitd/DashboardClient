import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

function createData(taskname, deadline) {
  return {
    taskname, deadline,
  };
}

const rows = [
  createData('Frozen yoghurt', '15th July'),
  createData('Ice cream sandwich', '1st Augutst'),
];

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <h1>Pending Tasks</h1>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Task Name</TableCell>
            <TableCell align="right">Deadline</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.taskname}
              </TableCell>
              <TableCell align="right">{row.deadline}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
