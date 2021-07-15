import React from "react";
import css from "./ProfileInfo.module.scss"
import Preloader from "../../common/Preloader";
import noAva from "../../../assets/images/user.png"


/*export default (props) => {
    if (!props.profile) return <Preloader/>

    let ava = props.profile.photos.large;
    ava = ava ? ava : noAva;

    //debugger

    return <div>

        <div className={css.descriptionBlock}>
            <img src={ava}/>
            <div>{props.profile.aboutMe}</div>
            <input value={props.profile.aboutMe}/>
        </div>

    </div>
}*/


export default class ProfileInfoOLD extends React.Component {

    // локальный BLL
    state = {
        statusEditMode: false,
        status: this.props.status,
    }

    loadUserProfile(){
        const props = this.props;

        if (!props.profile || props.profile.userId !== props.userId) {
            props.getUserProfile(props.userId);
            props.getUserStatus(props.userId);
        }
    }

    setStatusEditMode(activate){
        const props = this.props;
        if (!activate || (activate && props.userId===props.myUserId)) this.setState({statusEditMode: activate})
    }

    onStatusChange(e){
        this.setState({status: e.currentTarget.value})
    }

    saveStatus(){
        const props = this.props;
        this.setStatusEditMode(false)
        props.updateUserStatus(this.state.status);
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.status !== this.props.status) this.setState({status: this.props.status})
    }

    render(){
        const props = this.props;
        const state = this.state;

        this.loadUserProfile();

        if (!props.profile) return <Preloader/>

        let ava = props.profile.photos.large;
        if (!ava) ava = noAva;

        return <div>

            <div className={css.descriptionBlock}>
                <div className={css.avaContainer}><img src={ava}/></div>
                <div>userId: {props.profile.userId}</div>
                <div>fullName: {props.profile.fullName}</div>
                <div>about me: {props.profile.aboutMe}</div>
                {!state.statusEditMode && <div onDoubleClick={ ()=>this.setStatusEditMode(true) }>status: {props.status}</div>}
                {state.statusEditMode && <div><input value={state.status} autoFocus={true} onChange={(e)=>this.onStatusChange(e)} onBlur={ ()=>this.saveStatus() }/></div>}
            </div>

        </div>
    }
}




