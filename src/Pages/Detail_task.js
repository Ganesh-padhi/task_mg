import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import Layout from "../Component/Layout/Layout";
import * as actions from "../Store/Actions/index";

const Detail_task = props => {
    const id = props.location.search.substring(1).split("=")[1]
    const [data] = props.tasks.filter((item) => item._id == id)
    console.log(data)
    const [isShowBtn, setIsShowBtn] = useState(false)
    const [label, setLabel] = useState(data.label)

    const onChangeLabel = (event) => {
        setLabel(event.target.value)
        setIsShowBtn(true)
    }

    const onShowUser = (userId) => {
        if (props.allUsers) {
            const [data] = props.allUsers.filter((item) => {
                return item._id == userId
            })
            console.log(data)
            return (
                <div >
                    <i className="fa">
                        <img className="rounded-circle mx-auto d-block" style={{ width: "20px" }} src="assets/images/icon/avatar-01.jpg" alt="Card image cap" /></i>
                    <strong className="card-title pl-2" >{data.username}</strong>
                </div>
            )
        }
        return null
    }

    useState(() => {
        document.body.style.overflow="hidden"
    })



    let user=""
    if(props.userData.role=="user")
    {
        user=props.userData._id
    }
    return (
        <Layout>
            <div style={{ padding: "10px" }} >
                <div className="section__content section__content--p30">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <strong className="card-title">Detail Task</strong>
                                    </div>

                                    <div className="card-body">
                                        <div className="typo-headers">
                                            <h2 className="pb-2 display-5">Title : {data.title}</h2>
                                        </div>

                                        <div className="vue-lists">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <h3 className="mb-3">Description</h3>
                                                    <div className="jumbotron" style={{backgroundColor:'#f7f7f7'}}>
                                                        {data.description}
                                        `           </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <h3>Users</h3>
                                                    <ul>
                                                        {data.assign_to.map((item) => {
                                                            return (<li key={item._id}>{onShowUser(item.user)}</li>)
                                                        })}
                                                    </ul>
                                                </div>
                                                <div className="col-md-8 text-left">
                                                    <div>
                                                        {/* <h3>Ordered</h3> */}
                                                        <ul className="vue-ordered">
                                                            <li><h4>Start Date : {moment(data.start_date).format('YYYY-MM-DD')}</h4></li>
                                                            <li><h4>End Date : {moment(data.end_date).format('YYYY-MM-DD')}</h4></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <h3>Label :</h3>
                                                    <div style={{ display: "flex" }}><select className="form-control" onChange={onChangeLabel} defaultValue={label}>
                                                        {props.labels.map((item) => {
                                                            return (<option value={item._id} key={item._id}>{item.title}</option>)
                                                        })}
                                                    </select> &nbsp;&nbsp;&nbsp;
                                                    {isShowBtn && label != data.label && <button type="button" onClick={() => props.onStatuUpdate(id, label,user,props.userData.role)} className="btn btn-primary">Update</button>}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Layout>
    )
}

const mapStateToProps = state => {
    return {
        tasks: state.task.tasks,
        labels: state.label.labelData,
        allUsers: state.auth.allUserData,
        userData:state.auth.userData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStatuUpdate: (taskId, labelId, userId, role) => dispatch(actions.taskLabelUpdate(taskId, labelId, userId, role))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail_task)