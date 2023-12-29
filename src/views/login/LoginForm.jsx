import React, { Component } from 'react'
import {Form, Input, Button,Row,Col, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import { validate_email, validate_password } from '../../utils/validate';
import { login,getUsers ,getCode} from '../../api/account';
import Code from '../../components/code/index'
import { encrypt_pw } from '../../utils/encrypt';


export default class LoginForm extends Component {

    constructor(){
        super();
        this.state={
            username:"",
            email:"",
            password:"",
            code:""
        }
    }


    // inputChange=(e)=>{
    //     let value = e.target.value
    //     console.log(value)
    //     this.setState({...this.state,username:value})
    // }

    onFinish = values =>{
        console.log("receive values from inputs ",values)
        const payload = {
            "email":values.email,
            "password":encrypt_pw(values.password),
            "code":values.code,
        }
        console.log(payload)
        login(payload).then(response=>{
            console.log(response)
            message.success("Log In Success!")
            if(response.data.resCode ===0){
                
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    toggleForm = ()=>{
        this.props.switchForm("register")
    }
  render() {
    const {email} = this.state;
    const _this = this;
    return (
        <>
        <div className='form-header'>
            <h4 className='column'>Log In</h4>
            <span><Button type='text' onClick={this.toggleForm}>Sign In</Button></span>
        </div>
        <div className='form-content'>
        <Form
        name='normal-login'
        className='login-form'
        initialValues={{remember:true}}
        onFinish={this.onFinish}>
            <Form.Item name='email' rules={
                [
                    {required:true,
                    message:'Please input your email!'
                    },
                    {
                        type:"email",
                        message:"Incorrect email format!"
                    },
                    ({getFieldValue})=>({
                        validator(rule,value){
                            if (validate_email(value)){
                                _this.setState({..._this.state,email:value})
                                return Promise.resolve();
                            }
                            return Promise.reject("Please enter an email in correct format!");
                        }
                    })
                ]}>
                <Input prefix={<UserOutlined className='site-form-item-icon'></UserOutlined>} placeholder='Email' ></Input>
            </Form.Item>
            <Form.Item name='password' rules={
                [
                    {required:true,message:'Please input your password!'},
                    {min:6,message:"Password should not be less than 6 digits!"},
                    {max:20,message:"Password should not be more than 20 digits!"},
                    {pattern:validate_password,message:"Password should consist of both digits and letters!"},
                    // ({getFieldValue})=>({
                    //     validator(rule,value){
                    //         if (!value|| getFieldValue(`password`)){
                    //             if (value<6 || value >20){
                    //                 return Promise.reject(`The password is less than 6 digits or more than 20 digits!`);
                    //             }else if (){
                    //                 return Promise.reject(`The two passwords are different!`);
                    //             }
                    //             return Promise.resolve();
                    //         }
                    //         return Promise.reject(`The two passwords are different!`);
                    //     }
                    // })
                ]
                }>
                <Input prefix={<LockOutlined className='site-form-item-icon'></LockOutlined>} placeholder='Password' ></Input>
            </Form.Item>
            <Form.Item name='code' rules={
                [
                    {required:true,message:'Please input code!'},
                    {len:6,message:"Please enter 6-digit code!"}
                    ]
                }>
                <Row gutter={10}>
                    <Col span={16}>
                        <Input  placeholder='Verification Code'></Input>
                    </Col>
                    <Col span={8}>
                        
                        <Code data={email} dataType={"email"} module={"login"}></Code>
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item >
                <Button block type='default' htmlType='submit' className='login-form-button'>Log In</Button>
            </Form.Item>

        </Form>

    </div>
    </>
    )
  }
}
