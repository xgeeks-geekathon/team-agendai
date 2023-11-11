import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { trackPageview } from '@core/tracking';
import { RoutingContext } from '@core/contexts';
import { BodyLoading } from '@core/components/layout/BodyLoading';

import { AuthContext } from '@modules/Auth/contexts';
import { Authenticated, NotAuthenticated } from '@modules/Auth/components';
import { Login } from './Auth/Login';
import { Signup } from './Auth/Signup';
import { ResetPassword } from './Auth/ResetPassword';
import { GoogleCallback } from './Auth/GoogleCallback';
import { Home } from './Home/Home';
import { Profile } from './Users/Profile';
import { Onboarding } from './Users/Onboarding';
import { Boards } from './Board/Boards';
import { Board } from './Board/Board';

export const Root = () => {
  const { router } = React.useContext(RoutingContext);
  const { status } = React.useContext(AuthContext);
  const location = useLocation();

  React.useEffect(() => {
    trackPageview();
  }, [location]);

  if(status === 'pending') {
    return <BodyLoading height="100vh"/>;
  }

  return (
    <React.Fragment>
      <NotAuthenticated>
        <Routes>
          <Route path={router.auth.login.path} element={<Login/>}/>
          <Route path={router.auth.resetPassword.path} element={<ResetPassword/>}/>
          <Route path={router.auth.signup.path} element={<Signup/>}/>
          <Route path={router.auth.google.callback.path} element={<GoogleCallback/>}/>
          <Route path="*" element={<Navigate to={router.auth.login.path}/>}/>
        </Routes>
      </NotAuthenticated>
      <Authenticated>
        <Routes>
          <Route path={router.home.path} element={<Home/>}/>
          <Route path={router.onboarding.step().path} element={<Onboarding/>}/>
          <Route path={router.profile.path} element={<Profile/>}/>
          <Route path={router.boards.path} element={<Boards/>}/>
          <Route path={router.boards.view().path} element={<Board/>}/>
          <Route path="*" element={<Navigate to={router.home.path}/>}/>
        </Routes>
      </Authenticated>
    </React.Fragment>
  );
};
