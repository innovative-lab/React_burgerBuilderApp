import React from "react";

import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import classes from "./SideDrawer.css";
import Auxilary from '../../hoc/Auxilary';
import Backdrop from '../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {
    let attachedClass;
    if (props.open) {
        attachedClass = [classes.SideDrawer, classes.Open];
    } else {
        attachedClass = [classes.SideDrawer, classes.Close];
    }
    return (
        <Auxilary>
            <Backdrop clicked={props.close} show={props.open} />
            <div className={attachedClass.join(" ")}>
                <Logo height="11%" />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxilary>
    )
}


export default sideDrawer;