//Higher order Component (HOC) - A Component (HOC) that renders another component
//Reuse Code
//Render hijacking
//Prop manipulation
//Abstract state


/*
//example: action/expenses.js as 4 exported functions
//with this you dump all the functions into one object
//so then you can call it from there...
import * as expensesActions from '../actions/expenses';
expensesActions.addExpense
expensesActions.editExpense...and so on

*/


import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>Logged In! </p>
        <p>Your info is {props.info}</p>
    </div>
);

// <WrappedComponent {...props}/> spread the props variable and send it to the child (Info component)
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Please don't share!</p>}
            <WrappedComponent {...props} />
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    //() is implicit return, so no return key is needed to use
    return (props) => (
        <div>
            {props.isAuthenticated ? (<WrappedComponent {...props} />) : (<p>Please Login!</p>)}

        </div>
    );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info="this is the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="Miguel, last logged September, 21th 2018" />, document.getElementById('app'));

