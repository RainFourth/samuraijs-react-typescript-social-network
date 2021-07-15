import {getAuthUserDataTC} from "./authReducer";


export const SET_INITED = "SET_INITED";

const initialState = {
    inited: false,

}

const appReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_INITED:
            newState = {
                ...state,
                inited: action.inited,
            };
            return newState;
        default: return state;
    }
}


// Action Creators
export const setInitedAC = (inited = true) => ({type: SET_INITED, inited})

// Thunk Creators
export const initAppTC = () => (dispatch) => {
    const promise = dispatch(getAuthUserDataTC());
    // promise.then( () => dispatch(setInitedAC()));
    // когда все промисы выполнятся, then
    Promise.all([promise]).then( () => dispatch(setInitedAC()));
}


export default appReducer;