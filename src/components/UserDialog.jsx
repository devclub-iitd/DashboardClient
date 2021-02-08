/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
    Dialog,
    Card,
    Typography,
    CardContent,
    Grid,
    Divider,
    Link,
    Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import StatusChip from './StatusChip';
import { UserUtils } from '../utils';

const useStyles = makeStyles((theme) => ({
    divider: {
        backgroundColor: '#979797',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    info: {
        marginTop: theme.spacing(1),
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

export default function UserDialog({ user, close, isSuper }) {
    const classes = useStyles();
    const closeDialog = () => {
        close();
    };

    const FielSep = () => <Grid item xs={12} style={{ height: '4px' }} />;

    return (
        <Dialog
            open
            onClose={closeDialog}
            maxWidth="sm"
            fullWidth
            scroll="paper"
            PaperComponent="div"
        >
            <Grid style={{ width: '100%' }} container justify="center">
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid
                                container
                                justify="space-between"
                                alignItems="center"
                            >
                                <Grid item xs={8}>
                                    <Typography
                                        style={{ fontWeight: 500 }}
                                        variant="h3"
                                    >
                                        {user !== undefined
                                            ? user.name
                                            : 'jbkbkb'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sm={2}>
                                    <Avatar
                                        className={classes.avatar}
                                        src={
                                            user.url.get('picture_url') !==
                                                'https://' &&
                                            user.url.get('picture_url') !==
                                                'http://'
                                                ? user.url.get('picture_url')
                                                : ''
                                        }
                                        alt=""
                                    />
                                </Grid>
                            </Grid>

                            <Divider
                                variant="fullwidth"
                                className={classes.divider}
                            />
                            <Grid
                                container
                                justify="flex-start"
                                alignItems="center"
                            >
                                <Grid item xs={6} sm={8}>
                                    <Typography variant="h5">
                                        {user.entry_no}
                                    </Typography>
                                </Grid>
                                <Grid item xs={5} sm={3}>
                                    <StatusChip
                                        status={UserUtils.getStatus(user)}
                                    />
                                </Grid>
                            </Grid>
                            <Typography
                                className={classes.info}
                                variant="body1"
                            >
                                {user.intro}
                            </Typography>
                            {Array.from(user.url).map(([key, value]) => {
                                return (
                                    <Typography
                                        className={classes.info}
                                        variant="h6"
                                    >
                                        {`${key}: `}
                                        <Link
                                            target="_blank"
                                            href={value}
                                            underline="none"
                                        >
                                            {value.length < 30
                                                ? value
                                                : `${value.substr(0, 30)}...`}
                                        </Link>
                                    </Typography>
                                );
                            })}
                            <Grid
                                container
                                justify="flex-start"
                                alignItems="center"
                                className={classes.info}
                            >
                                <Grid item xs={6}>
                                    <Typography variant="h6">DOB:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        {user.birth_date.toDateString()}
                                    </Typography>
                                </Grid>
                                <FielSep />
                                <Grid item xs={6}>
                                    <Typography variant="h6">
                                        Joined DevClub:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        {user.join_year.toDateString()}
                                    </Typography>
                                </Grid>
                                <FielSep />
                                <Grid item xs={6}>
                                    <Typography variant="h6">
                                        Graduating:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        {user.grad_year.toDateString()}
                                    </Typography>
                                </Grid>
                                <FielSep />
                                <Grid item xs={6}>
                                    <Typography variant="h6">
                                        Hometown:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        {user.hometown}
                                    </Typography>
                                </Grid>
                                <FielSep />
                                <Grid item xs={6}>
                                    <Typography variant="h6">
                                        Mobile:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        {user.mobile_number}
                                    </Typography>
                                </Grid>
                                <FielSep />
                                <Grid item xs={6}>
                                    <Typography variant="h6">Email:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        {user.email}
                                    </Typography>
                                </Grid>
                                <FielSep />
                                {
                                    isSuper ?
                                    <>
                                        <FielSep />
                                            <Grid item xs={6}>
                                                <Typography variant="h6">CASI Email:</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="body1">
                                                    {user.casi_email}
                                                </Typography>
                                            </Grid>
                                        <FielSep />
                                    </>:null
                                }
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Dialog>
    );
}

UserDialog.propTypes = {
    user: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
    isSuper: PropTypes.bool.isRequired,
};
