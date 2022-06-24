
import * as React from 'react';
import jwtDecode from 'jwt-decode';
import clsx from 'clsx';

import PremiumUpgradeModal from './PremiumUpgradeModal';
import YellowContainedButton from 'components/buttons/YellowContainedButton';
import STATUSES from 'utils/constants/statuses';
import {
  Auth,
  JwtDecoded
} from '../types';

interface Props {
  auth: Auth;
  onLoggedOut: () => void;
}

interface User {
  id: number;
  username: string;
  premium: false;
}

type StatusKeys = keyof typeof STATUSES;
// TODO: correct type as it does not work as expected
type StatusValues = typeof STATUSES[StatusKeys];
interface State {
  submitStatus: StatusValues;
  user: User | undefined;
  newUsername: string;
}

const USERNAME = 'username';

const Profile = ({
  auth,
  onLoggedOut
}: Props): JSX.Element => {
  const [state, setState] = React.useState<State>({
    submitStatus: STATUSES.IDLE,
    user: undefined,
    newUsername: ''
  });

  const [premiumUpgradeModalOpen, setPremiumUpgradeModalOpen] = React.useState(false);

  const { accessToken } = auth;
  const { payload: { id } } = jwtDecode<JwtDecoded>(accessToken);

  const getUser = React.useCallback(async () => {
    if (!accessToken) return;
    if (!id) return;

    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then((user: User) => {
        setState(previous => ({
          ...previous,
          user
        }));

        if (!user.premium) {
          setPremiumUpgradeModalOpen(true);
        }
      })
      .catch((error: any) => {
        window.alert(error?.message);
      });
  }, [
    accessToken,
    id
  ]);

  React.useEffect(() => {
    if (!accessToken) return;
    if (!id) return;

    getUser();
  }, [
    accessToken,
    id,
    getUser
  ]);

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setState(previous => ({
      ...previous,
      newUsername: value
    }));
  };

  const handleSubmit = () => {
    const { newUsername } = state;

    setState(previous => ({
      ...previous,
      submitStatus: STATUSES.PENDING
    }));

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`, {
      body: JSON.stringify({ username: newUsername }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'PATCH'
    })
      .then(response => response.json())
      .then(user => {
        setState(previous => ({
          ...previous,
          submitStatus: STATUSES.RESOLVED,
          user
        }));
      })
      .catch((error: any) => {
        window.alert(error?.message);
        setState(previous => ({
          ...previous,
          submitStatus: STATUSES.REJECTED
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
    submitStatus,
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
        <YellowContainedButton
          pending={submitStatus === STATUSES.PENDING}
          onClick={handleSubmit}>
          Submit
        </YellowContainedButton>
      </form>
      <div
        className={clsx(
          'flex',
          'items-center',
          'justify-center',
          'space-x-4'
        )}>
        <YellowContainedButton onClick={onLoggedOut}>
          Logout
        </YellowContainedButton>
        {!(state.user?.premium) && (
          <YellowContainedButton onClick={handlePremiumUpgradeModalOpen}>
            Premium Upgrade
          </YellowContainedButton>
        )}
        {premiumUpgradeModalOpen && (
          <PremiumUpgradeModal
            open={premiumUpgradeModalOpen}
            onClose={handlePremiumUpgradeModalClose}
            accessToken={accessToken}
            getUser={getUser} />
        )}
      </div>
    </div>
  );
};

export default Profile;
