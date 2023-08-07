import React, { useState } from 'react'
// import { useLoginMutation } from '../../api/auth'



const Login12 = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // const newUser = {
    //   email: email,
    //   password: password,
    // };
    if (email === 'user@example.com' && password === '123456') {
      console.log('Đăng nhập thành công!');
    } else {
      alert('Email hoặc mật khẩu không chính xác!');
    }
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
                    <form action="#" method="post" onSubmit={handleLogin}>
                      <input className="border border-solid border-gray-300 w-full py-1 px-5 mb-5 placeholder-current text-dark h-12 focus:outline-none text-base" type="text" name="user-name" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                      <input className="border border-solid border-gray-300 w-full py-1 px-5 mb-5 placeholder-current text-dark h-12 focus:outline-none text-base" type="password" name="user-password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
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

                    </form>

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