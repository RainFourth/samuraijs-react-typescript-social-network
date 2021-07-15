import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import friendsReducer from "./friendsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import {reducer as formReducer} from "redux-form"
import appReducer from "./appReducer"; //импорт библиотечного редьюсера форм



/*
reducer - функция,  принимающая часть state и action, изменяющая state в соответствии с action, и возвращающая его
 */

/*
создаём объект, где имя переменной является полем в state, а значение поля - reducer к переменной в store
 */
const reducers = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    friends: friendsReducer,
    users: usersReducer,
    auth: authReducer,
    form: formReducer, //имя именно form !!!!!!!
    app: appReducer,
})

//переменные и reducer'ы автоматически создадутся и привяжутся
const store = createStore(reducers, applyMiddleware(thunkMiddleware))

// для дебага, чтобы в консоли браузера смотреть чё там лежит
window.store = store;

export default store;






