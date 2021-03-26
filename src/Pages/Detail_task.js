import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
import Layout from "../Component/Layout/Layout";
import * as actions from "../Store/Actions/index";
import axios from "../axios"
import Update_task from "../Pages/Add_task";
import ConfirmModal from "../Component/UI/ConfirmModal/ConfirmModal";

const Detail_task = props => {
    const id = props.location.search.substring(1).split("=")[1]
    const [data] = props.tasks.filter((item) => item._id == id)
    const [isShowBtn, setIsShowBtn] = useState(false)
    const [label, setLabel] = useState(data.label)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [isDeleteTaskModal, setIsDeleteTaskModal] = useState(false)
    const [isUpdateStatusModal, setIsUpdateStatusModal] = useState(false)


    const onModalHandeler = () => {
        setIsUpdateModalOpen(!isUpdateModalOpen)
    }
    const onDeleteTaskModalHandeler = () => {
        setIsDeleteTaskModal(!isDeleteTaskModal)
    }
    const onUpdateStatusModalHandeler = () => {
        if(isUpdateStatusModal==true)
        {
            document.getElementById("selectLabel").value = data.label
            setLabel(data.label)
        }
        setIsUpdateStatusModal(!isUpdateStatusModal)
    }
    const onChangeLabel = (event) => {
        setLabel(event.target.value)
        setIsShowBtn(true)
    }
    const getLabelName = (labelId) => {
        const label = props.labels.filter((label) => label._id == labelId)[0]
        return (
            <span style={{ backgroundColor: label.color, boxSizing: "border-box", color: "white", padding: '0 7px', borderRadius: '20px' }}>{label.title}</span>
        )
    }

    const onDeleteHandeler = () => {
        axios.delete("/task/delete/" + id).then((res) => {
            if (res.status == 200) {
                props.onTaskLoad("", "admin")
                props.history.push("/")
                toast("Delete successfully!", { type: toast.TYPE.SUCCESS, toastId: "deleted" })
            }
        }).catch((error) => {
            toast("Delete not success!", { type: toast.TYPE.ERROR, toastId: "deleted" })
        })
    }

    const onShowUser = (userId) => {
        if (props.allUsers) {
            const [data] = props.allUsers.filter((item) => {
                return item._id == userId
            })
            let userBase64String = null
            if (data.avatar) {
                userBase64String = btoa(new Uint8Array(data.avatar.data).reduce(function (data, byte) {
                    return data + String.fromCharCode(byte);
                }, ''));
            }
            return (
                <div >
                    <i className="fa">
                        {data.avatar ? <img className="rounded-circle mx-auto d-block" style={{ width: "20px" }} src={"data:image/png;base64," + userBase64String} alt="Card image cap" /> : <img className="rounded-circle mx-auto d-block" style={{ width: "20px" }} src="assets/images/icon/avatar-01.jpg" alt="Card image cap" />}</i>
                    <strong className="card-title pl-2" >{data.username}</strong>
                </div>
            )
        }
        return null
    }

    useState(() => {
        //document.body.style.overflow="hidden"
    })

    const onBtnUpdate = () => {
        let user = ""
        if (props.userData.role == "user") {
            user = props.userData._id
        }
        props.onStatuUpdate(id, label, user, props.userData.role)
        setIsUpdateStatusModal(false)
        toast("Task status update successfully!",{type:toast.TYPE.SUCCESS,toastId:"updateStatus"})
    }


    let base64String = null
    if (data.task_image) {
        base64String = btoa(new Uint8Array(data.task_image.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));
    }
    return (
        <Layout>
            {isDeleteTaskModal && <ConfirmModal show title="Close task" content="Are you sure you want to close task?" confirm={onDeleteHandeler} closemodal={onDeleteTaskModalHandeler} />}
            {isUpdateStatusModal && <ConfirmModal show title="Update task status" content="Are you sure you want to update task status?" confirm={onBtnUpdate} closemodal={onUpdateStatusModalHandeler} />}
            <div style={{ padding: "10px" }} >
                <div className="section__content section__content--p30">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <strong className="card-title">Detail Task</strong>
                                            {props.userData.role == "admin" ? (<div>
                                                <button type="button" onClick={onModalHandeler} className="btn btn-outline-secondary"><i className="fas fa-pencil-alt"></i></button>&nbsp;
                                                {isUpdateModalOpen && <Update_task btnTitle="Update" modalClose={onModalHandeler} id={id} operation="update" />}
                                                <button type="button" onClick={onDeleteTaskModalHandeler} className="btn btn-outline-danger"><i className="fas fa-trash"></i></button>
                                            </div>) : null}
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <div className="typo-headers">
                                            <h2 className="pb-2 display-5">Title : {data.title}</h2>
                                        </div>

                                        <div className="vue-lists">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <h3 className="mb-3">Description</h3>
                                                    <div className="jumbotron" style={{ backgroundColor: '#f7f7f7' }}>
                                                        {data.description}
                                                    </div>
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
                                                        {base64String != null && <img src={"data:image/png;base64," + base64String} style={{ height: "100%", width: "100%" }} alt="" />}
                                                    </div>
                                                </div>
                                                <div className="col-md-4">

                                                    {props.userData.role != "admin" ? (<><h3>Label :</h3><div style={{ display: "flex" }}><select className="form-control" name="selectLabel" id="selectLabel" onChange={onChangeLabel} defaultValue={label}>
                                                        {props.labels.map((item) => {
                                                            return (<option value={item._id} key={item._id}>{item.title}</option>)
                                                        })}
                                                    </select> &nbsp;&nbsp;&nbsp;
                                                    {isShowBtn && label != data.label && <button type="button" onClick={onUpdateStatusModalHandeler} className="btn btn-primary">Update</button>}</div></>) : null}

                                                    <ul className="vue-ordered">
                                                        {props.userData.role == "admin" ? <li><h4>Lable : {getLabelName(data.label)}</h4></li> : null}
                                                        <li><h4>Start Date : {moment(data.start_date).format('YYYY-MM-DD')}</h4></li>
                                                        <li><h4>End Date : {moment(data.end_date).format('YYYY-MM-DD')}</h4></li>
                                                    </ul>
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
        userData: state.auth.userData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStatuUpdate: (taskId, labelId, userId, role) => dispatch(actions.taskLabelUpdate(taskId, labelId, userId, role)),
        onTaskLoad: (userId, role) => dispatch(actions.taskLoad(userId, role))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail_task)