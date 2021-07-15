import React from 'react'; //импорт из модуля react (они лежат в папке node_modules)
import css from "./MyPosts.module.scss"
import Post from './Post/Post';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../realRedux/profileReducer";


const MyPosts = (props) => {
    let postElems = props.state.profile.posts.map(post => <Post msg={post.msg} likesCnt={post.likesCnt}/>)

    let newPostTxtArea = React.createRef();
    let addPost = () => {
        props.store.dispatch(addPostActionCreator())
    }
    let onPostChange = () => {
        let txt = newPostTxtArea.current.value;
        props.store.dispatch(updateNewPostTextActionCreator(txt))
    }

    return <div className={css.postsBlock}>
        <h3>My Posts</h3>

        <div>
            <div>
                <textarea ref={newPostTxtArea} value={props.state.profile.newPostVal} onChange={onPostChange}></textarea>
            </div>
            <div>
                <button onClick={ addPost }>Add post</button>
            </div>
        </div>

        <div className={css.posts}>
            Posts
            {postElems}
        </div>

    </div>
}




export default MyPosts;