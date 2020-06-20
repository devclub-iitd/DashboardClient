/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
    ListItem,
    ListItemText,
    ListItemIcon,
    Tooltip,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import EventIcon from '@material-ui/icons/Event';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import PublishIcon from '@material-ui/icons/Publish';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function MainListItems(props) {
    const { history, isAdmin, closeDrawer, logout } = props;
    const redirectFunc = (subPath) => () => {
        closeDrawer();
        if (subPath === 'users' || subPath === 'deploy') {
            if (!isAdmin) {
                history.push('/dashboard/home');
            } else {
                history.push(`/dashboard/${subPath}`);
            }
        } else {
            history.push(`/dashboard/${subPath}`);
        }
    };

    return (
        <div>
            <ListItem button onClick={redirectFunc('home')}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <Tooltip title="Home">
                    <ListItemText primary="Home" />
                </Tooltip>
            </ListItem>
            <ListItem button onClick={redirectFunc('profile')}>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <Tooltip title="Profile">
                    <ListItemText primary="Profile" />
                </Tooltip>
            </ListItem>
            {/* <ListItem button onClick={redirectFunc('changePassword')}>
        <ListItemIcon>
          <VpnKeyIcon />
        </ListItemIcon>
        <Tooltip title="Change your Password">
          <ListItemText primary="Change Password" />
        </Tooltip>
      </ListItem> */}
            <ListItem button onClick={redirectFunc('events')}>
                <ListItemIcon>
                    <EventIcon />
                </ListItemIcon>
                <Tooltip title="View club events">
                    <ListItemText primary="Events" />
                </Tooltip>
            </ListItem>
            <ListItem button onClick={redirectFunc('projects')}>
                <ListItemIcon>
                    <DeveloperModeIcon />
                </ListItemIcon>
                <Tooltip title="View club projects">
                    <ListItemText primary="Projects" />
                </Tooltip>
            </ListItem>
            <ListItem button onClick={redirectFunc('resources')}>
                <ListItemIcon>
                    <AllInboxIcon />
                </ListItemIcon>
                <Tooltip title="View club resources">
                    <ListItemText primary="Resources" />
                </Tooltip>
            </ListItem>
            <ListItem
                button
                disabled={!isAdmin}
                onClick={redirectFunc('users')}
            >
                <ListItemIcon>
                    <GroupIcon />
                </ListItemIcon>
                <Tooltip title="Manage club users (Only for Admins)">
                    <ListItemText primary="Manage Users" />
                </Tooltip>
            </ListItem>
            <ListItem button onClick={redirectFunc('myTasks')}>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <Tooltip title="View your tasks">
                    <ListItemText primary="My Tasks" />
                </Tooltip>
            </ListItem>
            <ListItem
                button
                disabled={!isAdmin}
                onClick={redirectFunc('deploy')}
            >
                <ListItemIcon>
                    <PublishIcon />
                </ListItemIcon>
                <Tooltip title="Manage project deployments (Only for Admins)">
                    <ListItemText primary="Deploy" />
                </Tooltip>
            </ListItem>
            {/* <ListItem button onClick={redirectFunc('approveUsers')}>
        <ListItemIcon>
          <ThumbUpAltIcon />
        </ListItemIcon>
        <ListItemText primary="Approve Users" />
      </ListItem> */}
            <ListItem button onClick={redirectFunc('createTasks')}>
                <ListItemIcon>
                    <AddBoxIcon />
                </ListItemIcon>
                <Tooltip title="Create new Events, Resources or Projects">
                    <ListItemText primary="Create Tasks" />
                </Tooltip>
            </ListItem>
            <ListItem button onClick={() => logout()}>
                <ListItemIcon>
                    <ExitToAppOutlinedIcon />
                </ListItemIcon>
                <Tooltip title="Logout of dashboard">
                    <ListItemText primary="Logout" />
                </Tooltip>
            </ListItem>
            {/* <ListItem button onClick={redirectFunc('assignTasks')}>
        <ListItemIcon>
          <AssignmentIndIcon />
        </ListItemIcon>
        <ListItemText primary="Assign Tasks/Events" />
      </ListItem> */}
        </div>
    );
}

MainListItems.propTypes = {
    history: PropTypes.any.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    closeDrawer: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};

export default withRouter(MainListItems);
