import React from "react"
import css from "./Messages.module.scss"
import {Field, reduxForm} from "redux-form";
import {maxLen, maxLen30, required} from "../../../utils/validators/validators";
import TextareaInForm from "../../common/FormsControls/TextareaInForm(gen1)";
import {connect} from "react-redux";

const MessageLeft = (props) =>
    <div className={css.msgLeft}>
        <div className={css.msg}>
            {props.msg.msg}
        </div>
        <div className={css.avaContainer}>
            <img src="https://slovnet.ru/wp-content/uploads/2019/09/3-15-768x1308.png"/>
        </div>
    </div>

const MessageRight = (props) =>
    <div className={css.msgRight}>
        <div className={css.msg}>
            {props.msg.msg}
        </div>
        <div className={css.avaContainer}>
            <img src="https://slovnet.ru/wp-content/uploads/2019/09/3-15-768x1308.png"/>
        </div>
    </div>


// react ref + flux круговорот каждого символа
const MessageFormOld = (props) => {

    const newMsgTxtArea = React.createRef();

    const onNewMsgTxtAreaChange = (e) => {
        const txt = e.target.value;

        props.actionUpdateNewMsgText(txt)
        //const action = actionCreatorUpdateNewMsgText(txt);
        //props.store.dispatch(action);
    }

    //const sendMsg = () => props.store.sendMsg()
    //const sendMsg = () => props.store.dispatch(actionCreatorSendMsg())
    const sendMsg = () => props.actionSendMsg()

    return <div>
        <textarea ref={newMsgTxtArea} value={props.newMsg} onChange={onNewMsgTxtAreaChange} placeholder="Enter new msg"/>
        <button onClick={sendMsg}>Send (Old)</button>
    </div>
}



const maxLen15 = maxLen(15);

// встроенная redux форма с внутренним локальным стэйтом
const MessageReduxForm = reduxForm({form: "newDialogMsg"})( (props) => {
    return <div>
        <form onSubmit={props.handleSubmit}>
            <div>
                {/*
                // ОРИГИНАЛЬНОЕ:
                <Field name={"newMsg"} component={"textarea"} placeholder={"Enter new msg"}
                    validate={[required, maxLen15]}
                />*/}
                <Field name={"newMsg"} component={TextareaInForm} placeholder={"Enter new msg"}
                       validate={[required, maxLen15]}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    </div>
})


let MessagesElems = (props) => {
    console.log("rerender MessagesElems");
    let messagesElems = props.messages.map(msg => !msg.mine ? <MessageLeft key={msg.id} msg={msg} /> : <MessageRight key={msg.id} msg={msg} /> );
    return <div className={css.messages}>
        {messagesElems}
    </div>
}
MessagesElems = connect((state)=>({messages: state.dialogs.messages.messages}))(MessagesElems);


const Messages = (props) => {
    const onSubmitSendMsg = (formData) => {
        props.sendThisMsg(formData.newMsg)
    }


    return <div>

        {/*messages={props.state.dialogs.messages.messages}*/}
        <MessagesElems />

        <MessageFormOld
            newMsg={props.newMsg}
            actionUpdateNewMsgText={props.actionUpdateNewMsgText}
            actionSendMsg={props.actionSendMsg}
        />
        <MessageReduxForm
            onSubmit={onSubmitSendMsg}
        />

    </div>
}

export default Messages;