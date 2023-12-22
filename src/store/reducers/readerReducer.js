import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    readerInfo: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.READER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                readerInfo: action.readerInfo
            }
        case actionTypes.READER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                readerInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                readerInfo: null
            }
        default:
            return state;
    }
}

export default appReducer;