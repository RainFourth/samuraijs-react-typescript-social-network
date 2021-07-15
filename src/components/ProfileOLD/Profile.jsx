import React from 'react'; //импорт из модуля react (они лежат в папке node_modules)
import MyPosts from './MyPosts/MyPosts';
import css from "./Profile.module.scss"
import ProfileInfo from "./ProfileInfo/ProfileInfo";






const Profile = (props) => {
    return <div>
        <ProfileInfo />
        <MyPosts state={props.state} store={props.store} />
    </div>
}




export default Profile;