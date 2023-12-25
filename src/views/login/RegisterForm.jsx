import React, { Component } from 'react'
import {Form, Input, Button, Checkbox,Row,Col} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import { validate_password } from '../../utils/validate';

export default class RegisterForm extends Component {
    toggleForm = ()=>{
        this.props.switchForm("login")
    }
  render() {
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
            <Form.Item name='username' rules={[{required:true,message:'Please input your username!'}]}>
                <Input prefix={<UserOutlined className='site-form-item-icon'></UserOutlined>} placeholder='Username'></Input>
            </Form.Item>
            <Form.Item name='password' rules={[{required:true,message:'Please input your password!'}]}>
                <Input onChange={this.onFinish} prefix={<LockOutlined className='site-form-item-icon'></LockOutlined>} placeholder='Password'></Input>
            </Form.Item>
            <Form.Item name='verify-password' rules={[{required:true,message:'Please input your password again!'}]}>
                <Input onChange={this.onFinish} prefix={<LockOutlined className='site-form-item-icon'></LockOutlined>} placeholder='Password again'></Input>
            </Form.Item>
            <Form.Item name='code' rules={[{required:true,message:'Please input code!'}]}>
                <Row gutter={10}>
                    <Col span={16}>
                        <Input  placeholder='Verification Code'></Input>
                    </Col>
                    <Col span={8}>
                        <Button block type="primary" danger>
                            Get Code
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item name='submit' rules={[{required:true}]}>
                <Button block type='default' htmlType='submit' className='login-form-button'>Sign Up</Button>
            </Form.Item>

        </Form>

    </div>
    </>
    )
  }
}
