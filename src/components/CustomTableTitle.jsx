import React from 'react';
import { Grid, Typography, IconButton, Hidden } from '@material-ui/core';
import { AddCircleRounded } from '@material-ui/icons';
import PropTypes from 'prop-types';

export default function TableTitle({ addAction, children }) {
    return (
        <>
            <Hidden only={'xs'}>
                <Grid container justify="flex-start" alignItems="center">
                    <Typography variant="h6" style={{ fontWeight: 500 }}>
                        {children}
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
                        {children}
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
    children: PropTypes.string.isRequired,
    addAction: PropTypes.func.isRequired,
};
