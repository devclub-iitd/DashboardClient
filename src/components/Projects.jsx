import React, { Fragment, Component } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Paper, GridList, GridListTileBar, GridListTile,
  Typography, Grid
} from '@material-ui/core';
import { Card, CardBody, CardText, CardTitle, CardFooter,
    CardHeader, CardLink
} from 'reactstrap';
import EditProjectForm from './EditProjectForm';

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

const ProjectsPage = ({ projects, fetchAllProjects, editProject, users }) => {
    const classes = useStyles();
    const allProjects = projects.allProjects;
    const curUser = users.user;

    return (
        <>
        <Paper elevation={3} variant="outlined" className={classes.paper}>
            {/* <GridList spacing={1} className={classes.gridList}> */}
            <Typography variant='h4' color="primary" className={classes.head}>Ideated</Typography>
                <Grid container spacing={2} className={classes.grid}>
                    {allProjects.filter((project) => project.status === 'IDEA').map((project, index) => (
                        // <GridListTile key={`${project}~${index}`} cols={2} rows={2}>
                        <Grid key={`${project}~${index}`} item xs={12} md={6} lg={4}>
                            <Card color="primary" outline>
                                <CardHeader>
                                    <Typography variant='h4'>{project.name}</Typography>
                                </CardHeader>
                                <CardBody>
                                    <CardTitle>
                                    <Typography variant='h6'>{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}`}</Typography>
                                    </CardTitle>
                                    <CardText>
                                    <Typography variant='body1' >{project.description}</Typography>
                                    {
                                        Array.from(project.url).map(([key, value]) => {
                                            return(
                                                <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                        })
                                    }
                                    </CardText>
                                </CardBody>
                                <CardFooter>
                                    Assigned to: {project.members.map((mem) => (` ${mem.name},`))}
                                    {
                                        curUser.privelege_level === 'Admin'
                                        ?
                                        <EditProjectForm deleteProject={props.deleteProject} dumProjects={allProjects} dumUsers={users.allUsers} editProject={editProject} index={index} />
                                        : null
                                    }
                                </CardFooter>
                                {/* <CardFooter>
                                    Assigned to: {project.assignee}
                                </CardFooter> */}
                            </Card>
                        </Grid>
                        // </GridListTile>
                    ))}
                </Grid>
            {/* </GridList> */}
        </Paper>
        <Paper elevation={3} variant="outlined" className={classes.paper}>
            {/* <GridList spacing={1} className={classes.gridList}> */}
            <Typography variant='h4' color="primary" className={classes.head}>Ongoing</Typography>
                <Grid container spacing={2} className={classes.grid}>
                    {allProjects.filter((project) => project.status === 'ONGOING').map((project, index) => (
                        // <GridListTile key={`${project}~${index}`} cols={2} rows={2}>
                        <Grid key={`${project}~${index}`} item xs={12} md={6} lg={4}>
                            <Card color="primary" outline>
                                <CardHeader>
                                    <Typography variant='h4'>{project.name}</Typography>
                                </CardHeader>
                                <CardBody>
                                    <CardTitle>
                                    <Typography variant='h6'>{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}`}</Typography>
                                    </CardTitle>
                                    <CardText>
                                    <Typography variant='body1' >{project.description}</Typography>
                                    {
                                        Array.from(project.url).map(([key, value]) => {
                                            return(
                                                <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                        })
                                    }
                                    </CardText>
                                </CardBody>
                                <CardFooter>
                                    Assigned to: {project.members.map((mem) => (` ${mem.name},`))}
                                    {
                                        curUser.privelege_level === 'Admin'
                                        ?
                                        <EditProjectForm deleteProject={props.deleteProject} dumProjects={allProjects} dumUsers={users.allUsers} editProject={editProject} index={index} />
                                        : null
                                    }
                                </CardFooter>
                                {/* <CardFooter>
                                    Assigned to: {project.assignee}
                                </CardFooter> */}
                            </Card>
                        </Grid>
                        // </GridListTile>
                    ))}
                </Grid>
            {/* </GridList> */}
        </Paper>
        <Paper elevation={3} variant="outlined" className={classes.paper}>
            {/* <GridList spacing={1} className={classes.gridList}> */}
            <Typography variant='h4' color="primary" className={classes.head}>Completed</Typography>
                <Grid container spacing={2} className={classes.grid}>
                    {allProjects.filter((project) => project.status === 'COMPLETED').map((project, index) => (
                        // <GridListTile key={`${project}~${index}`} cols={2} rows={2}>
                        <Grid key={`${project}~${index}`} item xs={12} md={6} lg={4}>
                            <Card color="primary" outline>
                                <CardHeader>
                                    <Typography variant='h4'>{project.name}</Typography>
                                </CardHeader>
                                <CardBody>
                                    <CardTitle>
                                    <Typography variant='h6'>{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}`}</Typography>
                                    </CardTitle>
                                    <CardText>
                                    <Typography variant='body1' >{project.description}</Typography>
                                    {
                                        Array.from(project.url).map(([key, value]) => {
                                            return(
                                                <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                        })
                                    }
                                    </CardText>
                                </CardBody>
                                <CardFooter>
                                    Assigned to: {project.members.map((mem) => (` ${mem.name},`))}
                                    {
                                        curUser.privelege_level === 'Admin'
                                        ?
                                        <EditProjectForm deleteProject={props.deleteProject} dumProjects={allProjects} dumUsers={users.allUsers} editProject={editProject} index={index} />
                                        : null
                                    }
                                </CardFooter>
                                {/* <CardFooter>
                                    Assigned to: {project.assignee}
                                </CardFooter> */}
                            </Card>
                        </Grid>
                        // </GridListTile>
                    ))}
                </Grid>
            {/* </GridList> */}
        </Paper>
        </>
    );
}

export default ProjectsPage;
