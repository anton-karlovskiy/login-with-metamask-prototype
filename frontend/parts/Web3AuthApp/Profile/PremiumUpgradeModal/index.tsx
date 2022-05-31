
import * as React from 'react';
import { parseEther } from '@ethersproject/units';
import clsx from 'clsx';
import jwtDecode from 'jwt-decode';

import OctavYellowContainedButton from 'components/buttons/OctavYellowContainedButton';
import OctavModal, {
  OctavModalTitle,
  OctavModalInnerWrapper,
  OctavModalProps
} from 'components/UI/OctavModal';
import { hooks } from 'connectors/meta-mask';
import {
  PREMIUM_PRICE_IN_ETH,
  PREMIUM_PAYMENT_ADDRESS
} from 'config';
import shortenAddress from 'utils/helpers/shorten-address';
import STATUSES from 'utils/constants/statuses';
import { JwtDecoded } from '../../types';

const PremiumUpgradeModal = ({
  open,
  onClose,
  accessToken
}: Props) => {
  const [submitStatus, setSubmitStatus] = React.useState(STATUSES.IDLE);

  const provider = hooks.useProvider();
  if (provider === undefined) {
    throw new Error('Something went wrong!');
  }
  const account = hooks.useAccount();
  if (account === undefined) {
    throw new Error('Something went wrong!');
  }

  const handlePremiumUpgrade = async () => {
    try {
      if (!PREMIUM_PRICE_IN_ETH) {
        throw new Error('PREMIUM_PRICE_IN_ETH is not defined!');
      }
      if (!PREMIUM_PAYMENT_ADDRESS) {
        throw new Error('PREMIUM_PAYMENT_ADDRESS is not defined!');
      }

      setSubmitStatus(STATUSES.PENDING);

      const signer = provider.getSigner();
      // TODO: should call a contract function
      const tx = await signer.sendTransaction({
        to: PREMIUM_PAYMENT_ADDRESS,
        value: parseEther(PREMIUM_PRICE_IN_ETH)
      });
      await tx.wait();

      await updatePremiumAtDB();

      setSubmitStatus(STATUSES.RESOLVED);
    } catch (error: any) {
      window.alert(error.message);
      setSubmitStatus(STATUSES.REJECTED);
    }
  };

  const updatePremiumAtDB = async () => {
    const { payload: { id } } = jwtDecode<JwtDecoded>(accessToken);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`, {
      body: JSON.stringify({ premium: true }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'PATCH'
    });
    await response.json();
  };

  return (
    <OctavModal
      open={open}
      onClose={onClose}>
      <OctavModalInnerWrapper
        className={clsx(
          'max-w-lg',
          'space-y-4'
        )}>
        <OctavModalTitle
          className={clsx(
            'text-lg',
            'font-medium'
          )}>
          Hi {shortenAddress(account)}
        </OctavModalTitle>
        <div>
          <p className='text-sm'>
            Icy Premium is the edge you&apos;re looking for. Get the latest alpha and never FOMO into a project again.
          </p>
        </div>
        <div>
          <OctavYellowContainedButton
            onClick={handlePremiumUpgrade}
            pending={submitStatus === STATUSES.PENDING}>
            Pay {PREMIUM_PRICE_IN_ETH} ETH
          </OctavYellowContainedButton>
        </div>
      </OctavModalInnerWrapper>
    </OctavModal>
  );
};

type Props = Omit<OctavModalProps, 'children'> & {
  accessToken: string;
};

export default PremiumUpgradeModal;
