import React, { Component } from 'react';
import { authenticationService } from '../services/authentication.service';
import { Link} from 'react-router-dom';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        };

        this.submitLogin = this.submitLogin.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.isDisabled = this.isDisabled.bind(this);

        if (authenticationService.currentUserValue) { 
            this.props.history.push('/');
        }
    }

    submitLogin (e) {
        e.preventDefault();

        var username = this.state.username;
        var password= this.state.password;

        authenticationService.login(username, password)
        .then(
            user => {
                const { from } = this.props.location.state || { from: { pathname: "/" } };
                this.props.history.push(from);
            },
            error => {
                this.setState({
                    errorMessage: error
                });
            }
        );
    }

    handleOnChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    isDisabled(){
        if (this.state.username.length > 0 && this.state.password.length > 0)
            return false;
        return true;
    }

    render() {
        return (
            <div className="col-md-4 offset-md-4 justify-content-center">
                <h2>Login</h2>
                <form onSubmit={this.submitLogin}>
                    <small id="errorMessage" className="form-text text-danger">{this.state.errorMessage}</small>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" id="username" onChange={(event) => this.handleOnChange(event)} aria-describedby="usernameHelp" placeholder="Enter username"></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" id="password" onChange={(event) => this.handleOnChange(event)}  aria-describedby="passwordHelp" placeholder="Enter password"></input>
                    </div>
                    <button disabled={this.isDisabled()} className="btn btn-primary" >Submit</button>
                    <Link to="/register" className="btn btn-link">Register</Link>
                </form>
            </div>
        );
    }
}

export default Login;