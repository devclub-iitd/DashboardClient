/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { ListItem, ListItemIcon, Tooltip, Typography } from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
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
    const { history, isAdmin, logout } = props;
    const [selectedItem, setSelected] = React.useState(0);
    const redirectFunc = (subPath, index) => () => {
        if (subPath === 'users' || subPath === 'deploy') {
            if (!isAdmin) {
                history.push('/dashboard/home');
                setSelected(0);
            } else {
                history.push(`/dashboard/${subPath}`);
            }
        } else {
            history.push(`/dashboard/${subPath}`);
            setSelected(index);
        }
    };

    return (
        <div>
            <ListItem button onClick={redirectFunc('home', 0)}>
                <ListItemIcon>
                    <HomeRoundedIcon
                        fontSize="large"
                        style={{
                            color: selectedItem === 0 ? '#61cdff' : 'white',
                        }}
                    />
                </ListItemIcon>
                <Tooltip title="Home">
                    {/* <ListItemText primary="Home" /> */}
                    <Typography
                        color={selectedItem === 0 ? 'secondary' : '#fff'}
                        variant="h5"
                    >
                        Home
                    </Typography>
                </Tooltip>
            </ListItem>
            <ListItem button onClick={redirectFunc('profile', 1)}>
                <ListItemIcon>
                    <PersonIcon
                        style={{
                            color: selectedItem === 1 ? '#61cdff' : 'white',
                        }}
                    />
                </ListItemIcon>
                <Tooltip title="Profile">
                    {/* <ListItemText primary="Profile" /> */}
                    <Typography
                        color={selectedItem === 1 ? 'secondary' : '#fff'}
                        variant="h5"
                    >
                        Profile
                    </Typography>
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
            <ListItem button onClick={redirectFunc('events', 2)}>
                <ListItemIcon>
                    <EventIcon
                        style={{
                            color: selectedItem === 2 ? '#61cdff' : 'white',
                        }}
                    />
                </ListItemIcon>
                <Tooltip title="View club events">
                    {/* <ListItemText primary="Events" /> */}
                    <Typography
                        color={selectedItem === 2 ? 'secondary' : '#fff'}
                        variant="h5"
                    >
                        Events
                    </Typography>
                </Tooltip>
            </ListItem>
            <ListItem button onClick={redirectFunc('projects', 3)}>
                <ListItemIcon>
                    <DeveloperModeIcon
                        style={{
                            color: selectedItem === 3 ? '#61cdff' : 'white',
                        }}
                    />
                </ListItemIcon>
                <Tooltip title="View club projects">
                    {/* <ListItemText primary="Projects" /> */}
                    <Typography
                        color={selectedItem === 3 ? 'secondary' : '#fff'}
                        variant="h5"
                    >
                        Projects
                    </Typography>
                </Tooltip>
            </ListItem>
            <ListItem button onClick={redirectFunc('resources', 4)}>
                <ListItemIcon>
                    <AllInboxIcon
                        style={{
                            color: selectedItem === 4 ? '#61cdff' : 'white',
                        }}
                    />
                </ListItemIcon>
                <Tooltip title="View club resources">
                    {/* <ListItemText primary="Resources" /> */}
                    <Typography
                        color={selectedItem === 4 ? 'secondary' : '#fff'}
                        variant="h5"
                    >
                        Resources
                    </Typography>
                </Tooltip>
            </ListItem>
            <ListItem
                button
                disabled={!isAdmin}
                onClick={redirectFunc('users', 5)}
            >
                <ListItemIcon>
                    <GroupIcon
                        style={{
                            color: selectedItem === 5 ? '#61cdff' : 'white',
                        }}
                    />
                </ListItemIcon>
                <Tooltip title="Manage club users (Only for Admins)">
                    {/* <ListItemText primary="Manage Users" /> */}
                    <Typography
                        color={selectedItem === 5 ? 'secondary' : '#fff'}
                        variant="h5"
                    >
                        Manage Users
                    </Typography>
                </Tooltip>
            </ListItem>
            <ListItem button onClick={redirectFunc('myTasks', 6)}>
                <ListItemIcon>
                    <AssignmentIcon
                        style={{
                            color: selectedItem === 6 ? '#61cdff' : 'white',
                        }}
                    />
                </ListItemIcon>
                <Tooltip title="View your tasks">
                    {/* <ListItemText primary="My Tasks" /> */}
                    <Typography
                        color={selectedItem === 6 ? 'secondary' : '#fff'}
                        variant="h5"
                    >
                        My Tasks
                    </Typography>
                </Tooltip>
            </ListItem>
            <ListItem
                button
                disabled={!isAdmin}
                onClick={redirectFunc('deploy', 7)}
            >
                <ListItemIcon>
                    <PublishIcon
                        style={{
                            color: selectedItem === 7 ? '#61cdff' : 'white',
                        }}
                    />
                </ListItemIcon>
                <Tooltip title="Manage project deployments (Only for Admins)">
                    {/* <ListItemText primary="Deploy" /> */}
                    <Typography
                        color={selectedItem === 7 ? 'secondary' : '#fff'}
                        variant="h5"
                    >
                        Deploy
                    </Typography>
                </Tooltip>
            </ListItem>
            {/* <ListItem button onClick={redirectFunc('approveUsers')}>
        <ListItemIcon>
          <ThumbUpAltIcon />
        </ListItemIcon>
        <ListItemText primary="Approve Users" />
      </ListItem> */}
            <ListItem button onClick={redirectFunc('createTasks', 8)}>
                <ListItemIcon>
                    <AddBoxIcon
                        style={{
                            color: selectedItem === 8 ? '#61cdff' : 'white',
                        }}
                    />
                </ListItemIcon>
                <Tooltip title="Create new Events, Resources or Projects">
                    {/* <ListItemText primary="Create Tasks" /> */}
                    <Typography
                        color={selectedItem === 8 ? 'secondary' : '#fff'}
                        variant="h5"
                    >
                        Create Tasks
                    </Typography>
                </Tooltip>
            </ListItem>
            <ListItem button onClick={logout}>
                <ListItemIcon>
                    <ExitToAppOutlinedIcon
                        style={{
                            color: 'white',
                        }}
                    />
                </ListItemIcon>
                <Tooltip title="Logout of dashboard">
                    {/* <ListItemText primary="Logout" /> */}
                    <Typography variant="h5">Logout</Typography>
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
