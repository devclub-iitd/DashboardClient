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
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
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
      <ListItem button onClick={redirectFunc('approveUsers')}>
        <ListItemIcon>
          <ThumbUpAltIcon />
        </ListItemIcon>
        <ListItemText primary="Approve Users" />
      </ListItem>
      <ListItem button onClick={redirectFunc('createTasks')}>
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Create Tasks/Events" />
      </ListItem>
      <ListItem button onClick={redirectFunc('assignTasks')}>
        <ListItemIcon>
          <AssignmentIndIcon />
        </ListItemIcon>
        <ListItemText primary="Assign Tasks/Events" />
      </ListItem>
    </div>
  );
}

export default withRouter(MainListItems);
