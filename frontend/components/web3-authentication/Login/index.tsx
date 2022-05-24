
// ray test touch <
import * as React from 'react';
import clsx from 'clsx';

// ray test touch <<
import { hooks } from 'connectors/meta-mask';
import { SIGN_MESSAGE_PREFIX } from 'config';
// ray test touch >>
import { Auth } from '../types';

interface Props {
  onLoggedIn: (auth: Auth) => void;
}

const Login = ({ onLoggedIn }: Props): JSX.Element => {
  // ray test touch <<
  const provider = hooks.useProvider();
  if (provider === undefined) {
    throw new Error('Something went wrong!');
  }
  const account = hooks.useAccount();
  if (account === undefined) {
    throw new Error('Something went wrong!');
  }
  // ray test touch >>

  // TODO: should follow https://kentcdodds.com/blog/stop-using-isloading-booleans
  const [loading, setLoading] = React.useState(false); // Loading button state

  const handleAuthenticate = ({
    publicAddress,
    signature
  }: {
    publicAddress: string;
    signature: string;
  }) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`, {
      body: JSON.stringify({ publicAddress, signature }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => response.json());

  const handleSignMessage = async ({
    publicAddress,
    nonce
  }: {
    publicAddress: string;
    nonce: string;
  }) => {
    try {
      // ray test touch <<
      const signer = provider.getSigner();
      const signature = await signer.signMessage(`${SIGN_MESSAGE_PREFIX}${nonce}`);
      // ray test touch >>

      return {
        publicAddress,
        signature
      };
    } catch (error) {
      throw new Error('You need to sign the message to be able to log in.');
    }
  };

  const handleRegister = (publicAddress: string) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
      body: JSON.stringify({ publicAddress }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => response.json());

  const handleClick = async () => {
    const publicAddress = account.toLowerCase();
    setLoading(true);

    // Look if user with current publicAddress is already present on backend
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users?publicAddress=${publicAddress}`
    )
      .then(response => response.json())
    // If yes, retrieve it. If no, create it.
      .then(users =>
        users.length ? users[0] : handleRegister(publicAddress)
      )
    // Popup MetaMask confirmation modal to sign message
      .then(handleSignMessage)
    // Send signature to backend on the /auth route
      .then(handleAuthenticate)
    // Pass accessToken back to parent component (to save it in localStorage)
      .then(onLoggedIn)
      .catch(error => {
        window.alert(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <p>
        Login to continue to your Octav account.
      </p>
      <button
        className={clsx(
          'text-white',
          'block',
          'text-base',
          'w-72',
          'h-14',
          'mt-2.5',
          'mx-auto',
          'bg-yellow-500',
          'hover:bg-opacity-90'
        )}
        onClick={handleClick}>
        {loading ? 'Loading...' : 'Login with MetaMask'}
      </button>
    </div>
  );
};

export default Login;
// ray test touch >
