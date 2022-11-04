import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from './../pages/LoginPage';
import { Route, Routes } from 'react-router-dom';

import '../css/login-register.css'

export const AuthRouter = () => {
  return (

    <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100 p-t-50 p-b-90">

                <Routes>
                    <Route path='/login' element={ <LoginPage/> }></Route>
                    <Route path='/register' element={ <RegisterPage/> }></Route>

                    <Route path="*" element={<h1>404</h1>}></Route>
                </Routes>

            </div>
        </div>
    </div>
  )
}
