import React from 'react'; //импорт из модуля react (они лежат в папке node_modules)
import css from "./Post.module.scss"





//props передаются всегда
//поля объекта props создаются как имена и значения атрибутов данного тега (создание поля msg: <Post msg="some message" />)
const Post = (props) =>
    <div className={css.dialog}>
        <img src="https://www.desktopbackground.org/download/1080x1920/2014/08/06/805131_avatar-heat-iphone-6-plus-wallpapers_1080x1920_h.jpg"></img>
        {props.msg}
        <div><span>{props.likesCnt} likes</span></div>
    </div>



export default Post;