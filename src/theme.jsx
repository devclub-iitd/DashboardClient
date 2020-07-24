import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import * as Utils from './utils';

const { defaultTheme } = Utils;

const theme = createMuiTheme({
    // typography: {
    //     h3: {
    //         [theme.breakpoints.up('md')]: {
    //             fontSize: '2.7849rem',
    //         },
    //     },
    // },
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
        // type: 'dark',
        text: {
            primary: '#fff',
            secondary: '#fff',
        },
        primary: {
            main: '#36d578',
            // light: '#5eb8ff',
            // dark: '#005b9f',
            contrastText: '#fff',
        },
        secondary: {
            main: '#61cdff',
            // light: '#5efc82',
            // dark: '#009624',
            // contrastText: '#fff',
        },
        // contrastThreshold: 3,
        // tonalOffset: 0.2,
        background: {
            default: '#1c1c1e',
            paper: '#3a3a3c',
        },
        // spacing: [0, 4, 8, 16, 32, 64],
    },
    overrides: {
        // MuiCssBaseline: {
        //     '@global': {
        //         '@font-family': [cereal, cerealB],
        //     },
        // },
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
        MuiOutlinedInput: {
            root: {
                backgroundColor: '#1c1c1e',
                // backgroundColor: '#e5e3ea',
                // '& $notchedOutline': {
                // borderColor: '#d8d8d8',
                // borderWidth: '2px',
                // background: '#d8d8d8',
                //     // color: '#8e8e93',
                // },
                '&$focused $notchedOutline': {
                    // borderColor: '#e5e3ea',
                    borderColor: '#8e8e93',
                    // color: '#1c1c1e',
                },
                '&:hover $notchedOutline': {
                    // borderColor: '#e5e3ea',
                    borderColor: '#8e8e93',
                },
                borderRadius: '10px',
                // input: {},
                // '& $label': {
                //     color: '#8e8e93',
                // },
            },
            input: {
                // color: '#1c1c1e',
                color: '#d5d3d3',
                fontWeight: 'bold',
            },
            notchedOutline: {
                borderColor: '#e5e3ea',
                borderWidth: '2px',
                // background: '#1c1c1e',
            },
            // focused: {
            //     notchedOutline: {
            //         borderColor: '#8e8e93',
            //     },
            // },
        },
        MuiFormLabel: {
            root: {
                '&$focused': {
                    // color: '#1c1c1e',
                    color: '#b4b1b9',
                    fontWeight: 600,
                    // paddingLeft: '0.2em',
                    // backgroundColor: '#e5e3ea',
                    // paddingTop: '0.2em',
                    // paddingBottom: '0.2em',
                    // paddingRight: defaultTheme.spacing(5),
                    // borderRadius: '4px',
                    marginLeft: '0px',
                    // textAlign: 'center',
                },
                color: '#b4b1b9',
                fontWeight: 600,
                // letterSpacing: 1,
                // paddingRight: defaultTheme.spacing(5),
                // paddingLeft: '0.2em',
                // backgroundColor: '#e5e3ea',
                // borderRadius: '4px',
                // paddingTop: '0.2em',
                // paddingBottom: '0.2em',
                marginLeft: '0px',
                // textAlign: 'center',
                // fontSize: '0.875rem',
                // fontWeight: 'bold',
            },
        },
        MuiSelect: {
            icon: {
                color: '#8e8e93',
                position: 'relative',
            },
            select: {
                '&$select': {
                    // paddingRight: '1px',
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
        // MUIDataTableHeadRow: {
        //     root: {
        //         // '68': {
        //         //     backgroundColor: '#48484a',
        //         // },
        //         // background: '#fff',
        //         marginBottom: '16px',
        //     },
        //     // marginBottom: '16px',
        // },
        // MuiToolbar: {
        //     root: {
        //         backgroundColor: '#f00',
        //     },
        // },
        // MuiTableHead: {
        //     // ro
        //     root: {
        //         marginBottom: '16px',
        //     },
        //     // row,
        // },
        // MuiTableRow: {
        //     root: {
        //         '&:hover': { backgroundColor: '#48484a' },
        //     },
        //     hover: {
        //         '&:hover': { backgroundColor: '#48484a' },
        //     },
        // },
        MUIDataTable: {
            responsiveScrollMaxHeight: {
                maxHeight: 'auto',
            },
            // tableRoot: {
            //     maxheight: '499px',
            // },
        },
        MUIDataTableToolbar: {
            root: {
                paddingLeft: defaultTheme.spacing(1),
                paddingRight: 0,
                paddingTop: defaultTheme.spacing(1),
            },
            icon: {
                // fontSize: '2.1875rem',
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
                // paddingBottom: 0,
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
                // '&:hover': { backgroundColor: '#48484a' },
            },
        },
        MUIDataTableBodyCell: {
            root: {
                // backgroundColor: 'transparent',
                // paddingBottom: defaultTheme.spacing(1),
                // marginTop: defaultTheme.spacing(1),
                // marginBottom: defaultTheme.spacing(1),
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
            // hover: {
            //     '&$hover': { backgroundColor: '#48484a' },
            //     // backgroundColor: '#48484a',
            // },
            // '&$hover': { backgroundColor: '#48484a' },
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
        // MuiInputBase: {
        //     input: {
        //         color: '#8e8e93',
        //     },
        //     root: {
        //         '&$focused': {
        //             color: '#8e8e93',
        //         },
        //     },
        // },
        // MuiInputLabel: {
        //     root: {
        //         color: '#8e8e93',
        //     },
        //     focused: {
        //         color: '#8e8e93',
        //     },
        // },
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
        // MuiInput: {
        //     input: {
        //         // '&::placeholder': {
        //         //     color: 'black',
        //         // },
        //         color: '#8e8e93',
        //     },
        // },
        // MuiInputBase: {
        //     // input: {
        //     //     backgroundColor: '#d8d8d8',
        //     // },
        //     color: '#8e8e93',
        //     // formControl: {
        //     //     backgroundColor: '#d8d8d8',
        //     // },
        // },
    },
});

const responsiveTheme = responsiveFontSizes(theme);

// correction done to responsiveness of h3 size at 1280px width
// responsiveTheme.typography.h3 = {
//     ...responsiveTheme.typography.h3,
//     '@media (min-width:1280px)': {
//         fontSize: '2.7849rem',
//     },
// };

export default responsiveTheme;
// export default theme;
