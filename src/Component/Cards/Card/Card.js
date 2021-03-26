import React from "react";
import { connect } from "react-redux";
import moment from "moment";

const Card = ({ data, labels, allUsers, user }) => {
    const getLabelName = (labelId) => {
        const label = labels.filter((label) => label._id == labelId)[0]
        return (
            <span style={{ backgroundColor: label.color, boxSizing: "border-box", color: "white", padding: '0 7px', borderRadius: '20px' }}>{label.title}</span>
        )
    }

    const getUserimage = () => {
        let postfix = ""
        if (user.role == "user") {
            let base64String = null
            if (user.avatar) {
                base64String = btoa(new Uint8Array(user.avatar.data).reduce(function (data, byte) {
                    return data + String.fromCharCode(byte);
                }, ''));
            }
            return (<>
                <i className="fa">
                    <span title={user.username} style={{ display: "flex" }}>{user.avatar ? <img className="rounded-circle mx-auto d-block" style={{ width: "30px" }} src={"data:image/png;base64," + base64String} alt="Card image cap" /> : <img className="rounded-circle mx-auto d-block" style={{ width: "30px" }} src="assets/images/icon/avatar-01.jpg" alt="Card image cap" />} {(data.assign_to.length > 1) ? `+${data.assign_to.length - 1}` : null}</span></i>
            </>
            )
        }
        if (data.assign_to.length > 1)
            postfix = ",..."
        const userid = data.assign_to[0].user
        const [userData] = allUsers.filter((item) => item._id == userid)
        let base64String = null
        if (userData.avatar) {
            base64String = btoa(new Uint8Array(userData.avatar.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
            }, ''));
        }


        // return (<>
        //     <div style={{ position: 'relative', display: 'inline' }}>
        //             <img style={{
        //                 position: 'absolute',
        //                 left: 0,
        //                 zIndex: 2
        //             }} width="30px" className="rounded-circle mx-auto d-block" src={"data:image/png;base64," + base64String} />
        //             <img style={{
        //                 position: 'absolute',
        //                 left: '20px',
        //                 zIndex: 1
        //             }} width="30px" className="rounded-circle mx-auto d-block" src={"data:image/png;base64," + base64String} />
        //             <img style={{
        //                 position: 'absolute',
        //                 left: '40px',
        //                 zIndex: 0.5
        //             }} width="30px" className="rounded-circle mx-auto d-block" src={"data:image/png;base64," + base64String} />
        //             <span style={{
        //                 position: 'absolute',
        //                 left: '50px',
        //                 fontSize: '15px',
        //                 top: '6px'
        //             }}>+1</span>
        //         {/* <span title={userData.username} style={{ display: "flex" }}>{userData.avatar ? <img className="rounded-circle mx-auto d-block" style={{ width: "30px" }} src={"data:image/png;base64," + base64String} alt="Card image cap" /> : <img className="rounded-circle mx-auto d-block" style={{ width: "30px" }} src="assets/images/icon/avatar-01.jpg" alt="Card image cap" />} {(data.assign_to.length > 1) ? `+${data.assign_to.length - 1}` : null}</span> */}
        //     </div>
        // </>
        // )




        return (<>
            <i className="fa">
                <span title={userData.username} style={{ display: "flex" }}>{userData.avatar ? <img className="rounded-circle mx-auto d-block" style={{ width: "30px" }} src={"data:image/png;base64," + base64String} alt="Card image cap" /> : <img className="rounded-circle mx-auto d-block" style={{ width: "30px" }} src="assets/images/icon/avatar-01.jpg" alt="Card image cap" />} {(data.assign_to.length > 1) ? `+${data.assign_to.length - 1}` : null}</span></i>
        </>
        )
    }

    let Title = data.title
    if (Title.length > 16) {
        Title = Title.substring(0, 16) + "..."
    }
    return (
        <div className="card">
            <div className="card-header" style={{ wordBreak: "break-all", padding: "0.5rem 0.5rem" }} >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h5 className="text-sm-center mt-2 mb-1">{Title}</h5>
                    <div>{getUserimage()}</div></div>
            </div>
            <div className="card-body" style={{ minWidth: "217px", padding: "0.5rem 0.5rem" }}>
                <div className="mx-auto d-block">
                    <div className="location text-sm-center" style={{ wordBreak: "break-all" }}>
                        <label style={{ fontSize: "15px" }}>{moment(data.start_date).format('YYYY-MM-DD') + " - " + moment(data.end_date).format('YYYY-MM-DD')}</label><br />
                        {getLabelName(data.label)}<br />
                        Description : {data.description}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        labels: state.label.labelData,
        allUsers: state.auth.allUserData,
        user: state.auth.userData
    }
}
export default connect(mapStateToProps)(Card)