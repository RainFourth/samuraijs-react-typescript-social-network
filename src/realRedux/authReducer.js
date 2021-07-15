import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";


export const SET_USER_DATA = "SET_USER_DATA";

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    //isFetching: true,
}

const authReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER_DATA:
            newState = {
                ...state,
                ...action.userData,
                isAuth: Boolean(action.userData.userId),
            };
            return newState;
        default: return state;
    }
}


// Action Creators
export const setAuthUserDataAC = (userId, email, login) => ({type: SET_USER_DATA, userData: {userId, email, login}})

// Thunk Creators
export const getAuthUserDataTC = () => (dispatch) => {
    return authAPI.me().then(data => {
        if (data.resultCode === 0){
            const {id, login, email} = data.data;
            dispatch(setAuthUserDataAC(id, email, login));
        } /*else {
            alert("Need to login")
        }*/
        //props.actionSetIsFetching(true);
    });
}
export const loginTC = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe).then( data => {
        if (data.resultCode === 0){
            //const userId = data.data.userId;
            dispatch(getAuthUserDataTC());
        } else {

            // передаём имя формы, дальше сообщения с ошибками для полей по их имени
            // const action = stopSubmit("login", {password: "Email or password is incorrect"});

            // или просто передаём общую для всей формы ошибку по имени _error
            const action = stopSubmit("login", {_error: "Common form error: " + data.messages, password: "Error for field named password"});
            dispatch(action);

            //alert(data.messages);
        }
    });
}
export const logoutTC = () => (dispatch) => {
    authAPI.logout().then( data => {
        if (data.resultCode === 0){
            dispatch(setAuthUserDataAC(null, null, null));
        }
    });
}

export default authReducer;