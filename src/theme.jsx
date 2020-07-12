import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

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
                // backgroundColor: '#1c1c1e',
                backgroundColor: '#e5e3ea',
                // '& $notchedOutline': {
                // borderColor: '#d8d8d8',
                // borderWidth: '2px',
                // background: '#d8d8d8',
                //     // color: '#8e8e93',
                // },
                '&$focused $notchedOutline': {
                    borderColor: '#e5e3ea',
                    // color: '#1c1c1e',
                },
                '&:hover $notchedOutline': {
                    borderColor: '#e5e3ea',
                },
                borderRadius: '10px',
                // input: {},
                // '& $label': {
                //     color: '#8e8e93',
                // },
            },
            input: {
                color: '#1c1c1e',
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
        MuiSelect: {
            icon: {
                color: '#3a3a3c',
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
        MuiFormLabel: {
            root: {
                '&$focused': {
                    color: '#1c1c1e',
                    fontWeight: 'bold',
                    paddingLeft: '0.2em',
                    backgroundColor: '#e5e3ea',
                    paddingTop: '0.2em',
                    paddingBottom: '0.2em',
                    borderRadius: '4px',
                    // marginLeft: '0',
                    textAlign: 'center',
                },
                color: '#b4b1b9',
                fontWeight: 600,
                letterSpacing: 1,
                paddingLeft: '0.2em',
                backgroundColor: '#e5e3ea',
                borderRadius: '4px',
                paddingTop: '0.2em',
                paddingBottom: '0.2em',
                // marginLeft: '0',
                textAlign: 'center',
                // fontSize: '0.875rem',
                // fontWeight: 'bold',
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
