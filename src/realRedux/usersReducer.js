import {initialState} from "./initState";
import * as axios from "axios";
import {usersAPI} from "../api/api";


const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_CNT = "SET_TOTAL_USERS_CNT";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const ADD_FOLLOWING_USER_ID = "ADD_FOLLOWING_USER_ID";
const DELETE_FOLLOWING_USER_ID = "DELETE_FOLLOWING_USER_ID";

const initState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0, // будет получено с сервера
    currentPage: 1,
    isFetching: false,
    followingUserIds: [],
}

const usersReducer = (state = initState, action) => {


    //state здесь - это profile в общем стэйте
    let newState;
    switch (action.type) {
        case FOLLOW:
            newState = {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u )
            };
            return newState;
        case UNFOLLOW:
            newState = {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u )
            };
            return newState;
        case SET_USERS:
            newState = {
                ...state,
                users: [...action.users]
            };
            return newState;
        case SET_CURRENT_PAGE:
            newState = {
                ...state,
                currentPage: action.pageNumber,
            };
            return newState;
        case SET_TOTAL_USERS_CNT:
            newState = {
                ...state,
                totalUsersCount: action.totalUsersCnt,
            };
            return newState;
        case SET_IS_FETCHING:
            newState = {
                ...state,
                isFetching: action.isFetching,
            };
            return newState;
        case ADD_FOLLOWING_USER_ID:
            newState = {
                ...state,
                followingUserIds: [...state.followingUserIds, action.followingUserId],
            };
            return newState;
        case DELETE_FOLLOWING_USER_ID:
            newState = {
                ...state,
                followingUserIds: state.followingUserIds.filter(id => id !== action.followingUserId),
            };
            return newState;
        default: return state;
    }
}


export const followAC = (userId) => ({type: FOLLOW, userId})
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId})
export const setUsersAC = (users) => ({type: SET_USERS, users})
export const setCurrentPageAC = (pageNumber) => ({type: SET_CURRENT_PAGE, pageNumber})
export const setTotalUsersCntAC = (totalUsersCnt) => ({type: SET_TOTAL_USERS_CNT, totalUsersCnt})
export const setIsFetchingAC = (isFetching) => ({type: SET_IS_FETCHING, isFetching})
export const addFollowingUserIdAC = (followingUserId) => ({type: ADD_FOLLOWING_USER_ID, followingUserId})
export const deleteFollowingUserIdAC = (followingUserId) => ({type: DELETE_FOLLOWING_USER_ID, followingUserId})

export const requestUsersThunkCreator = (pageNumber, pageSize) => (dispatch) => {
    dispatch(setIsFetchingAC(true));
    usersAPI.getUsers(pageNumber, pageSize).then(data => {
        dispatch(setUsersAC(data.items));
        dispatch(setTotalUsersCntAC(data.totalCount));
        dispatch(setIsFetchingAC(false));
    });
}
export const follow = (userId) => (dispatch) => {
    dispatch(addFollowingUserIdAC(userId));
    usersAPI.follow(userId).then(data => {
        if (data.resultCode === 0){
            dispatch(followAC(userId));
        }
        dispatch(deleteFollowingUserIdAC(userId));
    });
}
export const unfollow = (userId) => (dispatch) => {
    dispatch(addFollowingUserIdAC(userId));
    usersAPI.unfollow(userId).then(data => {
        if (data.resultCode === 0){
            dispatch(unfollowAC(userId));
        }
        dispatch(deleteFollowingUserIdAC(userId));
    });
}

export default usersReducer;