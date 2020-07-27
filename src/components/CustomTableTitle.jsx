import React from 'react';
import { Grid, Typography, IconButton, Hidden } from '@material-ui/core';
import { AddCircleRounded } from '@material-ui/icons';
import PropTypes from 'prop-types';

export default function TableTitle({ title, addAction }) {
    return (
        <>
            <Hidden xsDown>
                <Grid container justify="flex-start" alignItems="center">
                    <Typography variant="h6" style={{ fontWeight: 500 }}>
                        {title}
                    </Typography>
                    <Grid item xs={1}>
                        <IconButton
                            style={{
                                color: '#fff',
                            }}
                            edge="end"
                            onClick={() => addAction()}
                        >
                            <AddCircleRounded fontSize="large" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Hidden>
            <Hidden only={['sm', 'md', 'lg', 'drawerMin', 'xl']}>
                <Grid container justify="center" alignItems="center">
                    <Typography variant="h6" style={{ fontWeight: 500 }}>
                        {title}
                    </Typography>
                    <Grid item xs={1}>
                        <IconButton
                            style={{
                                color: '#fff',
                            }}
                            edge="end"
                            onClick={() => addAction()}
                        >
                            <AddCircleRounded fontSize="large" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Hidden>
        </>
    );
}

TableTitle.propTypes = {
    title: PropTypes.string.isRequired,
    addAction: PropTypes.func.isRequired,
};
