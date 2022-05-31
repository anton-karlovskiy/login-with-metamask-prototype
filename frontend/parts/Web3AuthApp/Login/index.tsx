
import * as React from 'react';
import clsx from 'clsx';

import OctavYellowContainedButton from 'components/buttons/OctavYellowContainedButton';
import { hooks } from 'connectors/meta-mask';
import { SIGN_MESSAGE_PREFIX } from 'config';
import STATUSES from 'utils/constants/statuses';
import { Auth } from '../types';

interface Props {
  onLoggedIn: (auth: Auth) => void;
}

const Login = ({ onLoggedIn }: Props): JSX.Element => {
  const provider = hooks.useProvider();
  if (provider === undefined) {
    throw new Error('Something went wrong!');
  }
  const account = hooks.useAccount();
  if (account === undefined) {
    throw new Error('Something went wrong!');
  }

  const [submitStatus, setSubmitStatus] = React.useState(STATUSES.IDLE);

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
      const signer = provider.getSigner();
      const signature = await signer.signMessage(`${SIGN_MESSAGE_PREFIX}${nonce}`);

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
    setSubmitStatus(STATUSES.PENDING);

    // Look if the user with the current publicAddress is already present on the backend
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users?publicAddress=${publicAddress}`
    )
      .then(response => response.json())
    // If yes, retrieve it. If no, create it
      .then(users =>
        users.length ? users[0] : handleRegister(publicAddress)
      )
    // Popup a MetaMask confirmation modal to sign a message
      .then(handleSignMessage)
    // Send the signature to the backend on the `/auth` route
      .then(handleAuthenticate)
    // Pass `accessToken` back to its parent component (to save it in the local storage)
      .then((auth: Auth) => {
        onLoggedIn(auth);
        setSubmitStatus(STATUSES.RESOLVED);
      })
      .catch((error: any) => {
        window.alert(error?.message);
        setSubmitStatus(STATUSES.REJECTED);
      });
  };

  return (
    <div>
      <p>
        Login to continue to your Octav account.
      </p>
      <OctavYellowContainedButton
        className={clsx(
          'block',
          'mt-2.5',
          'mx-auto'
        )}
        onClick={handleClick}
        pending={submitStatus === STATUSES.PENDING}>
        Login with MetaMask
      </OctavYellowContainedButton>
    </div>
  );
};

export default Login;
