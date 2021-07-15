import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'; //импорт всех функций как функций объекта serviceWorker
import store from "./realRedux/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux"; //провайдер контекста, созданного редаксом


const rerenderEntireTree = (state, store) => {
    // внутрь 'root' отрисовывается <App />
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <App state={state} store={store}/>
                </Provider>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

// не надо
/*store.subscribe(() => {
    rerenderEntireTree(store.getState(), store)
})*/

//store.addOnStateChangedListener(rerenderEntireTree);
rerenderEntireTree(store.getState(), store)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
