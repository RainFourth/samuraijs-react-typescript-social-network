import {initialState} from "./initState";


export const UPDATE_NEW_MSG = "UPDATE-NEW-MSG";
export const SEND_MESSAGE = "SEND-MSG"
export const SEND_THIS_MESSAGE = "SEND_THIS_MSG"
export const SELECT_USER_IN_DIALOG = "SELECT_USER_IN_DIALOG";


const initState = {
    dialogs: [
        {id: 1, name: "Dimych"},
        {id: 2, name: "Andrew"},
        {id: 3, name: "Sveta"},
        {id: 4, name: "Sasha"},
        {id: 5, name: "Viktor"},
        {id: 6, name: "Valera"},
    ],
    selectedUserId: undefined,

    messages: {

        messages: [
            {id: 1, mine: true, msg: "Hi"},
            {id: 2, mine: true, msg: "How is your it-kamasutra?"},
            {id: 3, mine: false, msg: "Yo"},
            {id: 4, mine: true, msg: "Yo"},
            {id: 5, mine: false, msg: "Yo"}
        ],
        newMsg: "",
    },
}

const dialogsReducer = (state = initState, action) => {
    let newState;
    switch (action.type) {

        // for old field
        case UPDATE_NEW_MSG:
            newState = {...state};
            newState.messages.newMsg = action.txt
            return newState;
        // for old field
        case SEND_MESSAGE:
            newState = {...state};
            const newMsg = {id: 6, mine: true, msg: state.messages.newMsg};
            (newState.messages.messages = [...state.messages.messages]).push(newMsg);
            newState.messages.newMsg = "";
            return newState;


        case SEND_THIS_MESSAGE:
            //console.log("reducer send this msg");
            newState = {...state};
            const newThisMsg = {id: 6, mine: true, msg: action.msg};

            newState.messages.messages = [...state.messages.messages, newThisMsg];
            //newState.messages.messages.push(newThisMsg);
            return newState;


            //state.messages.messages[0] = (newThisMsg);
            //state.messages.messages = [...state.messages.messages, newThisMsg];
            //state.messages.messages.push(newThisMsg);
            //return state;

        case SELECT_USER_IN_DIALOG:
            return {
                ...state,
                selectedUserId: action.userId
            };
        default: return state;
    }
}

// Action Creators
export const actionCreatorUpdateNewMsgText = (txt) => ({type: UPDATE_NEW_MSG, txt: txt})
export const actionCreatorSendMsg = () => ({type: SEND_MESSAGE})
export const sendThisMsgAC = (msg) => ({type: SEND_THIS_MESSAGE, msg})
export const actionCreatorSelectUserInDialog = (userId) => ({type: SELECT_USER_IN_DIALOG, userId: userId})

// Thunk Creators
export const sendThisMsgTC = (msg) => (dispatch) => {
    dispatch(sendThisMsgAC(msg))
}

export default dialogsReducer;