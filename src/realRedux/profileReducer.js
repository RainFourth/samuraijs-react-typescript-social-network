import {initialState} from "./initState";
import {profileAPI, usersAPI} from "../api/api";


export const ADD_POST = "ADD-POST";
export const UPDATE_NEW_POST_TXT = "UPDATE-NEW-POST-TXT";
export const SET_USER_PROFILE = "SET_USER_PROFILE";
export const SET_USER_STATUS = "SET_USER_STATUS";
export const SET_USER_ID = "SET_USER_ID";

const initState = {
    posts: [
        {id: 1, msg: "Hi, how are you?", likesCnt: 0},
        {id: 2, msg: "It's my first post", likesCnt: 23},
    ],
    newPostVal: "it-kamasutra.com",
    userId: undefined,
    profile: null,
    status: "",
}


const profileReducer = (state = initState, action) => {
    //state здесь - это profile в общем стэйте
    let newState;
    switch (action.type) {
        case UPDATE_NEW_POST_TXT:
            newState = {...state};
            newState.newPostVal = action.txt;
            return newState;
        case ADD_POST:
            newState = {...state};
            const newPost = {id: 5, msg: state.newPostVal, likesCnt: 0};
            (newState.posts = [...state.posts]).push(newPost); //копируем исходный массив, чтобы react-redux понял, что надо это перерисовать
            newState.newPostVal = "";
            return newState;
        case SET_USER_PROFILE:
            newState = {...state};
            newState.profile = action.user;
            return newState;
        case SET_USER_STATUS:
            newState = {...state};
            newState.status = action.status;
            return newState;
        case SET_USER_ID:
            newState = {...state};
            newState.userId = action.userId;
            return newState;
        default: return state;
    }
}

// Action Creators
export const addPostActionCreator = () => ({type: ADD_POST})
export const updateNewPostTextActionCreator = (txt) => ({type: UPDATE_NEW_POST_TXT, txt: txt})
export const setUserProfileAC = (user) => ({type: SET_USER_PROFILE, user})
export const setUserStatusAC = (status) => ({type: SET_USER_STATUS, status})
export const setUserIdAC = (userId) => ({type: SET_USER_ID, userId})

// Thunk Creators
export const getUserProfile = (userId) => (dispatch) => {
    if (!userId) userId = "";
    usersAPI.getUserProfile(userId).then(data => {
        dispatch(setUserProfileAC(data));
        //props.actionSetIsFetching(false);
    });
}
export const getUserStatus = (userId) => (dispatch) => {
    if (!userId) userId = "";
    profileAPI.getUserStatus(userId).then(data => {
        dispatch(setUserStatusAC(data))
    })
}
export const updateUserStatus = (status) => (dispatch) => {
    profileAPI.updateUserStatus(status).then(data => {
        if (data.resultCode === 0){
            dispatch(setUserStatusAC(status))
        }
    })
}



export default profileReducer;