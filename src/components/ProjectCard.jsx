/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Grid, Typography, Paper, Tooltip, Avatar } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ProjectDialog from './ProjectDialog';
import StatusChip from './StatusChip';

const useStyles = makeStyles((theme) => ({
    projectCard: {
        borderWidth: '3px',
        borderColor: '#979797',
        borderRadius: '15px',
        backgroundColor: '#323234',
        margin: theme.spacing(2, 3, 1, 3),
        padding: theme.spacing(2),
    },
    pointer: {
        cursor: 'pointer',
    },
}));

export default function ProjectCard({ project, users, dialog }) {
    const classes = useStyles();
    const mems = users.filter((user) => project.members.includes(user._id));
    const dis = mems.length <= 3 ? mems : mems.slice(3);
    const [open, setOpen] = React.useState(false);

    const openProjectDialog = () => {
        setOpen(true);
    };
    const closeProjectDialog = () => {
        setOpen(false);
    };
    return (
        <Paper
            onClick={openProjectDialog}
            variant="outlined"
            className={clsx(classes.projectCard, dialog && classes.pointer)}
        >
            <Typography
                align="center"
                variant="h4"
                style={{ width: '100%', fontWeight: 500 }}
            >
                {project.name}
            </Typography>
            <Grid
                style={{ marginTop: '8px' }}
                container
                justify="center"
                alignItems="center"
            >
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    item
                    xs={6}
                >
                    {dis.length === 0 ? (
                        <Grid item xs={12}>
                            <Typography
                                variant="subtitle2"
                                align="center"
                                style={{
                                    fontFamily: 'Monospace',
                                    fontWeight: 'bold',
                                }}
                            >
                                No members assigned
                            </Typography>
                        </Grid>
                    ) : (
                        dis.map((mem) => (
                            <Grid item xs={4}>
                                <Tooltip title={mem.name}>
                                    <Avatar
                                        alt=""
                                        src={mem.url.get('picture_url')}
                                    />
                                </Tooltip>
                            </Grid>
                        ))
                    )}
                </Grid>
                <Grid container justify="center" item xs={6}>
                    <StatusChip status={project.status.toLowerCase()} />
                </Grid>
            </Grid>
            {open ? (
                <ProjectDialog
                    open={open}
                    project={project}
                    close={closeProjectDialog}
                    users={users}
                />
            ) : null}
        </Paper>
    );
}

ProjectCard.propTypes = {
    project: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    dialog: PropTypes.bool.isRequired,
};
