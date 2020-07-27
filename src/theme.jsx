import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import * as Utils from './utils';

const { defaultTheme } = Utils;

const theme = createMuiTheme({
    breakpoints: {
        keys: ['xs', 'sm', 'md', 'lg', 'drawerMin', 'xl'],
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            drawerMin: 1580,
            xl: 1920,
        },
    },
    typography: {
        fontFamily: [
            'Cereal',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        text: {
            primary: '#fff',
            secondary: '#fff',
        },
        primary: {
            main: '#36d578',
            contrastText: '#fff',
        },
        secondary: {
            main: '#61cdff',
        },
        background: {
            default: '#1c1c1e',
            paper: '#3a3a3c',
        },
    },
    overrides: {
        MuiAvatar: {
            fallback: {
                color: '#fff',
            },
        },
        MuiPaper: {
            rounded: {
                borderRadius: '20px',
            },
        },
        MuiButton: {
            root: {
                borderRadius: '35.5px',
            },
        },
        MuiTooltip: {
            tooltip: {
                fontSize: defaultTheme.typography.body1.fontSize,
            },
        },
        MuiOutlinedInput: {
            root: {
                backgroundColor: '#1c1c1e',
                '&$focused $notchedOutline': {
                    borderColor: '#8e8e93',
                },
                '&:hover $notchedOutline': {
                    borderColor: '#8e8e93',
                },
                borderRadius: '10px',
            },
            input: {
                color: '#d5d3d3',
                fontWeight: 'bold',
            },
            notchedOutline: {
                borderColor: '#e5e3ea',
                borderWidth: '2px',
            },
        },
        MuiFormLabel: {
            root: {
                '&$focused': {
                    color: '#b4b1b9',
                    fontWeight: 600,
                    marginLeft: '0px',
                },
                color: '#b4b1b9',
                fontWeight: 600,
                marginLeft: '0px',
            },
        },
        MuiFormControlLabel: {
            label: {
                fontWeight: 500,
            },
        },
        MuiSelect: {
            icon: {
                color: '#8e8e93',
                position: 'relative',
            },
            select: {
                '&$select': {
                    fontSize: defaultTheme.typography.h6.fontSize,
                    fontWeight: 500,
                    marginRight: '-30px',
                    marginTop: '10px',
                },
            },
        },
        MuiAutocomplete: {
            clearIndicator: {
                color: '#8e8e93',
            },
            popupIndicator: {
                color: '#ffff',
            },
            paper: {
                borderRadius: '10px',
                backgroundColor: '#636366',
                border: '2px solid #1c1c1e',
            },
            tag: {
                fontWeight: 600,
                borderWidth: '2px',
            },
        },
        MuiInputAdornment: {
            root: {
                color: '#3a3a3c',
            },
        },
        MUIDataTable: {
            responsiveScrollMaxHeight: {
                maxHeight: 'auto',
            },
        },
        MUIDataTableToolbar: {
            root: {
                paddingLeft: defaultTheme.spacing(1),
                paddingRight: 0,
                paddingTop: defaultTheme.spacing(1),
            },
            icon: {
                color: '#fff',
            },
        },
        MUIDataTableToolbarSelect: {
            root: {
                borderRadius: '5px',
                paddingTop: 0,
                paddingBottom: 0,
                marginBottom: '5px',
            },
            title: {
                fontWeight: 500,
            },
            iconButton: {
                color: '#fff',
            },
        },
        MuiSvgIcon: {
            root: {
                fontSize: '2.1875rem',
            },
        },
        MUIDataTableHead: {
            main: {
                background: '#48484a',
                borderBottom: `${defaultTheme.spacing(4)}px solid transparent`,
            },
        },
        MUIDataTableHeadCell: {
            root: {
                paddingBottom: 0,
            },
            fixedHeader: {
                backgroundColor: 'transparent',
            },
            data: {
                fontSize: defaultTheme.typography.h5.fontSize,
                fontWeight: 500,
            },
        },
        MUIDataTableBodyRow: {
            root: {
                backgroundColor: '#636366',
                borderBottom: `${defaultTheme.spacing(0.5)}px solid #3a3a3c`,
            },
        },
        MUIDataTableFilterList: {
            root: {
                marginBottom: defaultTheme.spacing(1),
            },
            chip: {
                backgroundColor: '#636366',
                fontWeight: 500,
                color: '#fff',
            },
        },
        MuiTableCell: {
            root: {
                borderBottomColor: 'transparent',
                borderBottomWidth: 0,
            },
        },
        MuiTableRow: {
            root: {
                '&$hover': {
                    '&:hover': {
                        backgroundColor: '#48484a',
                        cursor: 'pointer',
                    },
                },
            },
        },
        MuiIconButton: {
            root: {
                color: '#8e8e93',
                '&$disabled': {
                    color: '#636366',
                },
            },
        },
        MuiTablePagination: {
            caption: {
                fontSize: defaultTheme.typography.h6.fontSize,
                fontWeight: 500,
            },
            selectIcon: {
                color: '#fff',
            },
        },
        MuiSnackbarContent: {
            root: {
                backgroundColor: '#e5e3ea',
                borderRadius: '10px',
                fontWeight: 'bold',
                fontSize: '1rem',
                textAlign: 'center',
                width: 'auto',
            },
            message: {
                width: '100%',
            },
        },
        MuiLink: {
            root: {
                color: '#49ceeb',
                fontWeight: 500,
                '&:hover': {
                    color: '#49ceeb',
                },
            },
        },
    },
});

const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
