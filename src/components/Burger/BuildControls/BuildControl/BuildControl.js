import React from 'react';
import classes from './BuildControl.css'

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button
                className={classes.Less}
                onClick={() => props.buildOrder(props.type, 'Less')}
                disabled={props.option == 0}>Less</button>
            <div className={classes.Count}>{props.option}</div>
            <button 
                className={classes.More} 
                onClick={() => props.buildOrder(props.type, 'More')}>More</button>
        </div>
    )
}

export default buildControl;