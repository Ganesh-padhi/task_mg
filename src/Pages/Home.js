import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Layout from "../Component/Layout/Layout";
import * as actions from "../Store/Actions/index";
import Cards from "../Component/Cards/Cards";
import Add_task from "./Add_task";

const Home = props => {
    
    const onSortingChange = () => {
        const order = document.getElementById("sortOrder").value
        const value = document.getElementById("sortValue").value
        let user = props.userData._id
        if (props.userData.role == "admin") {
            user = document.getElementById("sortUser").value
        }
        if (user == "") {
            props.onSortTasks(value, order, "")
        }
        else {
            props.onSortTasks(value, order, user)
        }

    }

    const onFetchTaskOfUser = () => {
        const order = document.getElementById("sortOrder").value
        const value = document.getElementById("sortValue").value
        const search = document.getElementById("Search").value
        let user = ""
        if (props.userData.role == "admin") {
            user = document.getElementById("sortUser").value
        }
        props.onFetchUserTasks(user)

        props.onSortTasks(value, order, user)
        props.onSearchTasks(search, user)
    }

    const onSearchChange = (event) => {
        let user = props.userData._id
        if (props.userData.role == "admin") {
            user = document.getElementById("sortUser").value
        }
        const search = document.getElementById("Search").value

        props.onSearchTasks(search, user)
    }

    const onDragEndHandeler = (result) => {
        if (result.destination != null) {
            if (result.source.droppableId == "done") {
                toast("This task already done", { type: toast.TYPE.INFO, toastId: "doneTask" })
            }
            else if (result.destination.droppableId != result.source.droppableId) {
                let user = props.userData._id
                if (props.userData.role == "admin") {
                    user = document.getElementById("sortUser").value
                }

                const statusId = props.labels.filter((label) => label.title == result.destination.droppableId)[0]._id
                props.onStatuUpdate(result.draggableId, statusId,user,props.userData.role)
            }
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false)

    const onModalCLose = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        const order = document.getElementById("sortOrder").value
        const value = document.getElementById("sortValue").value
        let user = props.userData._id
        if (props.userData.role == "admin") {
            user = document.getElementById("sortUser").value
        }
        const search = document.getElementById("Search").value
        if (props.tasks.length == 0 && search == "" && props.error == null) {
            props.onTaskLoad(props.userData._id, props.userData.role)
            props.onLabelLoad()
            onSortingChange()
        }
        else if (search == "" && user == "" && value == "_id" && order == 1 && props.isDataChange == true) {
            props.onTaskLoad(props.userData._id, props.userData.role)
        }
        else {
            if (props.error) {
                toast(props.error, { type: toast.TYPE.INFO, toastId: "failsearch" })
            }
        }
        if (isModalOpen == true) {
            document.body.style.overflow = 'hidden'
        }
        else {
            document.body.style.overflow = 'auto'
        }
    })

    return (

        <Layout>
            {/* <!-- PAGE CONTENT--> */}
            <div className="page-content--bgf7">
                {/* <!-- BREADCRUMB--> */}
                <section className="au-breadcrumb2">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="au-breadcrumb-content">
                                    <div className="au-breadcrumb-left">
                                        <span className="au-breadcrumb-span">You are here:</span>
                                        <ul className="list-unstyled list-inline au-breadcrumb__list">
                                            <li className="list-inline-item active">
                                                <a href="#">Home</a>
                                            </li>
                                            <li className="list-inline-item seprate">
                                                <span>/</span>
                                            </li>
                                            <li className="list-inline-item">Dashboard</li>
                                        </ul>
                                    </div>
                                    <form className="au-form-icon--sm" action="" method="post">
                                        {/* <input className="au-input--w300 au-input--style2" type="text" placeholder="Search for datas &amp; reports..." />
                                        <button className="au-btn--submit2" type="submit">
                                            <i className="zmdi zmdi-search"></i>
                                        </button> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- END BREADCRUMB--> */}
                {/* <!-- WELCOME--> */}
                <section className="welcome p-t-10">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="title-4">Welcome back
                                <span>&nbsp;{props.userData.username}!</span>

                                    <span style={{ float: "right" }}>
                                        <input className="au-input--w300 au-input--style2" style={{ borderRadius: "7px" }} onChange={onSearchChange} type="text" name="Search" id="Search" placeholder="Search" />
                                        &nbsp;
                                        {props.userData.role == "admin" ? <select className="btn" style={{ padding: " 8px 8px", borderRadius: "7px" }} onChange={onFetchTaskOfUser} name="sortUser" id="sortUser" defaultValue="" >
                                            <option value="" >Select User</option>
                                            {
                                                props.allUsers.map((item) => {
                                                    return (<option key={item._id} value={item._id}>{item.username}</option>)
                                                })
                                            }
                                        </select> : null} &nbsp;
                                            <select className="btn" style={{ padding: " 8px 8px", borderRadius: "7px" }} onChange={onSortingChange} onLoad={onSortingChange} name="sortValue" id="sortValue" defaultValue="_id" >
                                            <option value="_id" >SortBy</option>
                                            <option value="title">Title</option>
                                            <option value="start_date">Start date</option>
                                            <option value="updatedAt">Latest change</option>
                                        </select> &nbsp;
                                            <select className="btn" style={{ padding: " 8px 8px", borderRadius: "7px" }} onChange={onSortingChange} onLoad={onSortingChange} name="sortOrder" id="sortOrder" defaultValue="1">
                                            <option value="-1" >Desc</option>
                                            <option value="1">Asc</option>
                                        </select> &nbsp;
                                        {props.userData.role == "admin" ? <button className="au-btn au-btn-icon au-btn--green au-btn--small" onClick={() => setIsModalOpen(true)} >
                                            <i className="zmdi zmdi-plus"></i>add task</button> : null}
                                    </span>
                                    {isModalOpen && <Add_task modalClose={onModalCLose} btnTitle="Submit" operation="create" />}
                                </h1>

                                <hr className="line-seprate" />
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- END WELCOME--> */}
                {/* <!-- STATISTIC--> */}
                <section className="statistic statistic2">
                    <DragDropContext onDragEnd={onDragEndHandeler}>
                        <div className="container">
                            <div className="row">
                                <Droppable droppableId="ready">
                                    {(provided) => (
                                        <div className="col-md-6 col-lg-3" {...provided.droppableProps} ref={provided.innerRef}>
                                            {/* <!-- TOP CAMPAIGN--> */}
                                            <div className="top-campaign">
                                                <h3 className="title-3 m-b-30">Ready to start</h3>
                                                <hr></hr>

                                                <div className="table-responsive" >
                                                    <table className=" table-top-campaign" >
                                                        {props.tasks != null ? <Cards cardData={props.tasks}  filterdata='ready' cardLabels={props.labels}/> : null}
                                                        {provided.placeholder}
                                                    </table>
                                                </div>

                                            </div>
                                            {/* <!-- END TOP CAMPAIGN--> */}
                                        </div>
                                    )}
                                </Droppable>
                                <Droppable droppableId="process">
                                    {(provided) => (
                                        <div className="col-md-6 col-lg-3" {...provided.droppableProps} ref={provided.innerRef}>
                                            {/* <!-- TOP CAMPAIGN--> */}

                                            <div className="top-campaign" >
                                                <h3 className="title-3 m-b-30">In process</h3>
                                                <hr></hr>
                                                <div className="table-responsive" >
                                                    <table className=" table-top-campaign" >
                                                        {props.tasks != null ? <Cards cardData={props.tasks}  filterdata="process" cardLabels={props.labels}/> : null}
                                                        {provided.placeholder}
                                                    </table>
                                                </div>
                                            </div>
                                            {/* <!-- END TOP CAMPAIGN--> */}
                                        </div>
                                    )}
                                </Droppable>
                                <Droppable droppableId="review">
                                    {(provided) => (
                                        <div className="col-md-6 col-lg-3" {...provided.droppableProps} ref={provided.innerRef}>
                                            {/* <!-- TOP CAMPAIGN--> */}
                                            <div className="top-campaign">
                                                <h3 className="title-3 m-b-30">Require review</h3>
                                                <hr></hr>
                                                <div className="table-responsive">

                                                    <table className=" table-top-campaign" >
                                                        {props.tasks != null ? <Cards cardData={props.tasks}  filterdata='review' cardLabels={props.labels}/> : null}
                                                        {provided.placeholder}
                                                    </table>

                                                </div>
                                            </div>
                                            {/* <!-- END TOP CAMPAIGN--> */}
                                        </div>
                                    )}
                                </Droppable>
                                <Droppable droppableId="done">
                                    {(provided) => (
                                        <div className="col-md-6 col-lg-3" {...provided.droppableProps} ref={provided.innerRef}>
                                            {/* <!-- TOP CAMPAIGN--> */}
                                            <div className="top-campaign">
                                                <h3 className="title-3 m-b-30">Done</h3>
                                                <hr></hr>
                                                <div className="table-responsive">

                                                    <table className=" table-top-campaign f1" >
                                                        {props.tasks != null ? <Cards cardData={props.tasks}  filterdata='done' cardLabels={props.labels}/> : null}
                                                        {provided.placeholder}
                                                    </table>

                                                </div>
                                            </div>
                                            {/* <!-- END TOP CAMPAIGN--> */}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        </div>
                    </DragDropContext>
                </section>
                {/* <!-- END STATISTIC--> */}
            </div>
            <ToastContainer />
        </Layout>
    )
}

const mapStateToProps = state => {
    return {
        tasks: state.task.tasks,
        loading: state.task.loading,
        error: state.task.error,
        labels: state.label.labelData,
        allUsers: state.auth.allUserData,
        isDataChange: state.task.isDataChange,
        userData: state.auth.userData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTaskLoad: (userId, role) => dispatch(actions.taskLoad(userId, role)),
        onTaskUpadate: (tasks) => dispatch(actions.taskUpdate(tasks)),
        onLabelLoad: () => dispatch(actions.onLoadLabel()),
        onStatuUpdate: (taskId, labelId, userId, role) => dispatch(actions.taskLabelUpdate(taskId, labelId, userId, role)),
        onSortTasks: (value, order, userId) => dispatch(actions.onTaskSort(value, order, userId)),
        onFetchUserTasks: (userId) => dispatch(actions.onFetchUserTasks(userId)),
        onSearchTasks: (value, userId) => dispatch(actions.onSearchTasks(value, userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)