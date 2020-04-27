import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper, TextField,
  Typography, Grid, Backdrop, CircularProgress, InputAdornment, IconButton
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
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
        height: '27em',
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const ProjectsPage = ({ projects, editProject, deleteProject, users }) => {
    const classes = useStyles();
    const allProjects = projects.allProjects;
    const curUser = users.user;

    const [search, setSearch] = React.useState({
        idea: '',
        ongoing: '',
        completed: '',
    });

    const searchChange = (event) => {
        event.preventDefault();
        
        setSearch({
            ...search,
            [event.target.name]: event.target.value,
        });
    };

    const ideas = allProjects.filter((project) => project.status === 'IDEA').filter(pro => pro.name.toLowerCase().startsWith(search.idea.toLowerCase()));
    const ongoing = allProjects.filter((project) => project.status === 'ONGOING').filter(pro => pro.name.toLowerCase().startsWith(search.ongoing.toLowerCase()));
    const completed = allProjects.filter((project) => project.status === 'COMPLETED').filter(pro => pro.name.toLowerCase().startsWith(search.completed.toLowerCase()));

    return (
        <>
        {
          projects.errMess !== null
          ?
          <Typography variant='h4' color='textSecondary'>Failed to fetch Projects</Typography>
          : null
        }
        <Backdrop className={classes.backdrop} open={projects.isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Paper elevation={3} variant="outlined" className={classes.paper}>
            {/* <GridList spacing={1} className={classes.gridList}> */}
            {/* <Typography variant='h4' color="primary" className={classes.head}>Ideated</Typography> */}
                <Grid container justify='flex-start'>
                    <Grid item xs={12} sm={4}>
                        <Typography variant='h4' color="primary" className={classes.head}>Ideated</Typography>
                    </Grid>
                    <Grid item xs={10} sm={6}>
                        <TextField
                            className={classes.search}
                            label='Search'
                            name='idea'
                            fullWidth
                            style={{ marginLeft: '1em' }}
                            value={search.idea}
                            onChange={searchChange}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment>
                                    {
                                        search.idea === ''
                                        ?
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                        :
                                        <IconButton onClick={() => {setSearch({...search, idea: ''})}}>
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
                      ideas.length === 0
                      ?
                      <Typography variant='h4' color='textSecondary'>No ideated projects</Typography>
                      :
                      ideas.map((project, index) => (
                        // <GridListTile key={`${project}~${index}`} cols={2} rows={2}>
                        <Grid key={`${project}~${index}`} item xs={12} md={6} lg={4}>
                            <Card body style={{ borderColor: '#00c853' }}>
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
                                                <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{`${value.substr(0, 30)}...`}</CardLink></Typography>
                                            );
                                        })
                                    }
                                    </CardText>
                                </CardBody>
                                <CardFooter>
                                    {/* Assigned to: {project.members.map((memId) => users.allUsers.filter((user) => user._id === memId).name + ', ')} */}
                                    Assigned to: {users.allUsers.filter(user => project.members.includes(user._id)).map(user => (user.name + ', '))}
                                    {
                                        curUser.privelege_level === 'Admin'
                                        ?
                                        <EditProjectForm
                                          deleteProject={deleteProject}
                                          dumProjects={ideas}
                                          dumUsers={users.allUsers} 
                                          editProject={editProject}
                                          index={index}
                                          serverError={projects.serverError} />
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
            {/* <Typography variant='h4' color="primary" className={classes.head}>Ongoing</Typography> */}
                <Grid container justify='flex-start'>
                    <Grid item xs={12} sm={4}>
                        <Typography variant='h4' color="primary" className={classes.head}>Ongoing</Typography>
                    </Grid>
                    <Grid item xs={10} sm={6}>
                        <TextField
                            className={classes.search}
                            label='Search'
                            name='ongoing'
                            fullWidth
                            style={{ marginLeft: '1em' }}
                            value={search.ongoing}
                            onChange={searchChange}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment>
                                    {
                                        search.ongoing === ''
                                        ?
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                        :
                                        <IconButton onClick={() => {setSearch({...search, ongoing: ''})}}>
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
                      ongoing.length === 0
                      ?
                      <Typography variant='h4' color='textSecondary'>No ongoing projects</Typography>
                      :
                      ongoing.map((project, index) => (
                        // <GridListTile key={`${project}~${index}`} cols={2} rows={2}>
                        <Grid key={`${project}~${index}`} item xs={12} md={6} lg={4}>
                            <Card body style={{ borderColor: '#00c853' }}>
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
                                                <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{`${value.substr(0, 30)}...`}</CardLink></Typography>
                                            );
                                        })
                                    }
                                    </CardText>
                                </CardBody>
                                <CardFooter>
                                    Assigned to: {users.allUsers.filter(user => project.members.includes(user._id)).map(user => (user.name + ', '))}
                                    {
                                        curUser.privelege_level === 'Admin'
                                        ?
                                        <EditProjectForm
                                          deleteProject={deleteProject}
                                          dumProjects={ongoing}
                                          dumUsers={users.allUsers} 
                                          editProject={editProject}
                                          index={index}
                                          serverError={projects.serverError} />
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
            {/* <Typography variant='h4' color="primary" className={classes.head}>Completed</Typography> */}
                <Grid container justify='flex-start'>
                    <Grid item xs={12} sm={4}>
                        <Typography variant='h4' color="primary" className={classes.head}>Completed</Typography>
                    </Grid>
                    <Grid item xs={10} sm={6}>
                        <TextField
                            className={classes.search}
                            label='Search'
                            name='completed'
                            fullWidth
                            style={{ marginLeft: '1em' }}
                            value={search.completed}
                            onChange={searchChange}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment>
                                    {
                                        search.completed === ''
                                        ?
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                        :
                                        <IconButton onClick={() => {setSearch({...search, completed: ''})}}>
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
                      completed.length === 0
                      ?
                      <Typography variant='h4' color='textSecondary'>No completed projects</Typography>
                      :
                      completed.map((project, index) => (
                        // <GridListTile key={`${project}~${index}`} cols={2} rows={2}>
                        <Grid key={`${project}~${index}`} item xs={12} md={6} lg={4}>
                            <Card body style={{ borderColor: '#00c853' }}>
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
                                                <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{`${value.substr(0, 30)}...`}</CardLink></Typography>
                                            );
                                        })
                                    }
                                    </CardText>
                                </CardBody>
                                <CardFooter>
                                    Assigned to: {users.allUsers.filter(user => project.members.includes(user._id)).map(user => (user.name + ', '))}
                                    {
                                        curUser.privelege_level === 'Admin'
                                        ?
                                        <EditProjectForm
                                          deleteProject={deleteProject}
                                          dumProjects={completed}
                                          dumUsers={users.allUsers} 
                                          editProject={editProject}
                                          index={index}
                                          serverError={projects.serverError} />
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
