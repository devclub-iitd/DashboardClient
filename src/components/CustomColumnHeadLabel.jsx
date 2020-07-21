import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

export default function ColumnHeadLabel({ name }) {
    return (
        <Typography key={name} variant="h5" style={{ fontWeight: 500 }}>
            {name}
        </Typography>
    );
}

ColumnHeadLabel.propTypes = {
    name: PropTypes.string.isRequired,
};
