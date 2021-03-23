import * as actionType from '../Actions/actionType'

const initialState = {
    labelData:[],
    error: null
}

const updateobject = (state, action) => {
    return {
        ...state,
        ...action
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.LABLE_SUCCESS:
            return updateobject(state, {
                labelData:action.labelData,
                error: null
            })
        case actionType.LABEL_FAIL:
            return updateobject(state, {
                error: action.error,
                loading: false
            })
        default:
            return state
    }
}

export default reducer