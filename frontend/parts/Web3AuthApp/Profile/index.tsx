
import * as React from 'react';
import jwtDecode from 'jwt-decode';

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
  // ray test touch <
  username: string;
  // ray test touch >
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
    // ray test touch <
    username: ''
    // ray test touch >
  });

  const { accessToken } = auth;

  React.useEffect(() => {
    if (!accessToken) return;

    const {
      payload: { id }
    } = jwtDecode<JwtDecoded>(accessToken);

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(user => setState(previous => ({ ...previous, user })))
      .catch(window.alert);
  }, [accessToken]);

  // ray test touch <
  const handleChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, username: value });
  };
  // ray test touch >

  // ray test touch <
  const handleSubmit = () => {
    const {
      user,
      // ray test touch <
      username
      // ray test touch >
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
        setState(previous => ({ ...previous, loading: false }));
      });
  };
  // ray test touch >

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
      <div>
        My username is {username ? <pre className='inline'>{username}</pre> : 'not set.'}
        <br />
        My publicAddress is <pre className='inline'>{publicAddress}</pre>
      </div>
      {/* ray test touch < */}
      <form>
        <label htmlFor={USERNAME}>Change username: </label>
        <input
          name={USERNAME}
          onChange={handleChange} />
        <button
          disabled={loading}
          onClick={handleSubmit}>
          Submit
        </button>
      </form>
      {/* ray test touch > */}
      <div>
        <button onClick={onLoggedOut}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
