/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Grid, Fab, Grow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import {
    EditRounded,
    GetAppRounded,
    ReplayRounded,
    PowerSettingsNewRounded,
} from '@material-ui/icons';
import CustomSearchRender from './CustomTableSearchBox';
import TableTitle from './CustomTableTitle';

const useStyles = makeStyles((theme) => ({
    tablePaper: {
        borderRadius: '4px',
        padding: theme.spacing(0, 2),
    },
    redeploy: {
        backgroundColor: theme.palette.warning.main,
    },
    stop: {
        backgroundColor: theme.palette.error.main,
    },
}));

export default function DeployManager(props) {
    const classes = useStyles();

    const columns = [
        {
            name: 'repo',
            label: 'Repo',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'build',
            label: 'Build',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'uptime',
            label: 'Uptime',
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'subdomain',
            label: 'Subdomain',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'access',
            label: 'Access',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'Edit Env',
            options: {
                filter: false,
                customBodyRender: () => (
                    <Fab size="small" color="primary">
                        <EditRounded
                            fontSize="small"
                            style={{ color: '#636366' }}
                        />
                    </Fab>
                ),
            },
        },
        {
            name: 'Get Logs',
            options: {
                filter: false,
                customBodyRender: () => (
                    <Fab size="small" color="secondary">
                        <GetAppRounded
                            fontSize="small"
                            style={{ color: '#636366' }}
                        />
                    </Fab>
                ),
            },
        },
        {
            name: 'Redeploy',
            options: {
                filter: false,
                customBodyRender: () => (
                    <Fab size="small" className={classes.redeploy}>
                        <ReplayRounded
                            fontSize="small"
                            style={{ color: '#636366' }}
                        />
                    </Fab>
                ),
            },
        },
        {
            name: 'Stop',
            options: {
                filter: false,
                customBodyRender: () => (
                    <Fab size="small" className={classes.stop}>
                        <PowerSettingsNewRounded
                            fontSize="small"
                            style={{ color: '#636366' }}
                        />
                    </Fab>
                ),
            },
        },
    ];

    const data = [
        ['Yearbook', 'Dev', '25:06:02', 'yearbook', 'External'],
        ['Yearbook', 'prod', '46:34:34', 'yearbook', 'External'],
        ['Main web', 'prod', '25:42:34', 'web', 'External'],
        ['dashboard', 'Dev', '76:34:33', 'dboard', 'External'],
        ['main web', 'Dev', '65:25:13', 'web-dev', 'External'],
    ];

    const handleCreateOpen = () => {
        // console.log('new deployment created');
    };

    const options = {
        filterType: 'checkbox',
        responsive: 'standard',
        rowsPerPage: 7,
        selectableRows: 'none',
        fixedHeader: false,
        fixedSelectColumn: false,
        rowsPerPageOptions: [5, 7, 10, 15, 25, 50, 100],
        customSearchRender: (searchText, handleSearch, hideSearch, opt) => {
            return (
                <CustomSearchRender
                    searchText={searchText}
                    onSearch={handleSearch}
                    onHide={hideSearch}
                    options={opt}
                />
            );
        },
        searchPlaceholder: 'Search Event',
    };

    return (
        <>
            <Grow in style={{ transformOrigin: 'center top' }} timeout={750}>
                <Grid container justify="center" alignItems="center">
                    <Grid
                        item
                        style={{
                            maxHeight: '85vh',
                            overflowY: 'auto',
                            scrollbarWidth: 'none',
                        }}
                        xs={11}
                    >
                        <MUIDataTable
                            title={
                                <TableTitle
                                    title="Add Deployment"
                                    addAction={handleCreateOpen}
                                />
                            }
                            data={data}
                            columns={columns}
                            options={options}
                            className={classes.tablePaper}
                        />
                    </Grid>
                </Grid>
            </Grow>
        </>
    );

    // events.errMess !== null ? (
    //     <Typography variant="h4" color="textSecondary">
    //         Failed to fetch Events!
    //     </Typography>
    // ) : (

    // return (
    //     <>
    //         <Grid container spacing={}>
    //             {/* <Grid item xs={12}>
    //         <MUIDataTable
    //           title="ACME Employee list"
    //           data={data}
    //           columns={columns}
    //           options={options}
    //         />
    //       </Grid> */}
    //             <Grid item xs={12}>
    //                 <MUIDataTable
    //                     title="Deploy Log"
    //                     data={state.data}
    //                     columns={state.columns}
    //                     options={state.options}
    //                 />
    //             </Grid>
    //             {/* <Grid item xs={12}> */}
    //             <Dialog
    //                 open={state.isNewDeploymentOpen}
    //                 maxWidth="sm"
    //                 onClose={handleNewDeploymentClose}
    //                 scroll="paper"
    //             >
    //                 <DialogTitle>
    //                     {/* <Typography variant="h4" align="center">New Deployment</Typography> */}
    //                     <b>New Deployment</b>
    //                 </DialogTitle>
    //                 <DialogContent>
    //                     <LocalForm
    //                         onSubmit={(values) =>
    //                             handleNewDeploymentSubmit(values)
    //                         }
    //                     >
    //                         <Row className="form-group">
    //                             <Label htmlFor="gitRepo" md={4}>
    //                                 <h6>GitHub Repository:</h6>
    //                             </Label>
    //                             <Col md={8}>
    //                                 <Control.text
    //                                     model=".gitRepo"
    //                                     id="gitRepo"
    //                                     name="gitRepo"
    //                                     placeholder="github repository*"
    //                                     className="form-control"
    //                                 />
    //                             </Col>
    //                         </Row>
    //                         <Row className="form-group">
    //                             <Label htmlFor="serverName" md={4}>
    //                                 <h6>Server Name:</h6>
    //                             </Label>
    //                             <Col md={8}>
    //                                 <Control.text
    //                                     model=".serverName"
    //                                     id="serverName"
    //                                     name="serverName"
    //                                     placeholder="server name*"
    //                                     className="form-control"
    //                                 />
    //                             </Col>
    //                         </Row>
    //                         <Row className="form-group">
    //                             <Label htmlFor="subdomain" md={4}>
    //                                 <h6>Subdomain:</h6>
    //                             </Label>
    //                             <Col md={8}>
    //                                 <Control.text
    //                                     model=".subdomain"
    //                                     id="subdomain"
    //                                     name="subdomain"
    //                                     placeholder="subdomain*"
    //                                     className="form-control"
    //                                 />
    //                             </Col>
    //                         </Row>
    //                         <Row className="form-group">
    //                             <Col md={8}>
    //                                 <FormControl variant="outlined">
    //                                     <InputLabel id="access">
    //                                         Access
    //                                     </InputLabel>
    //                                     <Select
    //                                         labelId="access"
    //                                         id="access"
    //                                         value={state.access}
    //                                         onChange={handleAccessChange}
    //                                     >
    //                                         {/* <MenuItem value="">
    //                       <em>None</em>
    //                     </MenuItem> */}
    //                                         <MenuItem value="Internal">
    //                                             Internal
    //                                         </MenuItem>
    //                                         <MenuItem value="External">
    //                                             External
    //                                         </MenuItem>
    //                                     </Select>
    //                                 </FormControl>
    //                             </Col>
    //                         </Row>
    //                         <Row className="form-group">
    //                             <Col md={8}>
    //                                 <FormControl variant="outlined">
    //                                     <InputLabel id="build">
    //                                         Build
    //                                     </InputLabel>
    //                                     <Select
    //                                         labelId="build"
    //                                         id="build"
    //                                         value={state.build}
    //                                         onChange={handleBuildChange}
    //                                     >
    //                                         {/* <MenuItem value="">
    //                       <em>None</em>
    //                     </MenuItem> */}
    //                                         <MenuItem value="Production">
    //                                             Production
    //                                         </MenuItem>
    //                                         <MenuItem value="Development">
    //                                             Development
    //                                         </MenuItem>
    //                                     </Select>
    //                                 </FormControl>
    //                             </Col>
    //                         </Row>
    //                         <Row className="form-group">
    //                             <Label htmlFor="env" md={12}>
    //                                 <h6>Environment Parameters:</h6>
    //                             </Label>
    //                             <Col md={{ size: 8, offset: 2 }}>
    //                                 <Control.textarea
    //                                     model=".env"
    //                                     id="env"
    //                                     name="env"
    //                                     placeholder="#Specify .env params here"
    //                                     rows="4"
    //                                     className="form-control"
    //                                 />
    //                             </Col>
    //                         </Row>
    //                         <Row className="form-group">
    //                             {/* md={{ size: 4, offset: 3 }} */}
    //                             <Col
    //                                 xs={{ size: 7, offset: 1 }}
    //                                 md={{ size: 4, offset: 3 }}
    //                             >
    //                                 <Button
    //                                     type="submit"
    //                                     variant="outlined"
    //                                     color="primary"
    //                                 >
    //                                     Deploy
    //                                 </Button>
    //                             </Col>
    //                             {/* md={{ size: 2 }} */}
    //                             <Col xs={3} md={{ size: 2 }}>
    //                                 <Button
    //                                     color="primary"
    //                                     variant="outlined"
    //                                     onClick={handleNewDeploymentClose}
    //                                 >
    //                                     Cancel
    //                                 </Button>
    //                             </Col>
    //                         </Row>
    //                     </LocalForm>
    //                 </DialogContent>
    //             </Dialog>
    //             {/* </Grid> */}
    //         </Grid>
    //     </>
    // );
}
