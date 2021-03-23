import React from "react";
import { connect } from "react-redux";
import moment from "moment";

const Card = ({ data, labels, allUsers,user }) => {
    const getLabelName = (labelId) => {
        const label = labels.filter((label) => label._id == labelId)[0]
        return (
            <span style={{ backgroundColor: label.color, boxSizing: "border-box", color: "white", padding: '0 7px', borderRadius: '20px' }}>{label.title}</span>
        )
    }

    const getUserimage = () => {
        let postfix =""
        if(user.role=="user")
        {
            return (<>
                <i className="fa">
                    <span title={user.username} style={{display:"flex"}}><img className="rounded-circle mx-auto d-block" style={{ width: "30px" }} src="assets/images/icon/avatar-01.jpg" alt="Card image cap" /> {(data.assign_to.length>1)?`+${data.assign_to.length-1}`:null}</span></i>
               </>
            )    
        }
        if (data.assign_to.length > 1)
            postfix = ",..."
        const userid = data.assign_to[0].user
        const [userData] = allUsers.filter((item) => item._id == userid)
        return (<>
                <i className="fa">
                    <span title={userData.username} style={{display:"flex"}}><img className="rounded-circle mx-auto d-block" style={{ width: "30px" }} src="assets/images/icon/avatar-01.jpg" alt="Card image cap" /> {(data.assign_to.length>1)?`+${data.assign_to.length-1}`:null}</span></i>
               </>
        )
    }

    let Title=data.title
    if(Title.length>35)
    {
        Title=Title.substring(0,35)+"..."
    }
    return (
        <div className="card">
            <div className="card-header" style={{ wordBreak: "break-all",padding:"0.5rem 0.5rem" }} >
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <h5 className="text-sm-center mt-2 mb-1">{Title}</h5>
            <div>{getUserimage()}</div></div>
            </div>
            <div className="card-body" style={{ minWidth: "217px",padding:"0.5rem 0.5rem" }}>
                <div className="mx-auto d-block">
                    <div className="location text-sm-center" style={{ wordBreak: "break-all" }}>
                        <label style={{fontSize:"15px"}}>{moment(data.start_date).format('YYYY-MM-DD')+" - "+moment(data.end_date).format('YYYY-MM-DD')}</label><br />
                        {getLabelName(data.label)}<br/>
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