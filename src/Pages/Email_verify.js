import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation,useHistory } from "react-router-dom";
import axios from "../axios";
import { toast } from "react-toastify";
import Spinner from "../Component/UI/Spinner/Spinner";
const Email = props => {
    const location = useLocation()
    const history=useHistory()
    useEffect(() => {
        const token = location.search.substring(1).split("=")[1]
        axios.get("/email/verify/"+token).
            then((res) => {
                if(res.status==202)
                {
                    toast(res.data,{type:toast.TYPE.SUCCESS,toastId:"verifyEmail"})
                }
                if(res.status==200)
                {
                    toast(res.data,{type:toast.TYPE.INFO,toastId:"verifyEmail"})
                }
            }).catch((error) => {
                toast(error.response.data,{type:toast.TYPE.ERROR,toastId:"verifyEmailfail"})
            })
            history.push("/login")
    });

    return (
        <div style={{alignContent:'center'}}>
            <h1>Please wait for email verification</h1>
            <Spinner/>
        </div>
    )

}
export default Email