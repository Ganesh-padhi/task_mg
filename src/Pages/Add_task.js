import React, { Component } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Multiselect } from "multiselect-react-dropdown";
import axios from "../axios";
import * as actions from "../Store/Actions/index";
import Modal from "../Component/UI/Modal/Modal";
import { checkValidationHandler } from "../Util/FormValidation";
import moment from "moment";


class Add_task extends Component {
    state = {
        controls: {
            title: {
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            description: {
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            start_date: {
                value: "",
                validation: {
                    required: true,
                    isNotPrevDate:true
                },
                valid: false,
                touched: false
            },
            end_date: {
                value: "",
                validation: {
                    required: true,
                    isNotPrevDate:true
                },
                valid: false,
                touched: false
            },
            label: {
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        loading: false,
        options: [],
        selectedUsers: [],
        selectedUserstouch: false
    }

    componentDidMount() {
        if (this.props.allusers) {
            let data = this.props.allusers.map((item) => {
                return ({
                    userName: item.username,
                    id: item._id
                })
            })
            this.setState({ options: data })
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
    onSelect = (selectedList, selectedItem) => {
        this.setState({ selectedUsers: selectedList, selectedUserstouch: true })
    }
    onRemove = (selectedList, removedItem) => {
        this.setState({ selectedUsers: selectedList })
    }

    onSubmit = () => {
        if (this.state.controls.title.touched != true || this.state.controls.description.touched != true || this.state.controls.label.touched != true || this.state.controls.start_date.touched != true || this.state.controls.end_date.touched != true) {
            toast("All field are required", {
                type: toast.TYPE.ERROR,
                toastId: "requiredfield"
            })
        }
        else if (this.state.selectedUsers.length == 0) {
            toast("Please assign user", {
                type: toast.TYPE.ERROR,
                toastId: "requiredfield"
            })
        }
        else if (this.state.controls.start_date.value > this.state.controls.end_date.value) {
            toast("Start date is not great than end date", {
                type: toast.TYPE.ERROR,
                toastId: "datefield"
            })
        }
        else {
            const assignUser = this.state.selectedUsers.map((item) => {
                return { user: item.id }
            })
            const taskData = {
                title: this.state.controls.title.value,
                description: this.state.controls.description.value,
                start_date: this.state.controls.start_date.value,
                end_date: this.state.controls.end_date.value,
                label: this.state.controls.label.value,
                assign_to: assignUser
            }
            axios.post("/task/create", taskData, {
                headers: { Authorization: "Bearer " + this.props.token }
            }).then((res) => {
                if (res.status == 201) {
                    toast("Add task successfully", { type: toast.TYPE.SUCCESS, toastId: "taskfail" })
                }
                this.props.modalClose()
                this.props.onTaskLoad()
            }).catch((error) => {
                toast(error.message, { type: toast.TYPE.ERROR, toastId: "taskfail" })
            })
        }
    }

    render() {
        let style = { textColor: "red", border: "1px solid red", height: "45px" }
        return (

            <Modal show closemodal={this.props.modalClose} title="Add Task" Submit={this.onSubmit}>
                <form action="" style={{ fontSize: '15px' }} method="post" encType="multipart/form-data" className="form-horizontal">
                    <div className="row form-group">
                        <div className="col col-md-3">
                            <label htmlFor="text-input" className=" form-control-label">Title</label>
                        </div>
                        <div className="col-12 col-md-9">
                            <input type="text" id="text-input" style={this.state.controls.title.valid == false && this.state.controls.title.touched == true ? style : {}} name="text-input" onChange={(e) => this.onChangeHandler(e, 'title')} value={this.state.controls.title.value} placeholder="Title" className="form-control" />
                            {this.state.controls.title.valid == false && this.state.controls.title.touched == true ? <label style={{ color: 'red', fontSize: "15px" }}>Title is require</label> : null}
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col col-md-3">
                            <label htmlFor="textarea-input" className=" form-control-label">Description</label>
                        </div>
                        <div className="col-12 col-md-9">
                            <textarea name="textarea-input" id="textarea-input" defaultValue={this.state.controls.description.value} rows="6" style={this.state.controls.description.valid == false && this.state.controls.description.touched == true ? style : {}} placeholder="Content..." onChange={(e) => this.onChangeHandler(e, 'description')} className="form-control"></textarea>
                            {this.state.controls.description.valid == false && this.state.controls.description.touched == true ? <label style={{ color: 'red', fontSize: "15px" }}>Description is require</label> : null}
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col col-md-3">
                            <label htmlFor="text-input" className=" form-control-label">Start Date</label>
                        </div>
                        <div className="col-12 col-md-9">
                            <input type="date" id="text-input" style={this.state.controls.start_date.valid == false && this.state.controls.start_date.touched == true ? style : {}} min={moment().format('YYYY-MM-DD')} name="text-input" onChange={(e) => this.onChangeHandler(e, 'start_date')} value={this.state.controls.start_date.value} placeholder="Title" className="form-control" />
                            {this.state.controls.start_date.valid == false && this.state.controls.start_date.touched == true ? <label style={{ color: 'red', fontSize: "15px" }}>Start date is require</label> : null}
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col col-md-3">
                            <label htmlFor="text-input" className=" form-control-label">End Date</label>
                        </div>
                        <div className="col-12 col-md-9">
                            <input type="date" id="text-input" style={this.state.controls.end_date.valid == false && this.state.controls.end_date.touched == true ? style : {}} name="text-input" min={this.state.controls.start_date.value == "" || this.state.controls.start_date.valid == false ? moment().format('YYYY-MM-DD'): this.state.controls.start_date.value} onChange={(e) => this.onChangeHandler(e, 'end_date')} value={this.state.controls.end_date.value} placeholder="Title" className="form-control" />
                            {this.state.controls.end_date.valid == false && this.state.controls.end_date.touched == true ? <label style={{ color: 'red', fontSize: "15px" }}>End date is require</label> : null}
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col col-md-3">
                            <label htmlFor="multiple-select" className=" form-control-label">Multiple select</label>
                        </div>
                        <div className="col col-md-9">
                            <Multiselect className="form-control" options={this.state.options}
                                onSelect={this.onSelect}
                                selectedValues={this.state.selectedUsers} onRemove={this.onRemove} displayValue="userName" />
                            {this.state.selectedUsers.length == 0 && this.state.selectedUserstouch == true ? <label style={{ color: 'red', fontSize: "15px" }}>Please assign user</label> : null}
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col col-md-3">
                            <label htmlFor="select" className=" form-control-label">Select</label>
                        </div>
                        <div className="col-12 col-md-9">
                            <select name="select" id="select" style={this.state.controls.label.valid == false && this.state.controls.label.touched == true ? style : {}} defaultValue={this.state.controls.label.value} onChange={(e) => this.onChangeHandler(e, 'label')} className="form-control">
                                <option value="">Please select Label</option>
                                {
                                    this.props.labels.map((item) => {
                                        return (<option value={item._id} key={item._id}>{item.title}</option>)
                                    })
                                }
                            </select>
                            {this.state.controls.label.valid == false && this.state.controls.label.touched == true ? <label style={{ color: 'red', fontSize: "15px" }}>Label is require</label> : null}
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}
const mapStateToProps = state => {
    return {
        labels: state.label.labelData,
        allusers: state.auth.allUserData,
        token: state.auth.userData.token
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onTaskLoad:()=>dispatch(actions.taskLoad())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Add_task)