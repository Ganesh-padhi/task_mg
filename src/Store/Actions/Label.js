import * as actionType from "./actionType";
import axios from "../../axios";

export const labelSuccess = (labelData) => {
  return {
    type: actionType.LABLE_SUCCESS,
    labelData
  }
}


export const labelFail = (error) => {
  return {
    type: actionType.LABEL_FAIL,
    error
  }
}

export const onLoadLabel = () => {
  return dispatch => {
    axios.get('/lable/all').then((res) => {
      const data=res.data
      dispatch(labelSuccess(data))
    }).catch((error) => {
      dispatch(labelFail("Labels are not found"))
    })
  }
}