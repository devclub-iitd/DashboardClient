/* eslint-disable indent */
import React, { Fragment, Component } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Paper, GridList, GridListTileBar, GridListTile,
  Typography, Grid,
} from '@material-ui/core';
import {
 Card, CardBody, CardText, CardTitle, CardFooter,
    CardHeader, CardLink,
} from 'reactstrap';
import EditResourceForm from './EditResourceForm';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      border: `1px solid ${theme.palette.divider}`,
      overflowX: 'auto',
    },
    popCardBody: {
        fontSize: '0.75rem',
    },
    popCardFooter: {
        fontSize: '0.5rem'
    },
    tileScroll: {
        overflowY: 'scroll',
        scrollBehavior: 'smooth',
    },
    gridList: {
        width: 500,
        height: 450,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    grid: {
        padding: '1em',
        height: '25em',
        overflowY: 'scroll',
        scrollBehavior: 'smooth',
    },
    head: {
        padding: '0.5em',
    },
    paper: {
        margin: '2em',
    },
}));

const ResourcesPage = ({resources, fetchAllResources, editResource, users}) => {
    const classes = useStyles();
    const allResources = resources.allResources;
    const curUser = users.user;

    return (
        <>
            <Paper elevation={3} variant="outlined" className={classes.paper}>
            {/* <GridList spacing={1} className={classes.gridList}> */}
            <Typography variant="h4" color="primary" className={classes.head}>Current</Typography>
            <Grid container spacing={2} className={classes.grid}>
                {allResources.filter(resource => !resource.archive).map((res, index) => (
                            // <GridListTile key={`${resource}~${index}`} cols={2} rows={2}>
                <Grid key={`${res}~${index}`} item xs={12} md={6} lg={4}>
                    <Card color="primary" outline>
                    <CardHeader>
                        <Typography variant="h4">{res.name}</Typography>
                    </CardHeader>
                    <CardBody>
                        <CardTitle>
                            <Typography variant="h6">{res.directory_year}</Typography>
                        {/* {
                                curUser.privelege_level !== 'Unapproved_User'
                                ?
                                <Typography variant='body1'>({res.internal_name})</Typography>
                                : null
                            } */}
                            <Typography variant="body1">
                                (
                                {res.internal_name}
                                )
                            </Typography>
                        </CardTitle>
                        <CardText>
                        <Typography variant="body1">{res.description}</Typography>
                        </CardText>
                    </CardBody>
                    <CardFooter>
                        <CardLink href={res.url}>Access resource</CardLink>
                        {
                            curUser.privelege_level === 'Admin'
                            ? <EditResourceForm dumResources={allResources} dumUsers={users.allUsers} editResource={editResource} index={index} />
                            : null
                        }
                    </CardFooter>
                    </Card>
                </Grid>
                            // </GridListTile>
                        ))}
            </Grid>
            {/* </GridList> */}
            </Paper>
            <Paper elevation={3} variant="outlined" className={classes.paper}>
            {/* <GridList spacing={1} className={classes.gridList}> */}
            <Typography variant="h4" color="primary" className={classes.head}>Archived</Typography>
            <Grid container spacing={2} className={classes.grid}>
                {allResources.filter(resource => resource.archive).map((res, index) => (
                            // <GridListTile key={`${resource}~${index}`} cols={2} rows={2}>
                <Grid key={`${res}~${index}`} item xs={12} md={6} lg={4}>
                    <Card color="primary" outline>
                    <CardHeader>
                        <Typography variant="h4">{res.name}</Typography>
                    </CardHeader>
                    <CardBody>
                        <CardTitle>
                        <Typography variant="h6">{res.directory_year}</Typography>
                        {/* {
                                curUser.privelege_level !== 'Unapproved_User'
                                ?
                                <Typography variant='body1'>({res.internal_name})</Typography>
                                : null
                            } */}
                        <Typography variant="body1">
                            (
                            {res.internal_name}
                            )
                        </Typography>
                        </CardTitle>
                        <CardText>
                        <Typography variant="body1">{res.description}</Typography>
                        </CardText>
                    </CardBody>
                    <CardFooter>
                        <CardLink href={res.url}>Access resource</CardLink>
                        {
                            curUser.privelege_level === 'Admin'
                            ? <EditResourceForm dumResources={allResources} dumUsers={users.allUsers} editResource={editResource} index={index} />
                            : null
                        }
                    </CardFooter>
                    </Card>
                </Grid>
                            // </GridListTile>
                        ))}
            </Grid>
            {/* </GridList> */}
            </Paper>
        </>
    );
};

export default ResourcesPage;
