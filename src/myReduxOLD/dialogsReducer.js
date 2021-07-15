import {SEND_MESSAGE, UPDATE_NEW_MSG} from "./store";

const dialogsReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_NEW_MSG:
            state.messages.newMsg = action.txt
            break;
        case SEND_MESSAGE:
            const newMsg = {id: 6, mine: true, msg: state.messages.newMsg}
            state.messages.messages.push(newMsg);
            break;
    }


    return state;
}


export const updateNewMsgTextActionCreator = (txt) => ({type: UPDATE_NEW_MSG, txt: txt})
export const sendMsgActionCreator = () => ({type: SEND_MESSAGE})


export default dialogsReducer;