import React, { useState, useEffect, useContext } from 'react';
import { getAll as getAllUser } from "../services/User";
import { getAll as getAllProject } from "../services/Project";
import { getAll as getAllEvent } from "../services/Event";
import { getAll as getAllItem } from "../services/Item";
import { GlobalContext } from "../utils/Context";

import Grid from '@material-ui/core/Grid';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FolderIcon from '@material-ui/icons/Folder';
import PersonIcon from '@material-ui/icons/Person';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        height: 20,
        width: 20,
        position: "relative"
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});

const fetchData = () => {
    const usersPromise = getAllUser();
    const projectsPromise = getAllProject();
    const eventsPromise = getAllEvent();
    const itemsPromise = getAllItem();
    return Promise.all([usersPromise, projectsPromise, eventsPromise, itemsPromise]);
}


function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

const DashboardComponent = (props) => {
    const { classes } = props;

    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [projects, setProjects] = useState([]);
    const [items, setItems] = useState([]);
    const { showError } = useContext(GlobalContext);

    console.log(users);
    console.log(projects);
    console.log(events);
    console.log(items);

    useEffect(() => {
        fetchData()
            .then(([users, projects, events, items]) => {
                setUsers(users);
                setProjects(projects);
                setEvents(events);
                setItems(items);
            })
            .catch(error => { console.log(error); showError(error.message) });
    }, []);

    return (
        <>
            <h1>
                Dashboard Component
            </h1>
            <Grid container justify="center" spacing={16}>
                <Grid item xs>
                    {
                        users.map((user) => {
                            const userProjects = projects.filter((project)=>{
                                for(let i=0;i<project.members.length;i++) {
                                    if(project.members[i] === user.id) return true;
                                }
                                return false;
                            });
                            return (
                                <ExpansionPanel key={user.id}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <div className={classes.column}>
                                            <Typography className={classes.heading}>{user.name}</Typography>
                                        </div>
                                        <div className={classes.column}>
                                            <Typography className={classes.secondaryHeading}>
                                                <FolderIcon className={classes.icon}/>
                                                {userProjects.length}
                                            </Typography>
                                        </div>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <List>
                                            {
                                                userProjects.map((userProject)=>{
                                                    return (
                                                        <ListItemLink href="#simple-list" key={userProject.id}>
                                                            <ListItemText primary={userProject.name}/>
                                                        </ListItemLink>
                                                    );
                                                })
                                            }
                                        </List>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            );
                        })
                    }
                </Grid>
                <Grid item xs>
                    {
                        projects.map((project) => {
                            const projectMembers = users.filter(user => {
                                for(let i=0;i<project.members.length;i++) {
                                    const targetUserId = project.members[i];
                                    if(targetUserId === user.id) return true;
                                }
                                return false;
                            });
                            return (
                                <ExpansionPanel key={project.id}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <div className={classes.column}>
                                            <Typography className={classes.heading}>{project.name}</Typography>
                                        </div>
                                        <div className={classes.column}>
                                            <Typography className={classes.secondaryHeading}>{project.status}</Typography>
                                        </div>
                                        <div className={classes.column}>
                                            <Typography className={classes.secondaryHeading}>{project.endDate.getTime()}</Typography>
                                        </div>
                                        <div className={classes.column}>
                                            <Typography className={classes.secondaryHeading}>
                                                <PersonIcon className={classes.icon}/>
                                                {projectMembers.length}
                                            </Typography>
                                        </div>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            <List>
                                                {
                                                    projectMembers.map((member)=>{
                                                        return (
                                                            <ListItemLink href="#simple-list" key={member.id}>
                                                                <ListItemText primary={member.name}/>
                                                            </ListItemLink>
                                                        );
                                                    })
                                                }
                                            </List>
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            );
                        })
                    }
                </Grid>
                <Grid item xs>
                    {
                        events.map((event) => {
                            return (
                                <ExpansionPanel key={event.id}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <div className={classes.column}>
                                            <Typography className={classes.heading}>{event.name}</Typography>
                                        </div>
                                        <div className={classes.column}>
                                            <Typography className={classes.secondaryHeading}>{event.startDate.getTime()}</Typography>
                                        </div>
                                        <div className={classes.column}>
                                            <Typography className={classes.secondaryHeading}>{event.endDate.getTime()}</Typography>
                                        </div>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            {event.description}
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            );
                        })
                    }
                </Grid>
            </Grid>
        </>
    );
}

export default withStyles(styles)(DashboardComponent);