import {ADD_POST, UPDATE_NEW_POST_TXT} from "./store";

const profileReducer = (state, action) => {
    //state здесь - это profile
    switch (action.type) {
        case UPDATE_NEW_POST_TXT:
            state.newPostVal = action.txt;
            break;
        case ADD_POST:
            const newPost = {id: 5, msg: state.newPostVal, likesCnt: 0}
            state.posts.push(newPost);
            state.newPostVal = "";
            break;
    }

    return state;
}


export const addPostActionCreator = () => ({type: ADD_POST})
export const updateNewPostTextActionCreator = (txt) => ({type: UPDATE_NEW_POST_TXT, txt: txt})

export default profileReducer;