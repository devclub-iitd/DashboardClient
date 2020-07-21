/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
    main: {
        display: 'flex',
        flex: '1 0 auto',
    },
    searchText: {
        flex: '0.8 0',
    },
    clearIcon: {
        color: '#fff',
    },
}));

const CustomSearchRender = (props) => {
    const classes = useStyles();
    const { options, onHide, searchText, onSearch } = props;
    const handleTextChange = (event) => {
        onSearch(event.target.value);
    };

    React.useEffect(() => {
        const onKeyDown = (event) => {
            if (event.keyCode === 27) {
                onHide();
            }
        };
        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    }, [onHide]);

    return (
        <Grow appear in timeout={300}>
            <div className={classes.main}>
                <TextField
                    name="search"
                    variant="outlined"
                    value={searchText || ''}
                    onChange={handleTextChange}
                    margin="dense"
                    fullWidth
                    small
                    id="search"
                    label={options.textLabels.toolbar.search}
                />
                <IconButton className={classes.clearIcon} onClick={onHide}>
                    <ClearIcon />
                </IconButton>
            </div>
        </Grow>
    );
};

CustomSearchRender.propTypes = {
    options: PropTypes.object.isRequired,
    onHide: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default CustomSearchRender;
