import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})
export const readerLoginSuccess = (readerInfo) => ({
    type: actionTypes.READER_LOGIN_SUCCESS,
    readerInfo: readerInfo
})
export const readerLoginFail = () => ({
    type: actionTypes.READER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})
