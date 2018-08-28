import React, { Component } from 'react';
import Auxilary from '../../hoc/Auxilary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }
    sideDrawerOpenHandler = () => { 
        this.setState({ showSideDrawer: true });
    }
    render() {
        return (
            <Auxilary>
                <Toolbar openSideDrawer={this.sideDrawerOpenHandler} />
                <SideDrawer close={this.sideDrawerClosedHandler} open={this.state.showSideDrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxilary>
        )
    }
}
export default Layout;
