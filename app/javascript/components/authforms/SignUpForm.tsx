import React from 'react';
import { connect } from "react-redux";
import { addToken } from "../../redux/actions";
import { LoginFormProps } from './LoginForm';

interface SignUpFormState  {
    name: string,
    email: string,
    password: string,
    password_conf: string,
    error: {message: string, show: boolean}
}


export class SignUpForm extends React.Component<LoginFormProps, SignUpFormState> {
    constructor(props: Readonly<LoginFormProps>) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            password_conf: "",
            error: {message: "", show: false}
        };
        this.submitForm = this.submitForm.bind(this);
    }

    async submitForm() {
        let {name, email, password, password_conf} = this.state;
        // check if the passwords are the same
        if (password !== password_conf) {
            let error = {message: "Passwords are not the same!", show: true}
            this.setState({error: error });
            return;
        }

        let response = await fetch("v1/signup", {
            method: "POST",
            body: JSON.stringify({
                name: name, 
                email: email, 
                password: password, 
                password_confirmation: password_conf
            }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })

        let jsonResponse = await response.json();
        if (response.ok) {
            this.props.addToken(jsonResponse.auth_token);
            this.props.onSuccess();
        }
        else {
            let message = jsonResponse.message;
            this.setState({error: {message: message, show: true}});
        }
    }

    render() {

        let errorMessage = this.state.error.show ? (<div className="notification is-danger">
            <button className="delete" 
            onClick={(e) => this.setState({error: {show: false, message: this.state.error.message}})}>
            </button>{this.state.error.message}</div>) 
            : null

        return (
            <>
            {errorMessage}
            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Enter your Name"
                        onChange={e => this.setState({"name": e.target.value})} />
                </div>
            </div>
            <div className="field">
                <label className="label">Email</label>
                <div className="control">
                    <input className="input" type="email" placeholder="Enter your Email"
                        onChange={e => this.setState({"email": e.target.value})} />
                </div>
            </div>
            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input className="input" type="password" placeholder="Enter your password"
                        onChange={e => this.setState({"password": e.target.value})} required />
                </div>
            </div>
            <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                    <input className="input" type="password" placeholder="Enter your password again"
                        onChange={e => this.setState({"password_conf": e.target.value})} required />
                </div>
            </div>
            <button className={'button'} onClick={this.submitForm}>Create Account</button>
            </>
        )
    }
}

const MapDispatchToProps = dispatch => ({
    addToken: (token: string) => dispatch(addToken(token))
})

export default connect(null, MapDispatchToProps)(SignUpForm);

