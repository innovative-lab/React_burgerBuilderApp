import React from 'react';
import classes from './Modal.css';
import Auxilary from '../../../hoc/Auxilary';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    return (
        <Auxilary>
            <Backdrop show={props.show} clicked={props.clickedOutside} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',
                    height: props.height
                }}>
                <div>{props.children}</div>
            </div>
        </Auxilary>
    )
}

export default modal;