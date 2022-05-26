
import * as React from 'react';
import clsx from 'clsx';

import Login from './Login';
import Profile from './Profile';
import { Auth } from './types';

const LS_KEY = 'login-with-metamask:auth';

interface State {
  auth?: Auth;
}

const Web3AuthApp = (): JSX.Element => {
  const [state, setState] = React.useState<State>({});

  React.useEffect(() => {
    // Access token is stored in the local storage
    const ls = window.localStorage.getItem(LS_KEY);
    const auth = ls && JSON.parse(ls);
    setState({ auth });
  }, []);

  const handleLoggedIn = (auth: Auth) => {
    localStorage.setItem(LS_KEY, JSON.stringify(auth));
    setState({ auth });
  };

  const handleLoggedOut = () => {
    localStorage.removeItem(LS_KEY);
    setState({ auth: undefined });
  };

  const { auth } = state;

  return (
    <div
      className={clsx(
        'text-center',
        'space-y-8'
      )}>
      <header
        className={clsx(
          'bg-gray-900',
          'p-5',
          'text-white'
        )}>
        <h1 className='text-2xl'>
          Welcome to Octav technical project
        </h1>
      </header>
      <div
        className={clsx(
          'text-lg',
          'p-4'
        )}>
        {auth ? (
          <Profile
            auth={auth}
            onLoggedOut={handleLoggedOut} />
        ) : (
          <Login onLoggedIn={handleLoggedIn} />
        )}
      </div>
    </div>
  );
};

export default Web3AuthApp;
