
import * as React from 'react';
import jwtDecode from 'jwt-decode';
import clsx from 'clsx';

import PremiumUpgradeModal from './PremiumUpgradeModal';
import OctavYellowContainedButton from 'components/buttons/OctavYellowContainedButton';
import { Auth } from '../types';

interface Props {
  auth: Auth;
  onLoggedOut: () => void;
}

// ray test touch <
interface User {
  id: number;
  username: string;
  premium: false;
}
// ray test touch >

interface State {
  loading: boolean;
  user: User | undefined;
  newUsername: string;
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
    newUsername: ''
  });

  // ray test touch <
  const [premiumUpgradeModalOpen, setPremiumUpgradeModalOpen] = React.useState(false);
  // ray test touch >

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
      .then((user: User) => {
        // ray test touch <
        setState(previous => ({ ...previous, user }));
        if (!user.premium) {
          setPremiumUpgradeModalOpen(true);
        }
        // ray test touch >
      })
      .catch(window.alert);
  }, [accessToken]);

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setState(previous => ({
      ...previous,
      newUsername: value
    }));
  };

  const handleSubmit = () => {
    const {
      user,
      newUsername
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
      body: JSON.stringify({ username: newUsername }),
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

  const handlePremiumUpgradeModalOpen = () => {
    setPremiumUpgradeModalOpen(true);
  };

  const handlePremiumUpgradeModalClose = () => {
    setPremiumUpgradeModalOpen(false);
  };

  const { payload: { publicAddress } } = jwtDecode<JwtDecoded>(accessToken);

  const {
    loading,
    user
  } = state;

  const username = user && user.username;

  return (
    <div className='space-y-10'>
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
          'flex',
          'items-center',
          'justify-center',
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
      <div
        className={clsx(
          'flex',
          'items-center',
          'justify-center',
          'space-x-4'
        )}>
        <OctavYellowContainedButton onClick={onLoggedOut}>
          Logout
        </OctavYellowContainedButton>
        {/* ray test touch < */}
        {!(state.user?.premium) && (
          <OctavYellowContainedButton onClick={handlePremiumUpgradeModalOpen}>
            Premium Upgrade
          </OctavYellowContainedButton>
        )}
        {/* ray test touch > */}
        {premiumUpgradeModalOpen && (
          <PremiumUpgradeModal
            open={premiumUpgradeModalOpen}
            onClose={handlePremiumUpgradeModalClose} />
        )}
      </div>
    </div>
  );
};

export default Profile;
