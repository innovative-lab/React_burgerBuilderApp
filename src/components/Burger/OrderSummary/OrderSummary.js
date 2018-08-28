import React from 'react';
import Auxilary from '../../../hoc/Auxilary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const orderSummary = Object.keys(props.orderSummary).map(igKeys => {
        return {
            key: igKeys,
            value: props.orderSummary[igKeys]
        }
    })
    return (
        <Auxilary>
            <h3>Order Summary</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {
                    orderSummary.map((order, i) => {
                        return < li key={order.key + i} > {order.key} : {order.value}</li>
                    })
                }
            </ul>
            <Button clicked={props.cancelOrder} btnType="Danger">Cancel</Button>
            <Button clicked={props.confirmOrder} btnType="Success">Continue</Button>
        </Auxilary >
    )
}

export default orderSummary;