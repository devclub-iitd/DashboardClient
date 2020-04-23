/* eslint-disable indent */
import React, { Fragment, Component } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Paper, GridList, GridListTileBar, GridListTile, InputAdornment, IconButton, TextField,
  Typography, Grid, Backdrop, CircularProgress,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
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
    search: {
        marginTop: '0.5em',
    },
    paper: {
        margin: '2em',
    },
}));

const ResourcesPage = ({resources, fetchAllResources, editResource, deleteResource, users}) => {
    const classes = useStyles();
    const allResources = resources.allResources;
    const curUser = users.user;

    const [search, setSearch] = React.useState({
        current: '',
        archives: '',
    });

    const searchChange = (event) => {
        event.preventDefault();
        
        setSearch({
            ...search,
            [event.target.name]: event.target.value,
        });
    };

    const current = allResources.filter(resource => !resource.archive).filter(res => res.name.toLowerCase().startsWith(search.current.toLowerCase()));
    const archives = allResources.filter(resource => resource.archive).filter(res => res.name.toLowerCase().startsWith(search.archives.toLowerCase()));

    return (
        <>
          {
            resources.errMess !== null
            ?
            <Typography variant='h4' color='textSecondary'>Failed to fetch Resources</Typography>
            : null
          }
          <Backdrop className={classes.backdrop} open={resources.isLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
            <Paper elevation={3} variant="outlined" className={classes.paper}>
            {/* <GridList spacing={1} className={classes.gridList}> */}
            {/* <Typography variant="h4" color="primary" className={classes.head}>Current</Typography> */}
            <Grid container justify='flex-start'>
                <Grid item xs={4}>
                    <Typography variant='h4' color="primary" className={classes.head}>Current</Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        className={classes.search}
                        label='Search'
                        name='current'
                        fullWidth
                        value={search.current}
                        onChange={searchChange}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment>
                                {
                                    search.current === ''
                                    ?
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                    :
                                    <IconButton onClick={() => {setSearch({...search, current: ''})}}>
                                        <CloseIcon />
                                    </IconButton>
                                }
                            </InputAdornment>
                            )
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} className={classes.grid}>
                {
                  current.length === 0
                  ?
                  <Typography variant='h4' color='textSecondary'>No current resources</Typography>
                  :
                  current.map((res, index) => (
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
                                 <Typography variant='h4' align='center' className={{ width: '100%' }}>Unapproved Users</Typography>
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
                            ? 
                            <EditResourceForm
                              deleteResource={deleteResource}
                              dumResources={current}
                              dumUsers={users.allUsers}
                              editResource={editResource}
                              index={index}
                              serverError={resources.serverError} />
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
            {/* <Typography variant="h4" color="primary" className={classes.head}>Archived</Typography> */}
            <Grid container justify='flex-start'>
                <Grid item xs={4}>
                    <Typography variant='h4' color="primary" className={classes.head}>Archived</Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        className={classes.search}
                        label='Search'
                        name='archives'
                        fullWidth
                        value={search.archives}
                        onChange={searchChange}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment>
                                {
                                    search.archives === ''
                                    ?
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                    :
                                    <IconButton onClick={() => {setSearch({...search, archives: ''})}}>
                                        <CloseIcon />
                                    </IconButton>
                                }
                            </InputAdornment>
                            )
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} className={classes.grid}>
                {
                  archives.length === 0
                  ?
                  <Typography variant='h4' color='textSecondary'>No archived resources</Typography>
                  :
                  archives.map((res, index) => (
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
                            ? 
                            <EditResourceForm
                              deleteResource={deleteResource}
                              dumResources={archives}
                              dumUsers={users.allUsers}
                              editResource={editResource}
                              index={index}
                              serverError={resources.serverError} />
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
