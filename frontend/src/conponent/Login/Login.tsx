import { Form, Input, message } from 'antd';
import { useLoginMutation } from '../../api/auth';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { signin } from '../../Slices/Auth';
import { useNavigate } from 'react-router-dom';


type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const Login12 = () => {
  const [Login] = useLoginMutation()
  const data = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    try {
      const data: any = await Login(values);

      const dataUser = {
        accessToken: data?.data?.accessToken,
        ...data?.data?.user
      }
      if (data?.error) {
        console.log(data)
        return message.error(data?.error?.data?.message || 'error')
      }
      dispatch(signin(dataUser))
      message.success("Đăng nhập thành công")
      setTimeout(() => {
        navigate('/')
      }, 1000);
    } catch (error) {

      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="pb-24 mt-16">
      <div className="container">

        <div className="grid grid-cols-12 gap-x-5 mt-60">
          <div className="col-span-12">
            <div id="maintab">
              <ul className="custom-tab-nav flex flex-wrap items-center justify-center mb-10">
                <li className="mx-2"><a className="font-semibold py-3 px-5 leading-none uppercase transition-all hover:text-orange  text-base md:text-md" href="login">login</a> <span className="inline-block ml-2">|</span></li>
                <li className="mx-2"><a className="font-semibold py-3 px-5 leading-none uppercase transition-all hover:text-orange  text-base md:text-md" href="register">register</a></li>
              </ul>

              <div>
                <div id="login" className="custom-tab-content">
                  <div className="p-8 md:p-20 shadow max-w-4xl mx-auto">
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
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                          },
                          {
                            required: true,
                            message: 'Please input your E-mail!',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                      >
                        <Input.Password />
                      </Form.Item>
                      {/* 
                      <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                      >
                        <Checkbox>Remember me</Checkbox>
                      </Form.Item> */}

                      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <button type="submit" className="rounded-lg inline-block leading-none uppercase text-white text-sm bg-dark px-4 py-3 transition-all hover:bg-orange">
                          <span>Login</span>
                        </button>
                      </Form.Item>
                    </Form>
                    {/* <form action="#" method="post" >
                      <input className="border border-solid border-gray-300 w-full py-1 px-5 mb-5 placeholder-current text-dark h-12 focus:outline-none text-base" type="text" name="user-name" placeholder="Email" />
                      <input className="border border-solid border-gray-300 w-full py-1 px-5 mb-5 placeholder-current text-dark h-12 focus:outline-none text-base" type="password" name="user-password" placeholder="Password" />
                      <div className="button-box">
                        <div className="mb-4">
                          <input id="remember" type="checkbox" />
                          <label htmlFor="remember" className="cursor-pointer">Remember me</label>
                          <span>Or</span>
                          <a href="#" className="inline-block mx-2 text-orange">Forgot Password?</a>
                        </div>
                        <a href="#" className="inline-block leading-none uppercase text-white text-sm bg-dark px-5 py-4 transition-all hover:bg-orange">
                          <span>Login</span>
                        </a>
                      </div>

                    </form> */}

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

export default Login12