import React, { Component } from 'react'
import './index.scss'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


export default class Index extends Component {

    constructor(props){
        super(props);
        this.state={
            formType:"login"
        }
    }
    switchForm = (value)=>{
        this.setState({...this.state,formType:value})
        
    }


    render() {
        return (
        <div className='form-wrap'>
            <div>
                {this.state.formType === "login"? 
                <LoginForm switchForm={this.switchForm}></LoginForm>:
                <RegisterForm switchForm={this.switchForm}></RegisterForm>
                }

            </div>
            
        </div>
        )
    }
}
