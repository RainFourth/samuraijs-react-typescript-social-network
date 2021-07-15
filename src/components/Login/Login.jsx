import React from 'react';
import {Field, reduxForm} from "redux-form";
import {required} from "../../utils/validators/validators";
import ElementInFormGen3 from "../common/FormsControls/ElementInForm(gen3)";
import InputInForm2 from "../common/FormsControls/InputInForm(gen2)";
import {connect} from "react-redux";
import {loginTC, logoutTC} from "../../realRedux/authReducer";
import {Redirect} from "react-router-dom";
import formCss from "../common/FormsControls/FormsConrtol.module.scss";


const PasswordInput = ElementInFormGen3("input");

const LoginForm = (props) => {
    return <div>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"email"} component={InputInForm2} placeholder={"Email"}
                    validate={[required]}
                />
            </div>
            <div>
                {/*было: <input placeholder={"Password"}/>*/}
                {/*было: <Field name={"password"} placeholder={"Password"} component={"input"}
                       validate={[required]}
                />*/}
                <Field name={"password"} component={PasswordInput} placeholder={"Password"} type={"password"}
                       validate={[required]}
                />
            </div>
            <div>
                <Field name={"rememberMe"} component={"input"} type={"checkbox"}/> remember me
            </div>
            {props.error && <div className={formCss.formSummaryError}>{props.error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    </div>
}

const ReduxLoginForm = reduxForm({
    form: "login", //unique form name
})(LoginForm)





const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) return <Redirect to={"/profile"} />

    return <div>
        <h1>Login</h1>
        <ReduxLoginForm onSubmit={onSubmit}/>
    </div>
}


const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
})
const mapDispatchToProps = ({
    login: loginTC,
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);