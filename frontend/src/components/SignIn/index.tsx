import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import type { FormProps } from 'antd';
import { Button, ConfigProvider, Form, Input, Alert } from 'antd';
import SignInFunction from '@/functions/signin';
import Head from 'next/head';

type FieldType = {
  username?: string;
  email?: string
  password?: string;
  confirmPassword?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
  const result = await SignInFunction(values);
  
  if(result) {
    location.reload();
  }
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  console.log(e, 'I was closed.');
};

const FormSignIn: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "black",
        fontSize: 17,
        colorText: "white"
      },
      components: {
        Form: {
          labelRequiredMarkColor: "none"
        },
        Input: {
          hoverBg: "none",
          hoverBorderColor: "none"
        },
        Button: {
          defaultBorderColor: "none"
        }
      }
    }}
  >
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >      

      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please enter your email!' }]}
      >
        <Input bordered={false} />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password!' }]}
      >
        <Input.Password bordered={false} />
      </Form.Item>      

      {/* <Form.Item<FieldType>
      name="remember"
      valuePropName="checked"
      wrapperCol={{ offset: 8, span: 16 }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </ConfigProvider>
);

const SignIn: React.FC = () => {  
  return (
    <>
      <style>
        {
          `           
            .ant-input-affix-wrapper, .ant-input {
              background: #dad9d97a;
              border-bottom: #ddd !important;
            }
            .ant-input-affix-wrapper-focused, .ant-input:focus {
              animation: focus 0.5s
            }
            label::before {
              display: none !important;
            }
            @keyframes focus {
              0% {scale: 1.0;}
              50% {scale: 1.1;}
              100% {scale: 1.0;}
            }
            .ant-btn {
              border: 2px solid white;
              padding: 1rem 4rem 1rem 4rem;
              background: #fff;
              color: black;
              transition: 0.5s all !important;              
            } 
            .ant-btn:hover {
              scale: 1.1;
            }            
          `
        }
      </style>
      {/* <Alert
        message="Error"
        description="Please confirm your password agian!"
        type="error"
        showIcon
        className={`absolute z-20 right-2 top-24 ${isShow}`}
        closable
        onClose={onClose}
       /> */}

      <div className="flex items-center justify-center gap-8 bg-slate-100 rounded-lg drop-shadow-[0_0_10px_rgba(0,0,0,0.3)] my-10 relative
          before:w-1/3 before:absolute before:h-full before:left-0 before:bg-black before:rounded-lg
      ">
        <div className="w-1/3 float-left flex flex-wrap flex-col items-center justify-center duration-1000 delay-1000 transition gap-4 pl-5">
          <h2 className='text-5xl font-bold text-center text-white z-10'>Hello friend!</h2>
          <hr className="w-3/4 h-0.5 bg-white z-10" />
          <h4 className='text-xl text-center text-white z-10'>Sign in your account using email and password</h4>
          <FormSignIn />
        </div>
        <div className="w-2/3 float-right">
          <img src="/images/home.png" alt="" className='rounded-lg' />
        </div>
      </div>
    </>
  );
}

export default SignIn;