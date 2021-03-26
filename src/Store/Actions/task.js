import * as actionType from "./actionType";
import axios from "../../axios";

export const taskSuccess = (tasks) => {
  return {
    type: actionType.TASK_SUCCESS,
    tasks
  }
}

export const taskStart = () => {
  return {
    type: actionType.TASK_START
  }
}

export const taskChange = () => {
  return {
    type: actionType.TASK_CHANGE
  }
}

export const taskReset = () => {
  return {
    type: actionType.TASK_RESET
  }
}

export const taskFail = (error) => {
  return {
    type: actionType.TASK_FAIL,
    error
  }
}

export const taskSetToEmpty=()=>{
 return{
   type:actionType.TASK_SET_TO_EMPTY
 }
}

export const taskUpdate = (tasks) => {
    return {
      type: actionType.TASK_UPDATE,
      tasks
    }
}

export const taskLoad = (userId,role) => {
  return dispatch => {
    dispatch(taskStart())
    dispatch(taskReset())
    let url="/task/all"
    if(role=="user")
    {
      url="/task/user?id="+userId
    }
    axios.get(url).then((res) => {
      const data=res.data
      if(data.length==0)
      {
        dispatch(taskFail("No data found"))          
      }
        dispatch(taskSuccess(data))
    }).catch((error) => {
      dispatch(taskFail(error))
    })
  }
}

export const onTaskSort=(value,order,userId="")=>{
  return dispatch=>{
    dispatch(taskChange())
    let url="/task/all?sortBy="+value+":"+order
    if(userId)
    {
      url="/task/all?id="+userId+"&sortBy="+value+":"+order
    }
    axios.get(url).then((res) => {
      dispatch(taskSuccess(res.data))
    }).catch((error) => {
      dispatch(taskFail("Sorting is fail"))
    })
  }
}

export const onFetchUserTasks=(userId)=>{
  return dispatch=>{
    dispatch(taskChange())
    axios.get("/task/user?id="+userId).then((res) => {
      dispatch(taskSuccess(res.data))
    }).catch((error) => {
      dispatch(taskFail("Fetch user tasks is fail"))
    })
  }
}

export const onSearchTasks=(value,userId)=>{
  return dispatch=>{
    dispatch(taskChange())
    axios.get("/task/filter?id="+userId+"&search="+value).then((res) => {
      dispatch(taskSuccess(res.data))
    }).catch((error) => {
      dispatch(taskSuccess([]))
      dispatch(taskFail("No data found"))
    })
  }
}


export const taskLabelUpdate = (taskId,labelId,userId,role) => {
  return dispatch => {
    axios.patch("/task/edit_status/"+taskId,{label:labelId}).then((res) => {
        dispatch(taskLoad(userId,role))
    }).catch((error) => {
      dispatch(taskFail(error))
    })
  }
}