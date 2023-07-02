import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useAuth } from '@hooks';
import { UserProvider, ProfileProvider, AboutProvider } from '@context';
import RegisterPage from '@pages/register';
import LoginPage from '@pages/login';
import MainPage from '@common/main';

function App() {
  const { user } = useAuth();
  return user ? (
    <UserProvider>
      <ProfileProvider>
        <AboutProvider>
          <MainPage />
        </AboutProvider>
      </ProfileProvider>
    </UserProvider>
  ) : (
    <Switch>
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/register' component={RegisterPage} />
      <Route exact path='*' render={() => <Redirect exact to='/login' />} />
    </Switch>
  );
}

export default App;
