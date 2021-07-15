import React from 'react'; //импорт из модуля react (они лежат в папке node_modules)
import MyPosts from './MyPosts/MyPosts';
import css from "./Profile.module.scss"
import ProfileInfoOLD from "./ProfileInfo/ProfileInfoOLD";
import {
    getUserProfile,
    getUserStatus,
    setUserIdAC,
    updateUserStatus
} from "../../realRedux/profileReducer";
import {connect} from "react-redux";
import store from "../../realRedux/store";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import ProfileInfoWithHooks2 from "./ProfileInfo/ProfileInfoWithHooks";





class Profile extends React.Component{

    /*state = {
        redirectToMe: false,
    }*/

    /*loadUserProfile(){
        const props = this.props;
        let userId = props.match.params.userId;

        if (!userId) this.setState({redirectToMe: true})
        else {
            props.getUserProfile(userId);
            props.getUserStatus(userId);
        }
    }*/

    componentDidMount(){ //вызывается 1 раз, когда компонента вмонтирована в DOM
        //alert("I know I am inside the DOM")
        //this.loadUserProfile();
    }

    render(){
        const props = this.props;
        //const state = this.state;
        /*if (state.redirectToMe) {
            this.setState({redirectToMe: false})
            return <Redirect to={`/profile/${props.myUserId}`} />
        }*/

        const urlUserId = Number(props.match.params.userId);
        const userId = props.userId;
        const isAuth = props.isAuth;
        const myUserId = props.myUserId;

        if(!urlUserId) {
            if (isAuth){
                props.setUserId(myUserId);
                return <Redirect to={`/profile/${myUserId}`} />
            } else {
                // return <Redirect to={"/login"} />
                // или так, но это неправильно с точки зрения архитектуры:
                this.props.history.push("/login");
            }
        }

        if (userId !== urlUserId){
            props.setUserId(urlUserId);
            return <></>
        }

        return <div>
            <ProfileInfoWithHooks2 />
            <MyPosts state={props.state} store={props.store} />
        </div>
    }
}





const mapStateToProps = (state) => ({
    state,
    store,
    profile: state.profile.profile,
    status: state.profile.status,
    userId: state.profile.userId,
    myUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})
const mapDispatchToProps = {
    //actionSetUserProfile: setUserProfileAC,
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    setUserId: setUserIdAC,
}

//connect(mstp, mdtp) возвращает HOC
//withRouter создаёт компоненту с запиханным в props URL (location) + history + match
//withAuthRedirect перенаправляет на страницу логина если не авторизованы (написана мной - HOC)

//это ВМЕСТО export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withAuthRedirect(Profile)));
//compose последовательно применит хоки к компоненте
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    //withAuthRedirect,
)(Profile)


