import React, {useEffect, useState} from "react";
import Preloader from "../../common/Preloader";
import noAva from "../../../assets/images/user.png";
import css from "./ProfileInfo.module.scss";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, updateUserStatus} from "../../../realRedux/profileReducer";





const ProfileInfoWithHooks2 = (props) => {


    // Using HOOK: useState
    // Можно кидать объект с полями, но подразумевается, что мы будем заменять объект целиком
    // а можно несколько раз useState(newProperty) для каждого свойства
    // Первоначальное значение в аргументе useState используется только раз, когда компонента вмонтирована

    // свойство editMode
    const stateWithSetters = useState(false);
    const editMode = stateWithSetters[0]; // первое значение
    const setEditMode = stateWithSetters[1]; // колбэк функция изменения первого значения

    // свойство status
    const [status, setStatus] = useState("");


    // выполняется после каждого рендера - аналог componentDidUpdate
    useEffect(()=>{
        console.log("useEffect")
    });
    // выполняется только раз сразу после рендера - аналог componentDidMount
    useEffect(()=>{
        console.log("useEffect2")
    }, []);
    // выполняется сразу после рендера и при изменении props.status
    // если в массиве несколько зависимостей, то выполнится при изменении хотя бы одной
    useEffect(()=>{
        console.log("useEffect3")
        setStatus(props.status)
    }, [props.status, props.myUserId]);

    const loadUserProfile = () => {
        const targetUserId = props.userId;
        if (!props.profile || props.profile.userId !== targetUserId) {
            props.getUserProfile(targetUserId);
            props.getUserStatus(targetUserId);
        }
    }
    const activateEditMode = () => {
        if (props.userId===props.myUserId){
            //setStatus(props.status);
            setEditMode(true);
        }
    }
    const deactivateEditMode = () => {
        setEditMode(false);
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }
    const saveStatus = () => {
        deactivateEditMode();
        props.updateUserStatus(status);
    }

    loadUserProfile();

    console.log("render ProfileInfoWithHooks");

    if (!props.profile) return <Preloader/>

    let ava = props.profile.photos.large;
    if (!ava) ava = noAva;

    return <div>

        <div className={css.descriptionBlock}>
            <div className={css.avaContainer}><img src={ava}/></div>
            <div>userId: {props.profile.userId}</div>
            <div>fullName: {props.profile.fullName}</div>
            <div>about me: {props.profile.aboutMe}</div>
            {!editMode && <div onDoubleClick={activateEditMode}>status: {props.status}</div>}
            {editMode && <div><input value={status} autoFocus={true} onChange={e=>onStatusChange(e)} onBlur={ ()=>saveStatus() }/></div>}
        </div>

    </div>

}

const mapStateToProps = (state) => ({
    userId: state.profile.userId,
    myUserId: state.auth.userId,
    profile: state.profile.profile,
    status: state.profile.status,
})
const mapDispatchToProps = {
    getUserProfile: getUserProfile,
    getUserStatus: getUserStatus,
    updateUserStatus: updateUserStatus,
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfoWithHooks2);









// OLD version without hook useState
class ProfileInfo extends React.Component {

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

        console.log("render ProfileInfoWithHooks");

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
