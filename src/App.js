import React from 'react'; //импорт из модуля react (они лежат в папке node_modules)
import logo from './logo.svg'; //импорт из файла
import './App.scss'; //импорт разметки - css классы можно использовать напрямую
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import {Route} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Users from "./components/Users/Users";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {getAuthUserDataTC} from "./realRedux/authReducer";
import {initAppTC} from "./realRedux/appReducer";
import Preloader from "./components/common/Preloader";


/*
импорты - React не даёт использовать методы из других файлов без импорта
Чтобы можно было импортировать, необходимо сначала экспортировать в исходном файле export default <<<something>>>
import <<<something>>> from <<<elsewhere>>>;
something - метод
elsewhere - путь до файла
*/



//функция, возвращающая разметку JSX (HTML в js) - это компонента
//компоненту можно использовать как тег
//<App /> -> <<<return функции>>>
//В HTML разметку просто вставляем тег <App /> и функция сама вызовется и вместо <App /> будет подставлен результат функции
/*const App = () => {
    return (
        //jsx разметка
        <div>
            <Header />
            <Technology />
        </div>

    );
}*/


/*
Роуты - перенаправляют на нужные компоненты в зависимости от URL
Корневой тег должен стать <BrowserRouter>...</BrowserRouter>

<BrowserRouter>
    ...
    <Route path="/path" component={ComponentName}/>
    ...
</BrowserRouter>
 */


/*const App = (props) =>
    <div className="app-wrapper">
        <Header />
        <Navbar state={props.state} store={props.store} />
        <div className="app-wrapper-content">
            <Route path="/login" render={ () => <Login /> } />
            <Route path="/profile/:userId?" render={ () => <Profile state={props.state} store={props.store} /> } />
            <Route path="/dialogs" render={ () => <Dialogs state={props.state} store={props.store} /> } />
            <Route path="/news" component={News}/>
            <Route path="/music" component={Music}/>
            <Route path="/users" render={ () => <Users state={props.state} store={props.store} /> } />
            <Route path="/settings" component={Settings}/>
        </div>
    </div>*/










/*function App() {
 return(<<<HTML разметка>>>);
}*/



class App extends React.Component {

    componentDidMount() {
        this.props.initApp();
        //alert("App component did mount (вмонтирована в DOM. Дедается один раз, когда первый раз показывается компонента)");
    }

    render() {
        const props = this.props;

        if (!props.inited) return <Preloader/>


        return <div className="app-wrapper">
            <Header />
            <Navbar state={props.state} store={props.store} />
            <div className="app-wrapper-content">
                <Route path="/login" render={ () => <Login /> } />
                <Route path="/profile/:userId?" render={ () => <Profile state={props.state} store={props.store} /> } />
                <Route path="/dialogs" render={ () => <Dialogs state={props.state} store={props.store} /> } />
                <Route path="/news" component={News}/>
                <Route path="/music" component={Music}/>
                <Route path="/users" render={ () => <Users state={props.state} store={props.store} /> } />
                <Route path="/settings" component={Settings}/>
            </div>
        </div>
}
}


const mapStateToProps = (state) => ({
    inited: state.app.inited,
});
const mapDispatchToProps = {
    initApp: initAppTC,
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
