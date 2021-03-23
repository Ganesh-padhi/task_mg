import React, { Component } from "react";
import { checkValidationHandler } from "../Util/FormValidation";
import { ToastContainer,toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Link,Redirect } from "react-router-dom";
import Spinner from "../Component/UI/Spinner/Spinner";
import * as actions from '../Store/Actions/index';
import axios from "../axios";


class Register extends Component {
    state = {
        controls: {
            fname: {
                value: "",
                validation: {
                    required: true,
                    minlength: 4
                },
                valid: false,
                touched: false
            },
            lname: {
                value: "",
                validation: {
                    required: true,
                    minlength: 4
                },
                valid: false,
                touched: false
            },
            userName: {
                value: "",
                validation: {
                    required: true,
                    minlength: 6
                },
                valid: false,
                touched: false
            },
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
            confirmPassword: {
                value: "",
                validation: {
                    required: true,
                    minlength: 6
                },
                valid: false,
                touched: false
            }
        },
        loading: false
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
        if (this.state.controls.email.touched != true || this.state.controls.password.touched != true || this.state.controls.confirmPassword.touched != true || this.state.controls.lname.touched != true || this.state.controls.fname.touched != true|| this.state.controls.userName.touched != true) {
            toast("All field are require ", {
                type: toast.TYPE.ERROR,
                toastId: "requiredfield"
            })
        }
        else if(this.state.controls.password.touched != this.state.controls.confirmPassword.touched)
        {
            toast("Passwords don't match to confirm Password", {
                type: toast.TYPE.ERROR,
                toastId: "confirmPasswordfield"
            })
        }
        else {
            this.setState({loading:true})
            const registerData={
                first_name: this.state.controls.fname.value,
                last_name:this.state.controls.lname.value,
                username:this.state.controls.userName.value,
                password:this.state.controls.password.value,
                email:this.state.controls.email.value
            }
            console.log(registerData)
            axios.post("/user/register",registerData).then((res)=>{
                console.log(res)
                this.setState({loading:false})
                toast("You successfully register, please verify your email before login", {
                    type: toast.TYPE.SUCCESS,
                    toastId: "successfully"
                })
                this.props.history.push("/login")
            }).catch((error)=>{
                toast(error.response.data,{type: toast.TYPE.ERROR,toastId:"registerfail"})
                this.setState({loading:false})
            })
        }
        //this.props.onLogin(this.state.controls.email.value, this.state.controls.password.value, this.state.controls.role.value)
    }
    render() {
        let style = { textColor: "red", border: "1px solid red", height: "45px" }
        let form = <Spinner />
        if (this.state.loading == false) {
            form = (<>
                <form onSubmit={this.onSubmitHandler} method="post">
                    <div className="form-group">
                        <label>First Name<span style={{ color: "red" }}> *</span></label>
                        <input className="au-input au-input--full" style={this.state.controls.fname.valid == false && this.state.controls.fname.touched == true ? style : {}} type="text" name="fname" onChange={(e) => this.onChangeHandler(e, 'fname')} value={this.state.controls.fname.value} placeholder="First Name" />
                    </div>
                    <div className="form-group">
                        {this.state.controls.fname.valid == false && this.state.controls.fname.touched == true ? <label style={{ color: "red" }}>First name length greater than 4</label> : null}
                    </div>
                    <div className="form-group">
                        <label>Last Name<span style={{ color: "red" }}> *</span></label>
                        <input className="au-input au-input--full" style={this.state.controls.lname.valid == false && this.state.controls.lname.touched == true ? style : {}} type="text" name="lname" onChange={(e) => this.onChangeHandler(e, 'lname')} value={this.state.controls.lname.value} placeholder="Last Name" />
                    </div>
                    <div className="form-group">
                        {this.state.controls.lname.valid == false && this.state.controls.lname.touched == true ? <label style={{ color: "red" }}>Last name length greater than 4</label> : null}
                    </div>
                    <div className="form-group">
                        <label>User Name<span style={{ color: "red" }}> *</span></label>
                        <input className="au-input au-input--full" style={this.state.controls.userName.valid == false && this.state.controls.userName.touched == true ? style : {}} type="text" name="userName" onChange={(e) => this.onChangeHandler(e, 'userName')} value={this.state.controls.userName.value} placeholder="User Name" />
                    </div>
                    <div className="form-group">
                        {this.state.controls.userName.valid == false && this.state.controls.userName.touched == true ? <label style={{ color: "red" }}>User name length greater than 6</label> : null}
                    </div>
                    <div className="form-group">
                        <label>Email Address<span style={{ color: "red" }}> *</span></label>
                        <input className="au-input au-input--full" style={this.state.controls.email.valid == false && this.state.controls.email.touched == true ? style : {}} type="email" name="email" onChange={(e) => this.onChangeHandler(e, 'email')} value={this.state.controls.email.value} placeholder="Email" />
                    </div>
                    <div className="form-group">
                        {this.state.controls.email.valid == false && this.state.controls.email.touched == true ? <label style={{ color: "red" }}>Please provide valid email</label> : null}
                    </div>
                    <div className="form-group">
                        <label>Password<span style={{ color: "red" }}> *</span></label>
                        <input className="au-input au-input--full" type="password" name="password" onChange={(e) => this.onChangeHandler(e, 'password')} style={this.state.controls.password.valid == false && this.state.controls.password.touched == true ? style : {}} value={this.state.controls.password.value} placeholder="Password" />
                    </div>
                    <div className="form-group">
                        {this.state.controls.password.valid == false && this.state.controls.password.touched == true ? <label style={{ color: "red" }}>Password length should be greater than 6</label> : null}
                    </div>
                    <div className="form-group">
                        <label>Confirm Password<span style={{ color: "red" }}> *</span></label>
                        <input className="au-input au-input--full" type="password" name="password" onChange={(e) => this.onChangeHandler(e, 'confirmPassword')} style={this.state.controls.confirmPassword.valid == false && this.state.controls.confirmPassword.touched == true ? style : {}} value={this.state.controls.confirmPassword.value} placeholder="Confirm Password" />
                    </div>
                    <div className="form-group">
                        {this.state.controls.confirmPassword.valid == false && this.state.controls.confirmPassword.touched == true ? <label style={{ color: "red" }}>Password length should be greater than 6</label> : null}
                    </div>

                    {/* <div className="login-checkbox">
                        <label>
                            <input type="checkbox" name="remember" />Remember Me
                                    </label>
                        <label>
                            <a href="#">Forgotten Password?</a>
                        </label>
                    </div> */}
                    <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit">sign up</button>

                </form>
                <div className="register-link">
                    <p>
                        Already you have account?
                                    <Link to="/login">Sign In Here</Link>
                    </p>
                </div>
            </>)
        }
        return (
            <div className="page-wrapper">
                <div className="page-content--bge5" style={{height:"100%"}}>
                    <div className="container">
                        <div className="login-wrap" >
                            <div className="login-content"  >
                                <div className="login-logo">
                                    <a href="#">
                                        <img src="assets/images/icon/logo.png" alt="CoolAdmin" />
                                    </a>
                                </div>
                                <div className="login-form">
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

export default Register