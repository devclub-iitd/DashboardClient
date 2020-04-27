import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Tooltip } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EventIcon from '@material-ui/icons/Event';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import PublishIcon from '@material-ui/icons/Publish';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { withRouter } from 'react-router-dom';

function MainListItems(props) {
  const redirectFunc = (subPath, closeDrawer) => () => {
    closeDrawer();
    if (subPath === 'users' || subPath === 'deploy') {
      if (!props.isAdmin) {
        props.history.push('/dashboard/home');
      } else {
        props.history.push(`/dashboard/${subPath}`);
      }
    } else {
      props.history.push(`/dashboard/${subPath}`);
    }
  };

  return (
    <div>
      <ListItem button onClick={redirectFunc('home', props.closeDrawer)}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <Tooltip title="Home">
          <ListItemText primary="Home" />
        </Tooltip>
      </ListItem>
      <ListItem button onClick={redirectFunc('profile', props.closeDrawer)}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <Tooltip title="Profile">
          <ListItemText primary="Profile" />
        </Tooltip>
      </ListItem>
      <ListItem button onClick={redirectFunc('changePassword', props.closeDrawer)}>
        <ListItemIcon>
          <VpnKeyIcon />
        </ListItemIcon>
        <Tooltip title="Change your Password">
          <ListItemText primary="Change Password" />
        </Tooltip>
      </ListItem>
      <ListItem button onClick={redirectFunc('events', props.closeDrawer)}>
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <Tooltip title="View club events">
          <ListItemText primary="Events" />
        </Tooltip>
      </ListItem>
      <ListItem button onClick={redirectFunc('projects', props.closeDrawer)}>
        <ListItemIcon>
          <DeveloperModeIcon />
        </ListItemIcon>
        <Tooltip title="View club projects">
          <ListItemText primary="Projects" />
        </Tooltip>
      </ListItem>
      <ListItem button onClick={redirectFunc('resources', props.closeDrawer)}>
        <ListItemIcon>
          <AllInboxIcon />
        </ListItemIcon>
        <Tooltip title="View club resources">
          <ListItemText primary="Resources" />
        </Tooltip>
      </ListItem>
      <ListItem button disabled={!props.isAdmin} onClick={redirectFunc('users', props.closeDrawer)}>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <Tooltip title="Manage club users (Only for Admins)">
          <ListItemText primary="Manage Users" />
        </Tooltip>
      </ListItem>
      <ListItem button onClick={redirectFunc('myTasks', props.closeDrawer)}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <Tooltip title="View your tasks">
          <ListItemText primary="My Tasks" />
        </Tooltip>
      </ListItem>
      <ListItem button disabled={!props.isAdmin} onClick={redirectFunc('deploy', props.closeDrawer)}>
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
      <ListItem button onClick={redirectFunc('createTasks', props.closeDrawer)}>
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <Tooltip title="Create new Events, Resources or Projects">
          <ListItemText primary="Create Tasks" />
        </Tooltip>
      </ListItem>
      <ListItem button onClick={() => props.logout()}>
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

export default withRouter(MainListItems);
