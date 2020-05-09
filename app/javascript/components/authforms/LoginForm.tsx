import React from 'react';
import { connect } from 'react-redux';
import { addToken } from '../../redux/actions';

interface LoginFormState {
    email: string,
    password: string,
    error: {message: string, show: boolean}
}

interface FormProps {
    onSuccess?: () => void
}

export interface LoginFormProps extends FormProps {
    addToken: (token: string) => void
}

export class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
    constructor(props: Readonly<LoginFormProps>) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: {message: "", show: false}
            
        };
        this.submitForm = this.submitForm.bind(this);
    }


    async submitForm() {
        let response = await fetch("v1/auth/login", {
            method: 'POST',
            body: JSON.stringify({email: this.state.email, password: this.state.password}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
             }
        });
        let jsonResponse = await response.json();
        if (response.ok) {
            this.props.addToken(jsonResponse.auth_token);
            this.props.onSuccess()
        }
        else {
           this.setState({
               error: {message: jsonResponse.message, show: true}
            });
        }
    }


    render() {
        let errorMessage = this.state.error.show ? (<div className="notification is-danger">
            <button className="delete" 
            onClick={(e) => this.setState({error: {show: false, message: this.state.error.message}})}>
            </button>{this.state.error.message}</div>) 
            : null;

        let errorFormClass = this.state.error.show ? "is-danger": "";
        return (
            <React.Fragment>
                {errorMessage}
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className={`input ${errorFormClass}`} type="email" placeholder="Enter your email"
                        onChange={ (e) => this.setState({email: e.target.value}) }/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className={`input ${errorFormClass}`} type="password" placeholder="Enter your password" 
                        onChange={ (e) => this.setState({password: e.target.value}) }/>
                    </div>
                </div>
                <div className="field">
                   <div className="control">
                        <button className="button is-primary" onClick={this.submitForm}>Submit</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const MapDispatchToProps = dispatch => ({ 
    addToken: (token: string) => dispatch(addToken(token))
});

export default connect(null, MapDispatchToProps)(LoginForm);