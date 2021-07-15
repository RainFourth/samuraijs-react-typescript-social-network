import React from 'react'; //импорт из модуля react (они лежат в папке node_modules)

//Navbar.scss стал модулем (добавить .module в имя файла)
//сделано для уникальности названия классов в css (по факту к именам классов добавляются префикс и рандомный суффикс)
//и к этим классам обращаемся через css
import css from "./Navbar.module.scss"
import {NavLink} from "react-router-dom";


const Friend = (props) =>
    <div className={css.friend}>
        <div className={css.ava}>
            <img src={props.friend.ava} />
        </div>
        <div>
            {props.friend.name}
        </div>
    </div>


const Navbar = (props) => {
    const friendsElems = props.state.friends.map(friend => <Friend friend={friend} />)

    return <nav className={css.nav}>
        <div className={css.item}><NavLink to="/profile" activeClassName={css.activeLink}>Profile</NavLink></div>
        <div className={css.item}><NavLink to="/dialogs" activeClassName={css.activeLink}>Messages</NavLink></div>
        <div className={css.item}><NavLink to="/news" activeClassName={css.activeLink}>News</NavLink></div>
        <div className={css.item}><NavLink to="/music" activeClassName={css.activeLink}>Music</NavLink></div>


        <div className={css.item}><NavLink to="/users" activeClassName={css.activeLink}>Friends</NavLink></div>

        <div className={css.friendsBlock}>


            <div className={css.friendsContainer}>
                {friendsElems}
            </div>
        </div>
    </nav>
}



export default Navbar;