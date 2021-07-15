import React from 'react'; //импорт из модуля react (они лежат в папке node_modules)
import css from "./Header.module.scss"
import {NavLink} from "react-router-dom";
import * as axios from "axios";
import {connect} from "react-redux";
import {getAuthUserDataTC, logoutTC, setAuthUserDataAC} from "../../realRedux/authReducer";
import {authAPI} from "../../api/api";





function HeaderFun(props) {
    return (
        <header className={css.header}>
            <img src="https://mostaql.hsoubcdn.com/uploads/201639-1469757735-Logo_Image_01.png"/>
            <div className={css.loginBlock}>
                { props.isAuth ?
                    <div>
                        <div>{props.login}</div>
                        <div><button onClick={props.logout}>logout</button></div>
                    </div>
                    :
                    <NavLink to={"/login"}>Login</NavLink>}
            </div>
        </header>
    );
}

class Header extends React.Component {

    componentDidMount() {

    }

    render() {
        return <HeaderFun {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    userId: state.auth.userId,
    email: state.auth.email,
    login: state.auth.login,
    isAuth: state.auth.isAuth,
})
const mapDispatchToProps = ({
    logout: logoutTC,
})
export default connect(mapStateToProps, mapDispatchToProps)(Header);