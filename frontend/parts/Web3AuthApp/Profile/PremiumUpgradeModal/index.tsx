
// ray test touch <
import * as React from 'react';
// ray test touch >
import clsx from 'clsx';
import { parseEther } from '@ethersproject/units';

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

const PremiumUpgradeModal = ({
  open,
  onClose
}: Props) => {
  // ray test touch <
  const [submitStatus, setSubmitStatus] = React.useState(STATUSES.IDLE);
  // ray test touch >

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

      setSubmitStatus(STATUSES.RESOLVED);
    } catch (error: any) {
      window.alert(error.message);
      setSubmitStatus(STATUSES.REJECTED);
    }
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
            // ray test touch <
            pending={submitStatus === STATUSES.PENDING}>
            {/* ray test touch > */}
            Pay {PREMIUM_PRICE_IN_ETH} ETH
          </OctavYellowContainedButton>
        </div>
      </OctavModalInnerWrapper>
    </OctavModal>
  );
};

type Props = Omit<OctavModalProps, 'children'>;

export default PremiumUpgradeModal;
