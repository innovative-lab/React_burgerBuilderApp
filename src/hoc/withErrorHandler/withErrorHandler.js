import React, { Component } from 'react';

import Auxilary from "../Auxilary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.reqIntreceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            this.resIntreceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            })
        }
        componentWillUnMount() {
            axios.interceptors.response.eject(this.resIntreceptor);
            axios.interceptors.request.eject(this.reqIntreceptor);
        }
        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }
        render() {
            return (
                <Auxilary>
                    <Modal
                        clickedOutside={this.errorConfirmedHandler}
                        show={this.state.error}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxilary>
            )
        }
    }
}

export default withErrorHandler;