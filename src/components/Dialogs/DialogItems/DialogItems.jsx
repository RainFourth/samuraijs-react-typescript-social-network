import React from "react"
import css from "../Dialogs.module.scss"
import {NavLink} from "react-router-dom";
import {actionCreatorSelectUserInDialog} from "../../../realRedux/dialogsReducer";


const DialogItem = (props) => {
    const selectDialog = (userId) => {
        //props.actionSelectUserInDialog(userId)
        return userId
    }

    return <div className={css.dialog}>
        {/*{"/dialogs/" + props.id}*/}
        <NavLink to={`/dialogs/${selectDialog(props.id)}`} activeClassName={css.activeLink}>{props.name}</NavLink>
    </div>
}


const DialogItems = (props) => {

    const dialogsElems = props.state.dialogs.dialogs.map(el => <DialogItem key={el.id} id={el.id} name={el.name} actionSelectUserInDialog={props.actionSelectUserInDialog}/>);

    return <div>{dialogsElems}</div>
}


export default DialogItems;



