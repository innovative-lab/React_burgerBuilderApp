import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Meat', type: "meat" },
    { label: 'Salad', type: "salad" },
    { label: 'Bacon', type: "bacon" },
    { label: 'Cheese', type: "cheese" }
];
const buildControls = (props) => (
    <div className={classes.BuildControls} >
        <h3>{props.totalPrice}</h3>
        {
            controls.map((ctrl, i) => {
                return <BuildControl
                    key={ctrl.label + i}
                    type={ctrl.type}
                    label={ctrl.label}
                    buildOrder={props.buildOrder}
                    option={props.itemList[ctrl.type]} />

            })
        }
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>Place Order</button>
    </div>
);

export default buildControls;