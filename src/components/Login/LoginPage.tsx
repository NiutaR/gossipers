import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';

import background1 from '../../assets/images/background1.jpg';
import background2 from '../../assets/images/background2.jpg';

import './LoginPage.module.css';

const LoginPage = () => {
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const dispatch = useDispatch();

  const [showBackground1, setShowBackground1] = useState(true);

  const onFinish = (values: { email: string; password: string; rememberMe: boolean; captcha: string; }) => {
    dispatch(login(values.email, values.password, values.rememberMe, values.captcha));
  };

  // Используем useEffect для автоматического переключения фоновых изображений через определенное время
  useEffect(() => {
    const interval = setInterval(() => {
      setShowBackground1((prevShowBackground1) => !prevShowBackground1);
    }, 5000);


    return () => clearInterval(interval);
  }, []); 

  if (isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="login-page-container">
      {showBackground1 && (
        <img
          src={background1}
          alt="background1"
          className="background-image"
        />
      )}
      {!showBackground1 && (
        <img
          src={background2}
          alt="background2"
          className="background-image"
        />
      )}

      <h1>Login</h1>
      <Form name="login" onFinish={onFinish} style={{ width: '500px' }}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item name="rememberMe" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        {captchaUrl && (
          <div>
            <img src={captchaUrl} alt="link-captcha" />
            <Form.Item
              name="captcha"
              rules={[
                {
                  required: true,
                  message: 'Please input the symbols from the image!',
                },
              ]}
            >
              <Input placeholder="Symbols from image" />
            </Form.Item>
          </div>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
