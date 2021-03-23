import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";

class CRoute extends Component {
    getEctractedJson({ component, crole, role, token, cprivate, actions, ...rest }) {
        return rest
    }
    render() {
        const rest = this.getEctractedJson(this.props)
        const isLoginIn = this.props.token && this.props.token !== ""
        const userRole = this.props.role
        const { component, crole, cprivate } = this.props
        const CComponent = component
        let redirectTo = null
        if (isLoginIn && rest.path === "/login")
            redirectTo = "/"
        else if (!isLoginIn && cprivate)
            redirectTo = "/login"
        else if (isLoginIn && cprivate && crole && crole.filter((item) => item === userRole).length == 0) {
            toast("You are not unauthorized to access this page", { type: toast.TYPE.ERROR, toastId: "unauth" })
            redirectTo = "/login"
        }
        else if (!isLoginIn && rest.path === "/")
        redirectTo = "/login"
        return (
            <Route
                {...rest}
                render={props =>
                    (redirectTo) ?
                        <Redirect to={{pathname:redirectTo,state:{form:props.location}}} /> :
                        <CComponent {...props} />

                }
            />
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.userData.token,
        role: state.auth.userData.role
    }
}
export default connect(mapStateToProps)(CRoute)