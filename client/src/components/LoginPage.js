import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { startLogin, createAccount, loginWithPassword } from '../actions/auth';

//export const LoginPage = ({ startLogin, createAccount }) => {
export class LoginPage extends React.Component {
    // const[username, setusername] = useState('');
    // const[password, setPassword] = useState('');
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        }
    }
    onChangeusername = (e) => {
        const username = e.target.value;

        this.setState(() => ({
            username
        }))
    };

    onChangePassword = (e) => {
        const password = e.target.value;
        this.setState(() => ({
            password
        }))
    };

    onCreateAccount = (username, password) => {
        this.props.createAccount(username, password);
    };
    onStartLogin = () => {
        this.props.startLogin();
    }
    onLoginWithPassword = (username, password) => {
        this.props.loginWithPassword(username, password).catch((error) => {
            this.setState(() => ({ error: error.message }))
        });
    }
    render() {
        return (
            <div className="box-layout">
                <div className="box-layout__box">
                    <h1 className="box-layout__title">Bolerplate</h1>
                    <p>Tag line for app</p>
                    <button className="button" onClick={this.onStartLogin}>Login with Google</button>

                    <p>create a new user</p>
                    <span className="is-active">{this.state.error}</span><br></br>
                    <label>username: </label><input placeholder="username" value={this.state.username} onChange={this.onChangeusername}></input>
                    <label>password:</label> <input type="password" placeholder="password" value={this.state.password} onChange={this.onChangePassword}></input>
                    <button onClick={() => { this.onCreateAccount(this.state.username, this.state.password) }}>  Create Account</button>
                    <button onClick={() => { this.onLoginWithPassword(this.state.username, this.state.password) }}>Login</button>

                </div>
            </div>
        )
    }
};


const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin()),
    createAccount: (username, password) => dispatch(createAccount(username, password)),
    loginWithPassword: (username, password) => dispatch(loginWithPassword(username, password))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);