import { useState } from 'react'

import {toast} from 'react-hot-toast'
import 'bootstrap/dist/css/bootstrap.min.css';
import { authService } from '../services/authService';
import {useNavigate} from 'react-router-dom'
//npm run dev
export default function Login() {
  const navigate= useNavigate()
  const [data, setData]= useState({
    email: '',
    password: ''
  })
  const loginUser = async (e) => {
    e.preventDefault();
    const {email, password}=data

    try {
      const response = await authService.login({ email, password });
      console.log(response); // Log the entire response to inspect its structure

      if (response.data && response.data.error) {
        toast.error(response.data.error);
      } else if (response.data && response.data.accessToken) {
        authService.setToken(response.data.accessToken);
        toast.success('Login successful!');
        navigate('/welcome');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Login failed. Please try again.');
    }
  };
  return (
    <section className="vh-100 gradient-custom " >
      <div className="container py-5   h-40">
        <div className="row d-flex justify-content-centeralign-items-center h-10"style={{ width: '1000px' }}>
          <div className="col col-xl content-ali " >
            <div className="card p-4 shadow" style={{ borderRadius: '1rem' }}
>
              <div className="row g-0">
                <div className="col-md-3 col-md-4 d-none d-md-block">
                  <img
                    src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fG1lZGljYWx8ZW58MHx8MHx8fDA%3D"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: '1rem 0 0 1rem' }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={loginUser}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        <span className="h1 fw-bold mb-0">Login</span>
                      </div>
                      <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form2Example17">
                          Email address
                        </label>
                        <input
                          type='email' placeholder='enter email..' value={data.email} onChange={(e)=>{
                            setData({...data, email: e.target.value})}}
                          className="form-control form-control-lg"
                        />

                      </div>

                      <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form2Example27">
                          Password
                        </label>
                        <input
                          type='password' placeholder='enter password..'
                          value={data.password} onChange={(e)=>{setData({...data, password: e.target.value})}}
                          className="form-control form-control-lg"
                        />

                      </div>

                      <div className="pt-1 mb-4">
                        <button className="btn text-white bg-black color btn-lg btn-block" type='submit'>
                          Login
                        </button>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
