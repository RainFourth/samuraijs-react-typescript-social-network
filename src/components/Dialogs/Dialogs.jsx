import React from "react"
import css from "./Dialogs.module.scss"
import DialogItems from "./DialogItems/DialogItems";
import Messages from "./Messages/Messages";
import {connect} from "react-redux";
import {
    actionCreatorSelectUserInDialog,
    actionCreatorSendMsg,
    actionCreatorUpdateNewMsgText, sendThisMsgTC
} from "../../realRedux/dialogsReducer";
import {Redirect} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";



const Dialogs = (props) => {
    //let dialogsElems = props.store.getDialogs().map(el => <DialogItem name={el.name} id={el.id} />);


    return <div className={css.dialogs}>
        <div className={css.dialogItems}>
            {/*{dialogsElems}*/}
            <DialogItems state={props.state} actionSelectUserInDialog={props.actionSelectUserInDialog}  />
        </div>
        <Messages
            state={props.state}
            newMsg={props.newMsg}
            actionSendMsg={props.actionSendMsg}
            actionUpdateNewMsgText={props.actionUpdateNewMsgText}
            sendThisMsg={props.sendThisMsg}
        />
    </div>;
}



//если части стэйта были изменены, то перерисуются
//части - части объекта, который возвращается
//объекты сравниваются только по ссылкам!!!
let mapStateToProps = (state) => {
    return {
        state: state,
        newMsg: state.dialogs.messages.newMsg,
        isAuth: state.auth.isAuth,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        actionSelectUserInDialog: (userId) => actionCreatorSelectUserInDialog(userId),
        actionSendMsg: () => dispatch(actionCreatorSendMsg()),
        actionUpdateNewMsgText: (txt) => dispatch(actionCreatorUpdateNewMsgText(txt)),
        sendThisMsg: (msg) => dispatch(sendThisMsgTC(msg)),
    }
}

//DialogsContainer
export default connect(mapStateToProps, mapDispatchToProps)(withAuthRedirect(Dialogs)); //аргументы функции connect возвращают объекты, из которых формируются props для Dialogs

