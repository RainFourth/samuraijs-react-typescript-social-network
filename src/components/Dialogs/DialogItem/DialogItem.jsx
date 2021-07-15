import React from "react"
import css from "../Dialogs.module.scss"
import {NavLink} from "react-router-dom";


const DialogItem = (props) => {
    return <div className={css.dialog}>
        {/*{"/dialogs/" + props.id}*/}
        <NavLink to={`/dialogs/${props.id}`} activeClassName={css.activeLink}>{props.name}</NavLink>
    </div>
}


export default DialogItem;



