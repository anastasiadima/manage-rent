import React, { Component } from 'react';
import { userService } from '../services/user.service';
import { Link } from 'react-router-dom';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            confirmPassword: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.validForm = this.validForm.bind(this);
        this.invalidPassword = this.invalidPassword.bind(this);
    }

    handleChange(e) {
        if (e.target.id === "confirmPassword"){
            this.setState({
                confirmPassword: event.target.value
            });
        } else {
            const { id, value } = event.target;
            const { user } = this.state;
            
            this.setState({
                user: {
                    ...user,
                    [id]: value
                }
            });
        }
    }

    handleRegister(e){
        e.preventDefault();
        var user = this.state.user;

        userService.register(user).then(
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

    invalidPassword(){
        if( this.state.user.password !== this.state.confirmPassword)
            return true;
        return false;
    }

    validForm(){
        var user = this.state.user;
        if(user.username.length > 0 && user.firstName.length > 0 && user.lastName.length > 0 && user.password.length > 0 && !this.invalidPassword ){
            return true;
        }

        return false;
    }

    render() { 
        return ( 
            <div  className="col-md-4 offset-md-4">
                <h2>Register</h2>
                <form onSubmit={this.handleRegister}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" id="firstName" onChange={(event) => this.handleChange(event)} aria-describedby="usernameHelp" ></input>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" id="lastName" onChange={(event) => this.handleChange(event)} aria-describedby="usernameHelp" ></input>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" id="username" onChange={(event) => this.handleChange(event)} aria-describedby="usernameHelp"></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" id="password" onChange={(event) => this.handleChange(event)} aria-describedby="usernameHelp" ></input>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password </label>
                        <input type="password" className="form-control" id="confirmPassword" onChange={(event) => this.handleChange(event)} aria-describedby="usernameHelp" ></input>
                        <small hidden={!this.invalidPassword() || this.state.user.password.length ===0} id="errorMessage" className="form-text text-danger">Conform password doesn't match password</small>
                    </div>
                    <button className="btn btn-primary"  >Register</button>
                    <Link to="/login" className="m-4">Login</Link>
                </form>
            </div>
         );
    }
}
 
export default RegisterPage;