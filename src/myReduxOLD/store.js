


//экспорт без дефолта - импортировать должны с таким же именем
//import {addPost} from "./myRedux/store";
import {rerenderEntireTree} from "../index";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import friendsReducer from "./friendsReducer";



/*const getPosts = () => {
    return store.profile.posts
}

const getNewPostVal = () => {
    return store.profile.newPostVal
}

const addPost = () => {
    let newPost = {id: 5, msg: getNewPostVal(), likesCnt: 0}
    store.profile.posts.push(newPost);
    setNewPostVal("");
    notifyListeners()
}

const setNewPostVal = (newPostVal) => {
    store.profile.newPostVal = newPostVal;
    notifyListeners()
}

const getDialogs = () => store.dialogs.dialogs

const getMessages = () => store.dialogs.messages.messages

const getNewMsgTxt = () => store.dialogs.messages.newMsgText

const setNewMsgText = (newMsgTxt) => {
    store.dialogs.messages.newMsgText = newMsgTxt;
    notifyListeners()
}

const sendMsg = () => {
    const newMsg = {id: 6, mine: true, msg: getNewMsgTxt()}
    store.dialogs.messages.messages.push(newMsg);
    notifyListeners()
}

const getFriends = () => store.friends*/

export const ADD_POST = "ADD-POST"
export const UPDATE_NEW_POST_TXT = "UPDATE-NEW-POST-TXT";
export const UPDATE_NEW_MSG = "UPDATE-NEW-MSG";
export const SEND_MESSAGE = "SEND-MSG"

const store = {
    _listeners: [],
    addOnStateChangedListener(listener) {
        this._listeners.push(listener);
        this.notifyListeners();
    },
    notifyListeners() {
        this._listeners.forEach(listener => listener(this))
    },



    getPosts() { return state.profile.posts },
    _addPost() {
        let newPost = {id: 5, msg: this.getNewPostVal(), likesCnt: 0}
        this.getPosts().push(newPost);
        this._setNewPostVal("");
        this.notifyListeners()
    },
    getNewPostVal() { return state.profile.newPostVal },
    _setNewPostVal(newPostVal) {
        state.profile.newPostVal = newPostVal;
        this.notifyListeners()
    },

    getDialogs() { return state.dialogs.dialogs },
    selectDialog(userId) { state.dialogs.selectedUserId = userId },
    getSelectedDialog() { return state.dialogs.selectedUserId },
    getMessages() { return state.dialogs.messages.messages },
    getNewMsgTxt() { return state.dialogs.messages.newMsg },
    _setNewMsgText(newMsgTxt) {
        state.dialogs.messages.newMsg = newMsgTxt;
        this.notifyListeners()
    },
    _sendMsg() {
        const newMsg = {id: 6, mine: true, msg: this.getNewMsgTxt()}
        this.getMessages().push(newMsg);
        this.notifyListeners()
    },

    getFriends() { return state.friends },

    dispatch(action){
        state.profile = profileReducer(state.profile, action)
        state.dialogs = dialogsReducer(state.dialogs, action)
        state.friends = friendsReducer(state.friends, action)
        /*switch (action.type) {
            case UPDATE_NEW_POST_TXT:
                this._setNewPostVal(action.txt);
                break;
            case ADD_POST:
                this._addPost();
                break;
            case UPDATE_NEW_MSG:
                this._setNewMsgText(action.txt);
                break;
            case SEND_MESSAGE:
                this._sendMsg();
                break;
        }*/
        this.notifyListeners()

    }
};

//export default store;





const state = {
    profile: {
        posts: [
            {id: 1, msg: "Hi, how are you?", likesCnt: 0},
            {id: 2, msg: "It's my first post", likesCnt: 23},
        ],
        newPostVal: "it-kamasutra.com",
    },
    dialogs: {
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

            /*msgBlocks: [
                {
                    userId: 1,
                    messages: [
                        {id: 1, mine: true, msg: "Hi"},
                        {id: 2, mine: true, msg: "How is your it-kamasutra?"},
                        {id: 3, mine: false, msg: "Yo"},
                        {id: 4, mine: true, msg: "Yo"},
                        {id: 5, mine: false, msg: "Yo"}
                    ],
                    newMsg: "",
                },
                {
                    userId: 2,
                    messages: [
                        {id: 3, mine: false, msg: "Yo"},
                        {id: 4, mine: true, msg: "Yo"},
                        {id: 5, mine: false, msg: "Yo"}
                    ],
                    newMsg: "",
                },
            ],*/
        },
    },
    friends: [
        {name: "Andrew", ava: "https://media.sonicscanf.org/gallery/knuckles-the-echidna/sonic-adventure-2-battle.png"},
        {name: "Sasha", ava: "https://banner2.kisspng.com/20180417/ckw/kisspng-tails-sonic-the-hedgehog-sonic-chaos-shadow-the-he-fox-5ad6572a4268c8.880208941523996458272.jpg"},
        {name: "Dimych", ava: "https://tcrf.net/images/a/a0/ContraHardCorps-FangIntro.png"},
    ]

}




