
// ray test touch <
import * as React from 'react';
import clsx from 'clsx';

import { Login } from '../Login';
import { Profile } from '../Profile/Profile';
import { Auth } from '../types';

const LS_KEY = 'login-with-metamask:auth';

interface State {
  auth?: Auth;
}

const App = (): JSX.Element => {
  const [state, setState] = React.useState<State>({});

  React.useEffect(() => {
    // Access token is stored in local storage
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
          Welcome to Login with MetaMask Demo
        </h1>
      </header>
      <div className='text-lg'>
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

export {
  App
};
// ray test touch >
