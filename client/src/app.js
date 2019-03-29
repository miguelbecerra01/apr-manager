//react
import React from 'react';
import ReactDOM from 'react-dom';
//add firebase file to the app
import { firebase } from './firebase/firebase';
//redux
import { Provider } from 'react-redux';
import * as moment from 'moment/moment';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import LoadingPage from './components/LoadingPage';
import DashboardPage from './components/DashboardPage';

//styles
import './styles/styles.scss';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';


//change the datepicker to spanish
moment.locale('es');

const store = configureStore();
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);


let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

//show loading screen while the data is populating into Redux from Firebase
ReactDOM.render(<LoadingPage />, document.getElementById('app'));


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        // store.dispatch(startSetExpenses()).then(() => {
        renderApp();
        //if the user is in the login page, only redirect when the user is en login page
        if (history.location.pathname === '/') {
            history.push('/dashboard');
        }
        // });
    } else {
        store.dispatch(logout());
        renderApp();
        //go to login page
        history.push('/');
    }
});