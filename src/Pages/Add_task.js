import React, { Component } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import moment from "moment";
//import sharp from "sharp";
import { Multiselect } from "multiselect-react-dropdown";
import axios from "../axios";
import * as actions from "../Store/Actions/index";
import Modal from "../Component/UI/Modal/Modal";
import { checkValidationHandler } from "../Util/FormValidation";


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
                },
                valid: false,
                touched: false
            },
            start_date: {
                value: "",
                validation: {
                    required: true,
                    isNotPrevDate: true
                },
                valid: false,
                touched: false
            },
            end_date: {
                value: "",
                validation: {
                    required: true,
                    isNotPrevDate: true
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
        selectedUserstouch: false,
        image: "",
        prevImage: ""
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
        if (this.props.operation == "update" && this.state.controls.title.value == "") {
            this.onUpdateHandler()
        }
    }

    onUpdateHandler = () => {

        const id = this.props.id
        const [data] = this.props.tasks.filter((item) => item._id == id)
        let optionData = this.props.allusers.map((item) => {
            return ({
                userName: item.username,
                id: item._id
            })
        })
        const alreadySeletedUsers = data.assign_to.map((user) => {
            return optionData.find((item) => item.id == user.user)
        })

        let base64String = ""
        if (data.task_image) {
            base64String = btoa(new Uint8Array(data.task_image.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
            }, ''));
        }

        const updatedList = {
            ...this.state.controls,
            title: {
                ...this.state.controls.title,
                value: data.title
            },
            description: {
                ...this.state.controls.description,
                value: data.description
            },
            start_date: {
                ...this.state.controls.start_date,
                value: moment(data.start_date).format('YYYY-MM-DD')
            },
            end_date: {
                ...this.state.controls.end_date,
                value: moment(data.end_date).format('YYYY-MM-DD')
            },
            label: {
                ...this.state.controls.label,
                value: data.label
            }
        }
        this.setState({ controls: updatedList, selectedUsers: alreadySeletedUsers, prevImage: base64String })
    }

    onFileChange = async (event) => {
        const files = event.target.files
        this.setState({ image: files[0] })
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
        if (this.props.operation!="update" && (this.state.controls.title.touched != true || this.state.controls.label.touched != true || this.state.controls.start_date.touched != true || this.state.controls.end_date.touched != true)) {
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
            const formData = new FormData()
            formData.append("image", this.state.image)
            formData.append('title', this.state.controls.title.value)
            formData.append('description', this.state.controls.description.value)
            formData.append('start_date', this.state.controls.start_date.value)
            formData.append('end_date', this.state.controls.end_date.value)
            formData.append('label', this.state.controls.label.value)
            formData.append('assign_to', JSON.stringify(assignUser))
            let url="/task/create"
            if(this.props.operation=="update"){
                url="/task/edit/"+this.props.id
            }
            axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data', Authorization: "Bearer " + this.props.token } }).then((res) => {
                if (res.status == 201) {
                    let msg="Add task successfully"
                    if(this.props.operation=="update"){
                        msg="Update task successfully"
                    }
                    toast(msg, { type: toast.TYPE.SUCCESS, toastId: "taskfail" })
                }
                this.props.modalClose()
                this.props.onTaskLoad("","admin")
            }).catch((error) => {
                toast(error.message, { type: toast.TYPE.ERROR, toastId: "taskfail" })
            })
        }
    }

    render() {
        let style = { textColor: "red", border: "1px solid red", height: "45px" }
        return (

            <Modal show closemodal={this.props.modalClose} btnTitle={this.props.btnTitle} title={this.props.operation == "update" ? "Update Task" : "Add Task"} Submit={this.onSubmit}>
                <form action="" style={{ fontSize: '15px' }} method="post" encType="multipart/form-data" className="form-horizontal">
                    <div className="row form-group">
                        <div className="col col-md-3">
                            <label htmlFor="text-input" className=" form-control-label">Title <span style={{ color: "red" }}>*</span></label>
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
                            <textarea name="textarea-input" id="textarea-input" defaultValue={this.state.controls.description.value} rows="6" placeholder="Content..." onChange={(e) => this.onChangeHandler(e, 'description')} className="form-control"></textarea>
                        </div>
                    </div>
                    {(this.props.operation == "update" && this.state.prevImage != "") ?
                        (<div className="row form-group">
                            <div className="col col-md-3"></div>
                            <div className="col-12 col-md-9">
                                <img src={"data:image/png;base64," + this.state.prevImage} alt="task_image" style={{ width: '250px', height: '250px' }} />
                            </div>
                        </div>) : null}
                    <div className="row form-group">
                        <div className="col col-md-3">
                            <label htmlFor="textarea-input" className=" form-control-label">Upload Image</label>
                        </div>
                        <div className="col-12 col-md-9">
                            <input type="file" name="image" id="image" placeholder="Content..." onChange={(e) => this.onFileChange(e)} className="form-control" />
                            {/* {this.state.controls.description.valid == false && this.state.controls.description.touched == true ? <label style={{ color: 'red', fontSize: "15px" }}>Description is require</label> : null} */}
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col col-md-3">
                            <label htmlFor="text-input" className=" form-control-label">Start Date<span style={{ color: "red" }}>*</span></label>
                        </div>
                        <div className="col-12 col-md-9">
                            <input type="date" id="text-input" style={this.state.controls.start_date.valid == false && this.state.controls.start_date.touched == true ? style : {}} min={moment().format('YYYY-MM-DD')} name="text-input" onChange={(e) => this.onChangeHandler(e, 'start_date')} value={this.state.controls.start_date.value} placeholder="Title" className="form-control" />
                            {this.state.controls.start_date.valid == false && this.state.controls.start_date.touched == true ? <label style={{ color: 'red', fontSize: "15px" }}>Start date is require</label> : null}
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col col-md-3">
                            <label htmlFor="text-input" className=" form-control-label">End Date<span style={{ color: "red" }}>*</span></label>
                        </div>
                        <div className="col-12 col-md-9">
                            <input type="date" id="text-input" style={this.state.controls.end_date.valid == false && this.state.controls.end_date.touched == true ? style : {}} name="text-input" min={this.state.controls.start_date.value == "" || this.state.controls.start_date.valid == false ? moment().format('YYYY-MM-DD') : this.state.controls.start_date.value} onChange={(e) => this.onChangeHandler(e, 'end_date')} value={this.state.controls.end_date.value} placeholder="Title" className="form-control" />
                            {this.state.controls.end_date.valid == false && this.state.controls.end_date.touched == true ? <label style={{ color: 'red', fontSize: "15px" }}>End date is require</label> : null}
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col col-md-3">
                            <label htmlFor="multiple-select" className=" form-control-label">Assignees<span style={{ color: "red" }}>*</span></label>
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
                            <label htmlFor="select" className=" form-control-label">Select Task Status<span style={{ color: "red" }}>*</span></label>
                        </div>
                        <div className="col-12 col-md-9">
                            <select name="select" id="select" style={this.state.controls.label.valid == false && this.state.controls.label.touched == true ? style : {}} value={this.state.controls.label.value} onChange={(e) => this.onChangeHandler(e, 'label')} className="form-control">
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
        tasks: state.task.tasks,
        token: state.auth.userData.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTaskLoad: (userId,role) => dispatch(actions.taskLoad(userId,role))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Add_task)