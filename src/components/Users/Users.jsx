import React from 'react';
import {connect} from "react-redux";
import css from "./Users.module.scss"
import {
    setCurrentPageAC, setTotalUsersCntAC,
    addFollowingUserIdAC, deleteFollowingUserIdAC, requestUsersThunkCreator, follow, unfollow
} from "../../realRedux/usersReducer";
import userAva from "../../assets/images/user.png"
import Preloader from "../common/Preloader";
import {NavLink} from "react-router-dom";
import {
    getCurrPage,
    getFollowedUserIds,
    getPageSize,
    getTotalUsersCount,
    getUsers, getUsersSelector,
    isFetching
} from "../../realRedux/usersSelector";





const noAva = userAva;

class User extends React.Component {

    //если не писать конструктор, то параметры автоматически прокидываются суперклассу

    /*unfollow(userId){
        const props = this.props;
        props.actionAddFollowingUserId(userId);
        dalAPI.unfollow(userId).then(data => {
            if (data.resultCode === 0){
                props.actionUnfollow(userId);
            }
            props.actionDeleteFollowingUserId(userId);
        });
    }*/


    render(){
        const props = this.props;

        let smallAva = props.user.photos.small;
        smallAva = smallAva ? smallAva : noAva;

        return <div>
        <span>
            <div className={css.avaContainer}>
                <NavLink to={"/profile/" + props.user.id}>
                    <img src={smallAva}/>
                </NavLink>

            </div>
            <div>
                {
                    props.user.followed ?
                        <button disabled={props.followedUserIds.some(id => id === props.user.id)} onClick={ ()=>props.unfollow(props.user.id) }>Unfollow</button> :
                        <button disabled={props.followedUserIds.some(id => id === props.user.id)} onClick={ ()=>props.follow(props.user.id) }>Follow</button>
                }
            </div>
        </span>
            <span>
            <span>
                <div>{props.user.name}</div>
                <div>{props.user.status}</div>
            </span>
            <span>
                <div>{"props.user.location.country"}</div>
                <div>{"props.user.location.city"}</div>
            </span>
        </span>
        </div>
    }

}







//ПРЕЗЕНТАЦИОННАЯ КОМПОНЕНТА
const UsersFunc = (props) => {
    const pagesCnt = Math.ceil(props.totalUsersCount / props.pageSize); //округлить вверх
    let pages = [];
    for (let i = 1; i <= pagesCnt; i++) {
        pages.push(i);
    }

    return <div>
        <div>{pages.map(p => <span className={p===props.currentPage && css.selectedPage} onClick={e=>props.onPageChanged(p)}>{p} </span>)}</div>
        { props.users.map( u =>
            <User
                key={u.id}
                user={u}
                actionFollow={props.actionFollow}
                actionUnfollow={props.actionUnfollow}
                followedUserIds={props.followedUserIds}
                actionAddFollowingUserId={props.actionAddFollowingUserId}
                actionDeleteFollowingUserId={props.actionDeleteFollowingUserId}
                follow={props.follow}
                unfollow={props.unfollow}
            />) }

        {/*<button onClick={()=>props.actionSetUsers(initialState.users.users.slice(props.users.length, props.users.length+4))}>Show more</button>*/}
    </div>
}

//КЛАССОВАЯ КОМПРОНЕНТА
class Users extends React.Component {

    constructor(props) {
        super(props);
    }

    /*loadUsers(pageNumber){
        const props = this.props;
        props.actionSetIsFetching(true);
        pageNumber = pageNumber ? pageNumber : props.currentPage
        usersAPI.getUsers(pageNumber, props.pageSize).then(data => {
            props.actionSetUsers(data.items);
            props.actionSetTotalUsersCnt(data.totalCount);
            props.actionSetIsFetching(false);
        });
    }*/

    componentDidMount(){ //вызывается 1 раз, когда компонента вмонтирована в DOM
        //alert("I know I am inside the DOM")
        //this.loadUsers();
        const props = this.props;
        props.thunkRequestUsers(props.currentPage, props.pageSize);
    }
    componentDidUpdate(){ //вызывается после обновления частей готовой компоненты
        //alert("I know I am updated")
    }

    onPageChanged = (p) => {
        const props = this.props;
        props.actionSetCurrentPage(p);
        props.thunkRequestUsers(p, props.pageSize);
        //this.loadUsers(p);
    }


    render(){
        const props = this.props;
        return <>
            {props.isFetching ? <Preloader/> : null}
            <UsersFunc
                totalUsersCount={props.totalUsersCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                users={props.users}
                onPageChanged={this.onPageChanged}
                actionAddFollowingUserId={props.actionAddFollowingUserId}
                actionDeleteFollowingUserId={props.actionDeleteFollowingUserId}
                followedUserIds={props.followedUserIds}
                follow={props.follow}
                unfollow={props.unfollow}
            />
            </>
    }
}

//КОНТЕЙНЕРНАЯ КОМПОНЕНТА

//было
/*const mapStateToProps = (state) => {
    return {
        users: state.users.users,
        pageSize: state.users.pageSize,
        totalUsersCount: state.users.totalUsersCount,
        currentPage: state.users.currentPage,
        isFetching: state.users.isFetching,
        followingUserIds: state.users.followingUserIds,
    }
}*/
//стало
const mapStateToProps = (state) => ({
    users: getUsersSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrPage(state),
    isFetching: isFetching(state),
    followedUserIds: getFollowedUserIds(state),
});




// старый формат
/*const mapDispatchToProps = (dispatch) => {
    return {
        actionFollow: (userId) => dispatch(followAC(userId)),
        actionUnfollow: (userId) => dispatch(unfollowAC(userId)),
        actionSetUsers: (users) => dispatch(setUsersAC(users)),
        actionSetCurrentPage: (currPageNumber) => dispatch(setCurrentPageAC(currPageNumber)),
        actionSetTotalUsersCnt: (totalUsersCnt) => dispatch(setTotalUsersCntAC(totalUsersCnt)),
        actionSetIsFetching: (isFetching) => dispatch(setIsFetchingAC(isFetching)),
    }
}*/
// новый формат
const mapDispatchToProps = { //заменили на объект, метод connect сам повесит колбэки с диспатчем
    actionSetCurrentPage: setCurrentPageAC,
    actionSetTotalUsersCnt: setTotalUsersCntAC,
    actionAddFollowingUserId: addFollowingUserIdAC,
    actionDeleteFollowingUserId: deleteFollowingUserIdAC,
    thunkRequestUsers: requestUsersThunkCreator,
    follow, //follow thunk creator
    unfollow, //follow thunk creator
}



export default connect(mapStateToProps, mapDispatchToProps)(Users);
