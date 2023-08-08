import React from 'react';
import { Button, Form, Input, InputNumber, message } from 'antd';
import { useRegisterMutation } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    password: '${label} is not a valid password!',
    rePassword: '${label} is not a valid re-password!'
  },
};


const Regis = () => {
  const [register] = useRegisterMutation()
  const navigate = useNavigate()
  const onFinish = async (values: any) => {
    console.log(values);
    try {
      const data: any = await register(values)
      console.log(data)
      if (data?.error) {
        console.log()
        return message.error(data?.error?.data?.message || 'error')
      }
      setTimeout(() => {
        message.success("Đăng ký thành công")
        return setTimeout(() => {
          navigate('/login')
        }, 500);
      }, 500);
    } catch (error: any) {


    }
  };

  return (
    <div className="pb-24 mt-16">
      <div className="container">

        <div className="grid grid-cols-12 gap-x-5 mt-60">
          <div className="col-span-12">
            <div id="maintab">
              <ul className="custom-tab-nav flex flex-wrap items-center justify-center tw-mb-10">
                <li className="mx-2"><a className="font-semibold py-3 px-5 leading-none uppercase transition-all hover:text-orange  text-base md:text-md" href="login">login</a> <span className="inline-block ml-2">|</span></li>
                <li className="mx-2"><a className="font-semibold py-3 px-5 leading-none uppercase transition-all hover:text-orange  text-base md:text-md" href="register">register</a></li>
              </ul>

              <div>
                <div id="register" className="custom-tab-content">
                  <div className="p-8 md:p-20 shadow max-w-4xl mx-auto">
                    <Form
                      {...layout}
                      name="nest-messages"
                      onFinish={onFinish}
                      style={{ maxWidth: 600 }}
                      validateMessages={validateMessages}
                    >
                      <Form.Item name={'username'} label="Username" rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                      <Form.Item name={'email'} label="Email" rules={[{ type: 'email', required: true }]}>
                        <Input />
                      </Form.Item>
                      <Form.Item name={'password'} label="Password" rules={[
                        { required: true },
                        { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                      ]}>
                        <Input />
                      </Form.Item>
                      <Form.Item name={'confirmPassword'} label="comfirmPassword" rules={
                        [
                          {
                            required: true
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject('Mật khẩu không khớp!');
                            },
                          })
                        ]}>
                        <Input />
                      </Form.Item>
                      {/* <Form.Item name={['user', 'password']} label="Age" rules={[{ type: 'password' }]}>
                        <InputNumber />
                      </Form.Item> */}

                      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <button type="submit" className="inline-block rounded-lg leading-none uppercase text-white text-sm bg-dark px-4 py-3 transition-all hover:bg-orange">
                          <span>Register</span>
                        </button>
                      </Form.Item>
                    </Form>

                  </div>


                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Regis