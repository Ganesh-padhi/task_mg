import * as actionType from '../Actions/actionType'

const initialState = {
    userData: {},
    allUserData: [],
    error: null,
    loading: false
}

const updateobject = (state, action) => {
    return {
        ...state,
        ...action
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.LOGIN_SUCCESS:
            return updateobject(state, {
                userData: action.userData,
                error: null,
                loading: false
            })
        case actionType.LOGIN_FAIL:
            return updateobject(state, {
                error: action.error,
                loading: false
            })
        case actionType.LOGIN_START:
            return updateobject(state, {
                loading: true
            })
        case actionType.FETCH_ALL_USER:
            return updateobject(state, {
                allUserData: action.allUserData
            })
        case actionType.LOGOUT:
            return updateobject(state, initialState)
        default:
            return state
    }
}

export default reducer