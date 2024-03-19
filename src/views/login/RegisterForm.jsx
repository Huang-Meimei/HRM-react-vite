import React, { Component } from 'react'
import {Form, Input, Button, Checkbox,Row,Col, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import { validate_password,validate_email } from '../../utils/validate';
import Code from '../../components/code/index'
import {register} from '../../api/account'
import { encrypt_pw } from '../../utils/encrypt';

export default class RegisterForm extends Component {
    constructor(){
        super();
        this.state={
            username:"",
            email:"",
            password:"",
            err_msg_pw:""
        }
    }

    
    onFinish = values =>{
        console.log("receive values from inputs ",values)
        let username;
        if (values.username==undefined){
            username=crypto.randomUUID()
        }
        const payload = {
            "username":username,
            "email":values.email,
            "password":encrypt_pw(values.password),
            "code":values.code,
        }
        console.log(payload)
        register(payload).then(response=>{
            message.success("Registration Success!")
            if(response.data.resCode ===0){
                this.toggleForm()
            }

        }).catch(err=>{
            message.error("Registration Error!")
        })
    }

    toggleForm = ()=>{
        this.props.switchForm("login")
    }
  render() {
    const {email,password} = this.state
    const _this = this

    return (
        
        <>
        <div className='form-header'>
            <h4 className='column'>Sign In</h4>
            <span><Button type='text' onClick={this.toggleForm}>Log In</Button></span>
        </div>
        <div className='form-content'>
        <Form
        name='normal-signin'
        className='login-form'
        initialValues={{remember:true}}
        onFinish={this.onFinish}>
            <Form.Item name='email' rules={
                [
                    {
                        required:true,
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
                <Input prefix={<UserOutlined className='site-form-item-icon'></UserOutlined>} placeholder='Email'></Input>
            </Form.Item>
            <Form.Item name='password' rules={
                [
                    {required:true,message:'Please input your password!'},
                    {min:6,message:"Password should not be less than 6 digits!"},
                    {max:20,message:"Password should not be more than 20 digits!"},
                    {pattern:validate_password,message:"Password should consist of both digits and letters!"},
                    ({getFieldValue})=>({
                        validator(rule,value){
                            let pw_v = getFieldValue('verify-password')
                            if (pw_v&&pw_v !==value){
                                return Promise.reject("Two passwords do not match!");
                            }

                            return Promise.resolve()
                        }
                    })
                    
                ]
                }>
                <Input prefix={<LockOutlined className='site-form-item-icon'></LockOutlined>} placeholder='Password'></Input>
            </Form.Item>
            <Form.Item name='verify-password' rules={
                [
                    {required:true,message:'Please enter your password again!'},
                    ({getFieldValue})=>({
                        validator(rule,value){
                            if ( getFieldValue('password')!==value){
                                return Promise.reject("Two passwords do not match!");
                            }
                            return Promise.resolve()
                        }
                    })
                ]
                }>
                <Input prefix={<LockOutlined className='site-form-item-icon'></LockOutlined>} placeholder='Password again'></Input>
            </Form.Item>
            <Form.Item name='code' rules={
                [
                    {required:true,message:'Please enter code!'},
                    {len:6,message:"Please enter 6-digit code!"}
                ]
                }>
                <Row gutter={10}>
                    <Col span={16}>
                        <Input  placeholder='Verification Code'></Input>
                    </Col>
                    <Col span={8}>
                        <Code data={email} dataType={"email"} module={"register"}></Code>
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item  >
                <Button block type='default' htmlType='submit' className='signin-form-button'>Sign In</Button>
            </Form.Item>

        </Form>

    </div>
    </>
    )
  }
}
