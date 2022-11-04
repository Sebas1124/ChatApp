import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

  const { auth, verificarToken } = useContext( AuthContext );

  useEffect(() => {
    verificarToken();
  }, [ verificarToken ])
  

  if ( auth.checking ) {
    return <h1>Espere por favor!</h1>
  }

  return (
    <Router>
        <div>
            <Routes>
                <Route path="/auth/*" element={ <PublicRoute isAuthenticated={auth.logged}/> }></Route>
                <Route exact path='/' element={ <PrivateRoute isAuthenticated={auth.logged}/> }></Route>

                <Route path="*" element={<h1>404</h1>}></Route>
            </Routes>
        </div>
    </Router>
  )
}
