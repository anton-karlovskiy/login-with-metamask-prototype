
import * as React from 'react';
import jwtDecode from 'jwt-decode';
import clsx from 'clsx';

import OctavYellowContainedButton from 'components/buttons/OctavYellowContainedButton';
import { Auth } from '../types';

interface Props {
  auth: Auth;
  onLoggedOut: () => void;
}

interface State {
  loading: boolean;
  user?: {
    id: number;
    username: string;
  };
  username: string;
}

interface JwtDecoded {
  payload: {
    id: string;
    publicAddress: string;
  };
}

const USERNAME = 'username';

const Profile = ({
  auth,
  onLoggedOut
}: Props): JSX.Element => {
  const [state, setState] = React.useState<State>({
    loading: false,
    user: undefined,
    username: ''
  });

  const { accessToken } = auth;

  React.useEffect(() => {
    if (!accessToken) return;

    const { payload: { id } } = jwtDecode<JwtDecoded>(accessToken);

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(user => setState(previous => ({ ...previous, user })))
      .catch(window.alert);
  }, [accessToken]);

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setState(previous => ({
      ...previous,
      username: value
    }));
  };

  const handleSubmit = () => {
    const {
      user,
      username
    } = state;

    setState(previous => ({
      ...previous,
      loading: true
    }));

    // TODO: temporary workaround for now
    // TODO: should prevent the form from being submitted while fetching `user`
    if (!user) {
      window.alert(
        'The user id has not been fetched yet. Please try again in 5 seconds.'
      );
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`, {
      body: JSON.stringify({ username }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'PATCH'
    })
      .then(response => response.json())
      .then(user => setState(previous => ({ ...previous, loading: false, user })))
      .catch(error => {
        window.alert(error);
        setState(previous => ({
          ...previous,
          loading: false
        }));
      });
  };

  const {
    payload: { publicAddress }
  } = jwtDecode<JwtDecoded>(accessToken);

  const {
    loading,
    user
  } = state;

  const username = user && user.username;

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <p>
          My username is {username ? <strong>{username}</strong> : 'not set.'}
        </p>
        <p
          className={clsx(
            'overflow-hidden',
            'truncate'
          )}>
          My publicAddress is <strong>{publicAddress}</strong>
        </p>
      </div>
      {/* TODO: should use react-hook-form and proper validation */}
      <form
        className={clsx(
          'inline-flex',
          'items-center',
          'space-x-4'
        )}>
        <label htmlFor={USERNAME}>Change username:</label>
        <input
          type='text'
          name={USERNAME}
          onChange={handleChange} />
        <OctavYellowContainedButton
          disabled={loading}
          onClick={handleSubmit}>
          Submit
        </OctavYellowContainedButton>
      </form>
      <div>
        <OctavYellowContainedButton onClick={onLoggedOut}>Logout</OctavYellowContainedButton>
      </div>
    </div>
  );
};

export default Profile;
