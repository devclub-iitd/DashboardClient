import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
  const redirectFunc = subPath => () => {
    props.history.push(`/dashboard/${subPath}`);
  };

  return (
    <div>
      <ListItem button onClick={redirectFunc('home')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={redirectFunc('profile')}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button onClick={redirectFunc('changePassword')}>
        <ListItemIcon>
          <VpnKeyIcon />
        </ListItemIcon>
        <ListItemText primary="Change Password" />
      </ListItem>
      <ListItem button onClick={redirectFunc('events')}>
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary="Events" />
      </ListItem>
      <ListItem button onClick={redirectFunc('projects')}>
        <ListItemIcon>
          <DeveloperModeIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItem>
      <ListItem button onClick={redirectFunc('resources')}>
        <ListItemIcon>
          <AllInboxIcon />
        </ListItemIcon>
        <ListItemText primary="Resources" />
      </ListItem>
      <ListItem button disabled={!props.isAdmin} onClick={redirectFunc('users')}>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Users" />
      </ListItem>
      <ListItem button onClick={redirectFunc('myTasks')}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="My Tasks" />
      </ListItem>
      <ListItem button disabled={!props.isAdmin} onClick={redirectFunc('deploy')}>
        <ListItemIcon>
          <PublishIcon />
        </ListItemIcon>
        <ListItemText primary="Deploy" />
      </ListItem>
      {/* <ListItem button onClick={redirectFunc('approveUsers')}>
        <ListItemIcon>
          <ThumbUpAltIcon />
        </ListItemIcon>
        <ListItemText primary="Approve Users" />
      </ListItem> */}
      <ListItem button disabled={!props.isAdmin} onClick={redirectFunc('createTasks')}>
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Create Tasks" />
      </ListItem>
      <ListItem button onClick={() => props.logout()}>
        <ListItemIcon>
          <ExitToAppOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
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
