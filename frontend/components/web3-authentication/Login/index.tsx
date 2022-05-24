
// ray test touch <
import * as React from 'react';
import Web3 from 'web3';
import clsx from 'clsx';

// ray test touch <<
import { hooks } from 'connectors/meta-mask';
import { SIGN_MESSAGE_PREFIX } from 'config';
// ray test touch >>
import { Auth } from '../types';

interface Props {
  onLoggedIn: (auth: Auth) => void;
}

let web3: Web3 | undefined = undefined; // Will hold the web3 instance

const Login = ({ onLoggedIn }: Props): JSX.Element => {
  // ray test touch <<
  const provider = hooks.useProvider();
  if (provider === undefined) {
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
      const signature = await web3!.eth.personal.sign(
        `${SIGN_MESSAGE_PREFIX}${nonce}`,
        publicAddress,
        '' // MetaMask will ignore the password argument here
      );

      const signer = provider.getSigner();
      const test = await signer.signMessage(`${SIGN_MESSAGE_PREFIX}${nonce}`);
      console.log('ray : ***** signature => ', signature);
      console.log('ray : ***** test => ', test);
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
    // Check if MetaMask is installed
    if (!(window as any).ethereum) {
      window.alert('Please install MetaMask first.');
      return;
    }

    if (!web3) {
      try {
        // Request account access if needed
        await (window as any).ethereum.enable();

        // We don't know window.web3 version, so we use our own instance of Web3
        // with the injected provider given by MetaMask
        web3 = new Web3((window as any).ethereum);
      } catch (error) {
        window.alert('You need to allow MetaMask.');
        return;
      }
    }

    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      window.alert('Please activate MetaMask first.');
      return;
    }

    const publicAddress = coinbase.toLowerCase();
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
