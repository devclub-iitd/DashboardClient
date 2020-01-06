import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PendingTasks from './PendingTasks';

export default function Home(props) {
  const { fixedHeightPaper, paperClass } = props;

  return (
    <div>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className="">
            <PendingTasks />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        {/* <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper} />
        </Grid>
        Recent Orders
        <Grid item xs={12}>
          <Paper className={paperClass} />
        </Grid> */}
      </Grid>
    </div>
  );
}
