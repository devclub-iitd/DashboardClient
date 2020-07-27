import React from 'react';
import { Chip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
    FiberManualRecordRounded,
    CheckCircleRounded,
} from '@material-ui/icons';

// const chipColors = {
//     ongoing: {
//         main: '#30d158', // green
//         background: '#5a7664',
//     },
//     upcoming: {
//         main: '#ffd60a', // yellow
//         background: '#7d7656',
//     },
//     completed: {
//         // main: '#ff453a', // red
//         main: '#ff675e',
//         background: '#7d5e5e',
//     },
// };

const chipColors = {
    completedApproved: {
        main: '#23fa58', // green
        background: '#5a7664',
    },
    upcoming: {
        main: '#F000ff', // pink
        background: '#754a78',
    },
    ongoing: {
        main: '#ffd60a', // yellow
        background: '#7d7656',
    },
    unapproved: {
        // main: '#ff453a', // red
        main: '#ff675e',
        background: '#7d5e5e',
    },
    ideaAdmin: {
        main: '#15f4ee', // blue
        background: '#3c5251',
    },
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    completedApprovedOutlined: {
        backgroundColor: chipColors.completedApproved.background,
    },
    completedApprovedOutlinedPrimary: {
        color: chipColors.completedApproved.main,
        borderColor: chipColors.completedApproved.main,
    },
    upcomingUnapprovedOutlined: {
        backgroundColor: chipColors.unapproved.background,
    },
    upcomingUnapprovedOutlinedPrimary: {
        color: chipColors.unapproved.main,
        borderColor: chipColors.unapproved.main,
    },
    ideaAdminOutlined: {
        backgroundColor: chipColors.ideaAdmin.background,
    },
    ideaAdminOutlinedPrimary: {
        color: chipColors.ideaAdmin.main,
        borderColor: chipColors.ideaAdmin.main,
    },
    ongoingOutlined: {
        backgroundColor: chipColors.ongoing.background,
    },
    ongoingOutlinedPrimary: {
        color: chipColors.ongoing.main,
        borderColor: chipColors.ongoing.main,
    },
    upcomingOutlined: {
        backgroundColor: chipColors.upcoming.background,
    },
    upcomingOutlinedPrimary: {
        color: chipColors.upcoming.main,
        borderColor: chipColors.upcoming.main,
    },
    label: {
        width: '100%',
        display: 'inline-block',
        fontWeight: 800,
    },
    span: {
        width: '126px',
    },
    cSpan: {
        width: '111px',
    },
    cTick: {
        cursor: 'inherit',
    },
    outSpan: {
        width: '110px',
    },
}));

export default function StatusChip({ status }) {
    const classes = useStyles();
    if (status === 'upcoming') {
        return (
            <Chip
                label={
                    <Typography
                        align="center"
                        className={classes.label}
                        variant="button"
                    >
                        {status}
                    </Typography>
                }
                variant="outlined"
                color="primary"
                size="small"
                style={{ borderWidth: '2px' }}
                classes={{
                    outlined: classes.upcomingOutlined,
                    outlinedPrimary: classes.upcomingOutlinedPrimary,
                    label: classes.span,
                }}
            />
        );
    }
    if (status === 'unapproved') {
        return (
            <Chip
                label={
                    <Typography
                        align="center"
                        className={classes.label}
                        variant="button"
                    >
                        {status}
                    </Typography>
                }
                variant="outlined"
                color="primary"
                size="small"
                style={{ borderWidth: '2px' }}
                icon={
                    <FiberManualRecordRounded
                        style={{ color: chipColors.unapproved.main }}
                    />
                }
                classes={{
                    outlined: classes.upcomingUnapprovedOutlined,
                    outlinedPrimary: classes.upcomingUnapprovedOutlinedPrimary,
                    label: classes.outSpan,
                }}
            />
        );
    }
    if (status === 'completed') {
        return (
            <Chip
                label={
                    <Typography
                        align="center"
                        className={classes.label}
                        variant="button"
                    >
                        {status}
                    </Typography>
                }
                variant="outlined"
                color="primary"
                size="small"
                style={{ borderWidth: '2px' }}
                deleteIcon={
                    <CheckCircleRounded
                        style={{
                            color: chipColors.completedApproved.main,
                        }}
                    />
                }
                onDelete={() => null}
                classes={{
                    outlined: classes.completedApprovedOutlined,
                    outlinedPrimary: classes.completedApprovedOutlinedPrimary,
                    deleteIcon: classes.cTick,
                    label: classes.cSpan,
                }}
            />
        );
    }
    if (status === 'approved') {
        return (
            <Chip
                label={
                    <Typography
                        align="center"
                        className={classes.label}
                        variant="button"
                    >
                        {status}
                    </Typography>
                }
                variant="outlined"
                color="primary"
                size="small"
                style={{ borderWidth: '2px' }}
                deleteIcon={
                    <CheckCircleRounded
                        style={{
                            color: chipColors.completedApproved.main,
                        }}
                    />
                }
                onDelete={() => null}
                classes={{
                    outlined: classes.completedApprovedOutlined,
                    outlinedPrimary: classes.completedApprovedOutlinedPrimary,
                    deleteIcon: classes.cTick,
                    label: classes.cSpan,
                }}
            />
        );
    }
    if (status === 'idea' || status === 'admin') {
        return (
            <Chip
                label={
                    <Typography
                        align="center"
                        className={classes.label}
                        variant="button"
                    >
                        {status}
                    </Typography>
                }
                variant="outlined"
                color="primary"
                size="small"
                style={{ borderWidth: '2px' }}
                classes={{
                    outlined: classes.ideaAdminOutlined,
                    outlinedPrimary: classes.ideaAdminOutlinedPrimary,
                    label: classes.span,
                }}
            />
        );
    }
    return (
        <Chip
            label={
                <Typography
                    align="center"
                    className={classes.label}
                    variant="button"
                >
                    {status}
                </Typography>
            }
            variant="outlined"
            color="primary"
            size="small"
            style={{ borderWidth: '2px' }}
            icon={
                <FiberManualRecordRounded
                    style={{ color: chipColors.ongoing.main }}
                />
            }
            classes={{
                outlined: classes.ongoingOutlined,
                outlinedPrimary: classes.ongoingOutlinedPrimary,
                label: classes.outSpan,
            }}
        />
    );
}

StatusChip.propTypes = {
    status: PropTypes.string.isRequired,
};
