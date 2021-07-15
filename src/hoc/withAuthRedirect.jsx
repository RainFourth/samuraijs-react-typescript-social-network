import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";



const mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
});


//HOC - High Order Component - даёт дополнительный функционал нашей компоненте
//можно внутри написать классовую компрненту вместо функциональной
export const withAuthRedirect = (Component) => connect(mapStateToPropsForRedirect)( (props) => {
    if (!props.isAuth) return <Redirect to={"/login"}/>
    return <Component {...props}/>
})
