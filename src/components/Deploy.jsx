import React, { Component } from 'react';
import {
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Fab,
    Button,
    IconButton,
    Tooltip,
    TextField,
} from '@material-ui/core';
import { Row, Col, Label } from 'reactstrap';
import AddIcon from '@material-ui/icons/Add';
import { LocalForm, Control } from 'react-redux-form';
import MUIDataTable from 'mui-datatables';
import EditIcon from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';
import RestoreIcon from '@material-ui/icons/Restore';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { FastForward } from '@material-ui/icons';

class DeployManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                'S.No.',
                'Repo',
                'Build',
                {
                    name: 'Uptime',
                    options: {
                        filter: false,
                    },
                },
                'Subdomain',
                'Access',
                {
                    name: 'Edit Env',
                    options: {
                        filter: false,
                        sort: false,
                        customBodyRender: (index) => (
                            <IconButton
                                variant="outlined"
                                color="secondary"
                                component="span"
                            >
                                <EditIcon fontSize="small" color="secondary" />
                            </IconButton>
                        ),
                    },
                },
                {
                    name: 'Get Logs',
                    options: {
                        filter: false,
                        sort: false,
                        customBodyRender: (index) => (
                            <IconButton
                                variant="outlined"
                                color="secondary"
                                component="span"
                            >
                                <GetAppIcon
                                    fontSize="small"
                                    color="secondary"
                                />
                            </IconButton>
                        ),
                    },
                },
                {
                    name: 'Redeploy',
                    options: {
                        filter: false,
                        sort: false,
                        customBodyRender: (index) => (
                            <IconButton
                                variant="outlined"
                                color="primary"
                                component="span"
                            >
                                <RestoreIcon fontSize="small" color="primary" />
                            </IconButton>
                        ),
                    },
                },
                {
                    name: 'Stop',
                    options: {
                        filter: false,
                        sort: false,
                        customBodyRender: (index) => (
                            <IconButton
                                variant="outlined"
                                color="error"
                                component="span"
                            >
                                <PowerSettingsNewIcon
                                    fontSize="small"
                                    color="error"
                                />
                            </IconButton>
                        ),
                    },
                },
            ],
            data: [
                [1, 'Yearbook', 'Dev', '25:06:02', 'yearbook', 'External'],
                [2, 'Yearbook', 'prod', '46:34:34', 'yearbook', 'External'],
                [3, 'Main web', 'prod', '25:42:34', 'web', 'External'],
                [4, 'dashboard', 'Dev', '76:34:33', 'dboard', 'External'],
                [5, 'main web', 'Dev', '65:25:13', 'web-dev', 'External'],
            ],
            options: {
                filterType: 'checkbox',
                rowsPerPage: 5,
            },
            access: 'Internal',
            build: 'Development',
            isNewDeploymentOpen: false,
        };

        this.handleNewDeploymentClose = this.handleNewDeploymentClose.bind(
            this
        );
        this.handleNewDeploymentOpen = this.handleNewDeploymentOpen.bind(this);
        this.handleNewDeploymentSubmit = this.handleNewDeploymentSubmit.bind(
            this
        );
        this.handleAccessChange = this.handleAccessChange.bind(this);
        this.handleBuildChange = this.handleBuildChange.bind(this);
    }

    handleNewDeploymentOpen = () => {
        this.setState({
            ...this.state,
            isNewDeploymentOpen: true,
        });
    };

    handleNewDeploymentClose = () => {
        this.setState({
            ...this.state,
            isNewDeploymentOpen: false,
        });
    };

    handleAccessChange = (event) => {
        this.setState({
            ...this.state,
            access: event.target.value,
        });
    };

    handleBuildChange = (event) => {
        this.setState({
            ...this.state,
            build: event.target.value,
        });
    };

    handleNewDeploymentSubmit = (values) => {
        // const newValues = { ...values };
        const newDeploy = {
            ...values,
            access: this.state.access,
            build: this.state.build,
        };
        // console.log('Creating new deployment: ', newDeploy);
        this.handleNewDeploymentClose();
    };

    handleClick = () => {
        console.log('clicked on icon!');
    };

    render() {
        const columns = [
            {
                name: 'Name',
                options: {
                    filter: true,
                    display: 'excluded',
                    setCellHeaderProps: (value) => ({
                        style: { textDecoration: 'underline' },
                    }),
                },
            },
            {
                name: 'Title',
                options: {
                    filter: true,
                    setCellHeaderProps: (value) => ({
                        style: { fontWeight: 'bold' },
                    }),
                },
            },
            {
                name: 'Location',
                options: {
                    filter: false,
                },
            },
            {
                name: 'Age',
                options: {
                    filter: true,
                },
            },
            {
                name: 'Salary',
                options: {
                    filter: true,
                    sort: false,
                },
            },
            {
                name: 'Salary1',
                options: {
                    filter: true,
                    sort: false,
                },
            },
            {
                name: 'Salary2',
                options: {
                    filter: true,
                    sort: false,
                },
            },
        ];

        const data = [
            [
                'Gabby George',
                'Business Analyst',
                'Minneapolis',
                30,
                '$100,000',
                '$100,000',
                '$100,000',
            ],
            [
                'Aiden Lloyd',
                'Business Consultant',
                'Dallas',
                55,
                '$200,000',
                '$200,000',
                '$200,000',
            ],
            [
                'Jaden Collins',
                'Attorney',
                'Santa Ana',
                27,
                '$500,000',
                '$500,000',
                '$500,000',
            ],
            [
                'Franky Rees',
                'Business Analyst',
                'St. Petersburg',
                22,
                '$50,000',
                '$50,000',
                '$50,000',
            ],
            [
                'Aaren Rose',
                'Business Consultant',
                'Toledo',
                28,
                '$75,000',
                '$75,000',
                '$75,000',
            ],
            [
                'Blake Duncan',
                'Business Management Analyst',
                'San Diego',
                65,
                '$94,000',
                '$94,000',
                '$94,000',
            ],
            [
                'Frankie Parry',
                'Agency Legal Counsel',
                'Jacksonville',
                71,
                '$210,000',
                '$210,000',
                '$210,000',
            ],
            [
                'Lane Wilson',
                'Commercial Specialist',
                'Omaha',
                19,
                '$65,000',
                '$65,000',
                '$65,000',
            ],
            [
                'Robin Duncan',
                'Business Analyst',
                'Los Angeles',
                20,
                '$77,000',
                '$77,000',
                '$77,000',
            ],
            [
                'Mel Brooks',
                'Business Consultant',
                'Oklahoma City',
                37,
                '$135,000',
                '$135,000',
                '$135,000',
            ],
            [
                'Harper White',
                'Attorney',
                'Pittsburgh',
                52,
                '$420,000',
                '$420,000',
                '$420,000',
            ],
            [
                'Kris Humphrey',
                'Agency Legal Counsel',
                'Laredo',
                30,
                '$150,000',
                '$150,000',
                '$150,000',
            ],
            [
                'Frankie Long',
                'Industrial Analyst',
                'Austin',
                31,
                '$170,000',
                '$170,000',
                '$170,000',
            ],
            [
                'Brynn Robbins',
                'Business Analyst',
                'Norfolk',
                22,
                '$90,000',
                '$90,000',
                '$90,000',
            ],
            [
                'Justice Mann',
                'Business Consultant',
                'Chicago',
                24,
                '$133,000',
                '$133,000',
                '$133,000',
            ],
            [
                'Addison Navarro',
                'Business Management Analyst',
                'New York',
                50,
                '$295,000',
                '$295,000',
                '$295,000',
            ],
            [
                'Jesse Welch',
                'Agency Legal Counsel',
                'Seattle',
                28,
                '$200,000',
                '$200,000',
                '$200,000',
            ],
            [
                'Eli Mejia',
                'Commercial Specialist',
                'Long Beach',
                65,
                '$400,000',
                '$400,000',
                '$400,000',
            ],
            [
                'Gene Leblanc',
                'Industrial Analyst',
                'Hartford',
                34,
                '$110,000',
                '$110,000',
                '$110,000',
            ],
            [
                'Danny Leon',
                'Computer Scientist',
                'Newark',
                60,
                '$220,000',
                '$220,000',
                '$220,000',
            ],
            [
                'Lane Lee',
                'Corporate Counselor',
                'Cincinnati',
                52,
                '$180,000',
                '$180,000',
                '$180,000',
            ],
            [
                'Jesse Hall',
                'Business Analyst',
                'Baltimore',
                44,
                '$99,000',
                '$99,000',
                '$99,000',
            ],
            [
                'Danni Hudson',
                'Agency Legal Counsel',
                'Tampa',
                37,
                '$90,000',
                '$90,000',
                '$90,000',
            ],
            [
                'Terry Macdonald',
                'Commercial Specialist',
                'Miami',
                39,
                '$140,000',
                '$140,000',
                '$140,000',
            ],
            [
                'Justice Mccarthy',
                'Attorney',
                'Tucson',
                26,
                '$330,000',
                '$330,000',
                '$330,000',
            ],
            [
                'Silver Carey',
                'Computer Scientist',
                'Memphis',
                47,
                '$250,000',
                '$250,000',
                '$250,000',
            ],
            [
                'Franky Miles',
                'Industrial Analyst',
                'Buffalo',
                49,
                '$190,000',
                '$190,000',
                '$190,000',
            ],
            [
                'Glen Nixon',
                'Corporate Counselor',
                'Arlington',
                44,
                '$80,000',
                '$80,000',
                '$80,000',
            ],
            [
                'Gabby Strickland',
                'Business Process Consultant',
                'Scottsdale',
                26,
                '$45,000',
                '$45,000',
                '$45,000',
            ],
            [
                'Mason Ray',
                'Computer Scientist',
                'San Francisco',
                39,
                '$142,000',
                '$142,000',
                '$142,000',
            ],
        ];

        const options = {
            filter: true,
            filterType: 'dropdown',
            responsive: 'scrollMaxHeight',
            rowsPerPage: 5,
            rowsPerPageOptions: [5, 7, 10, 15, 25, 50, 100],
            fixedHeaderOptions: {
                xAxis: false,
                yAxis: true,
            },
            // search: false,
            // print: false,
            // download: false,
            // viewColumns: false,
            customToolbar: () => (
                <Tooltip title="custom icon">
                    <IconButton onClick={this.handleClick}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            ),
            // customSearchRender: (searchText, handleSearch, hideSearch, options) => (<TextField label="Hi" />),
        };
        return (
            <>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Tooltip title="Add deployment" aria-label="add">
                            <Fab
                                color="secondary"
                                onClick={this.handleNewDeploymentOpen}
                            >
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    </Grid>
                    {/* <Grid item xs={12}>
            <MUIDataTable
              title="ACME Employee list"
              data={data}
              columns={columns}
              options={options}
            />
          </Grid> */}
                    <Grid item xs={12}>
                        <MUIDataTable
                            title="Deploy Log"
                            data={this.state.data}
                            columns={this.state.columns}
                            options={this.state.options}
                        />
                    </Grid>
                    {/* <Grid item xs={12}> */}
                    <Dialog
                        open={this.state.isNewDeploymentOpen}
                        maxWidth="sm"
                        onClose={this.handleNewDeploymentClose}
                        scroll="paper"
                    >
                        <DialogTitle>
                            {/* <Typography variant="h4" align="center">New Deployment</Typography> */}
                            <b>New Deployment</b>
                        </DialogTitle>
                        <DialogContent>
                            <LocalForm
                                onSubmit={(values) =>
                                    this.handleNewDeploymentSubmit(values)
                                }
                            >
                                <Row className="form-group">
                                    <Label htmlFor="gitRepo" md={4}>
                                        <h6>GitHub Repository:</h6>
                                    </Label>
                                    <Col md={8}>
                                        <Control.text
                                            model=".gitRepo"
                                            id="gitRepo"
                                            name="gitRepo"
                                            placeholder="github repository*"
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="serverName" md={4}>
                                        <h6>Server Name:</h6>
                                    </Label>
                                    <Col md={8}>
                                        <Control.text
                                            model=".serverName"
                                            id="serverName"
                                            name="serverName"
                                            placeholder="server name*"
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="subdomain" md={4}>
                                        <h6>Subdomain:</h6>
                                    </Label>
                                    <Col md={8}>
                                        <Control.text
                                            model=".subdomain"
                                            id="subdomain"
                                            name="subdomain"
                                            placeholder="subdomain*"
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={8}>
                                        <FormControl variant="outlined">
                                            <InputLabel id="access">
                                                Access
                                            </InputLabel>
                                            <Select
                                                labelId="access"
                                                id="access"
                                                value={this.state.access}
                                                onChange={
                                                    this.handleAccessChange
                                                }
                                            >
                                                {/* <MenuItem value="">
                          <em>None</em>
                        </MenuItem> */}
                                                <MenuItem value="Internal">
                                                    Internal
                                                </MenuItem>
                                                <MenuItem value="External">
                                                    External
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={8}>
                                        <FormControl variant="outlined">
                                            <InputLabel id="build">
                                                Build
                                            </InputLabel>
                                            <Select
                                                labelId="build"
                                                id="build"
                                                value={this.state.build}
                                                onChange={
                                                    this.handleBuildChange
                                                }
                                            >
                                                {/* <MenuItem value="">
                          <em>None</em>
                        </MenuItem> */}
                                                <MenuItem value="Production">
                                                    Production
                                                </MenuItem>
                                                <MenuItem value="Development">
                                                    Development
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="env" md={12}>
                                        <h6>Environment Parameters:</h6>
                                    </Label>
                                    <Col md={{ size: 8, offset: 2 }}>
                                        <Control.textarea
                                            model=".env"
                                            id="env"
                                            name="env"
                                            placeholder="#Specify .env params here"
                                            rows="4"
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    {/* md={{ size: 4, offset: 3 }} */}
                                    <Col
                                        xs={{ size: 7, offset: 1 }}
                                        md={{ size: 4, offset: 3 }}
                                    >
                                        <Button
                                            type="submit"
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Deploy
                                        </Button>
                                    </Col>
                                    {/* md={{ size: 2 }} */}
                                    <Col xs={3} md={{ size: 2 }}>
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            onClick={
                                                this.handleNewDeploymentClose
                                            }
                                        >
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </DialogContent>
                    </Dialog>
                    {/* </Grid> */}
                </Grid>
            </>
        );
    }
}

export default DeployManager;
