import React, { Component } from "react";
import { checkValidationHandler } from "../Util/FormValidation";
import { ToastContainer,toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Spinner from "../Component/UI/Spinner/Spinner";
import * as actions from '../Store/Actions/index';


class Login extends Component {
    state = {
        controls: {
            email: {
                value: "",
                validation: {
                    required: true,
                    minlength: 6,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                value: "",
                validation: {
                    required: true,
                    minlength: 6
                },
                valid: false,
                touched: false
            },
            role: {
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        }
    }
    onChangeHandler = (event, inputkey) => {
        const updatedList = {
            ...this.state.controls,
            [inputkey]: {
                ...this.state.controls[inputkey],
                value: event.target.value,
                valid: checkValidationHandler(event.target.value, this.state.controls[inputkey].validation),
                touched: true
            }
        }
        this.setState({ controls: updatedList })
    }
    onSubmitHandler = (event) => {
        event.preventDefault()
        if(this.state.controls.email.touched!=true || this.state.controls.password.touched!=true || this.state.controls.role.touched!=true)
        {
            toast("All field are require ",{type: toast.TYPE.ERROR,
                toastId:"requiredfield"})
        }
        else
        this.props.onLogin(this.state.controls.email.value, this.state.controls.password.value,this.state.controls.role.value)
    }
    render() {
        let style = { textColor: "red", border: "1px solid red",height:"45px" }
        let form = <Spinner />
        if (this.props.loading == false) {
            form = (<>
                <form onSubmit={this.onSubmitHandler} method="post">
                    <div className="form-group">
                        <label>Email Address<span style={{color:"red"}}> *</span></label>
                        <input className="au-input au-input--full" style={this.state.controls.email.valid == false && this.state.controls.email.touched == true ? style : {}} type="email" name="email" onChange={(e) => this.onChangeHandler(e, 'email')} value={this.state.controls.email.value} placeholder="Email" />
                    </div>
                    <div className="form-group">
                        {this.state.controls.email.valid == false && this.state.controls.email.touched == true ? <label style={{ color: "red" }}>Please provide valid email</label> : null}
                    </div>
                    <div className="form-group">
                        <label>Password<span style={{color:"red"}}> *</span></label>
                        <input className="au-input au-input--full" type="password" name="password" onChange={(e) => this.onChangeHandler(e, 'password')} style={this.state.controls.password.valid == false && this.state.controls.password.touched == true ? style : {}} value={this.state.controls.password.value} placeholder="Password" />
                    </div>
                    <div className="form-group">
                        {this.state.controls.password.valid == false && this.state.controls.password.touched == true ? <label style={{ color: "red" }}>Password length should be greater than 6</label> : null}
                    </div>

                    <div className="form-group">
                        <label>Choose Role<span style={{color:"red"}}> *</span></label>
                        <select className="au-input au-input--full" defaultValue={this.state.controls.role.value}  style={this.state.controls.role.valid == false && this.state.controls.role.touched == true ? style : {height:"45px"}} name="role" onChange={(e) => this.onChangeHandler(e, 'role')}>
                            <option value="">Please select any one</option>
                            <option value="1">Admin</option>
                            <option  value="0">User</option>
                        </select>
                    </div>
                    <div className="form-group">
                        {this.state.controls.role.valid == false && this.state.controls.role.touched == true ? <label style={{ color: "red" }}>Please select role</label> : null}
                    </div>

                    {/* <div className="login-checkbox">
                        <label>
                            <input type="checkbox" name="remember" />Remember Me
                                    </label>
                        <label>
                            <a href="#">Forgotten Password?</a>
                        </label>
                    </div> */}
                    <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit">sign in</button>

                </form>
                <div className="register-link">
                    <p>
                        Don't you have account?
                                    <Link to="/register">Sign Up Here</Link>
                    </p>
                </div>
            </>)
        }
        return (
            <div className="page-wrapper">
                <div className="page-content--bge5">
                    <div className="container">
                        <div className="login-wrap">
                            <div className="login-content">
                                <div className="login-logo">
                                    <a href="#">
                                        <img src="assets/images/icon/logo.png" alt="CoolAdmin" />
                                    </a>
                                </div>
                                <div className="login-form">
                                <div style={{display:"none"}}>{this.props.error!==null && this.props.loading==false?
                                 toast(this.props.error,{type: toast.TYPE.ERROR,toastId:"loginfail"})
                                 :null}</div>
                                    {form}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer/>
            </div>
        )

    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}
const mapDispactToProps = dispatch => {
    return {
        onLogin: (email, password,role) => dispatch(actions.onLogin(email, password,role))
    }
}
export default connect(mapStateToProps, mapDispactToProps)(Login)