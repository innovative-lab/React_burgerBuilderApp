import React from 'react';

import classes from './Spinner.css';

const spinner = (props) => {
    return (
        <div style={{ textAlign: 'center', margin: props.margin }}>
            <div className={classes.LdsHourglass}></div>
        </div>
    )
}

export default spinner;