import * as actionType from "./actionType";
import axios from "../../axios";

export const loginSuccess = (userData) => {
  return {
    type: actionType.LOGIN_SUCCESS,
    userData
  }
}

export const loginStart = () => {
  return {
    type: actionType.LOGIN_START
  }
}

export const loginFail = (error) => {
  return {
    type: actionType.LOGIN_FAIL,
    error
  }
}

export const logout = () => {
  return {
    type: actionType.LOGOUT
  }
}

export const fetchAllUserData = (allUserData) => {
  return {
    type: actionType.FETCH_ALL_USER,
    allUserData
  }
}

export const fetchListUser=()=>{
  return dispatch=>{
    axios.get("/user/all").then((res) => {
          dispatch(fetchAllUserData(res.data))
    }).catch((error) => {
      dispatch(loginFail(error.response))
    })
  }
}


export const onLogin = (email, password, role) => {
  return dispatch => {
    const loginData = {
      email,
      password
    }
    dispatch(loginStart())
    axios.post("/user/login", loginData).then((res) => {
      const data = res.data
      if (role != data.is_admin) {
        dispatch(loginFail("Login failed"))
      }
      else {
        data.role=data.is_admin==1?"admin":"user"
        dispatch(loginSuccess(data))
        // if(data.is_admin==1)
        // {
        //   dispatch(fetchListUser())
        // }
        dispatch(fetchListUser())
      }
    }).catch((error) => {
      dispatch(loginFail(error.response.data))
    })
  }
}