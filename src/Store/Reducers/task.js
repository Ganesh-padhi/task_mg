import * as actionType from '../Actions/actionType'

const initialState = {
    tasks: [],
    error: null,
    loading: false,
    isDataChange: false
}

const updateobject = (state, action) => {
    return {
        ...state,
        ...action
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.TASK_SUCCESS:
            return updateobject(state, {
                tasks: action.tasks,
                error: null,
                loading: false
            })
        case actionType.TASK_UPDATE:
            return updateobject(state, {
                tasks: action.tasks
            })
        case actionType.TASK_FAIL:
            return updateobject(state, {
                error: action.error,
                loading: false
            })
        case actionType.TASK_START:
            return updateobject(state, {
                loading: true
            })
        case actionType.TASK_CHANGE:
            return updateobject(state, {
                isDataChange: true
            })
        case actionType.TASK_RESET:
            return updateobject(state, {
                isDataChange: false
            })
            case actionType.TASK_SET_TO_EMPTY:
                return updateobject(state,initialState)
        default:
            return state
    }
}

export default reducer