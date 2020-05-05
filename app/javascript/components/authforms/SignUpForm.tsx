import React from 'react';

interface SignUpFormState  {
    name: string,
    email: string,
    password: string,
    password_conf: string,
    error: {message: string, show: boolean}
}

class SignUpForm extends React.Component<{}, SignUpFormState> {
   
    constructor(props: Readonly<{}>) {
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

        let response = await fetch("signup", {
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

        }
        else {
            let message = jsonResponse.message;
            this.setState({error: {message: message, show: true}})
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
                        onChange={e => this.setState({"password": e.target.value})} />
                </div>
            </div>
            <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                    <input className="input" type="password" placeholder="Enter your password again"
                        onChange={e => this.setState({"password_conf": e.target.value})} />
                </div>
            </div>
            <button className={'button'} onClick={this.submitForm}>Create Account</button>
            </>
        )
    }
}

export default SignUpForm;