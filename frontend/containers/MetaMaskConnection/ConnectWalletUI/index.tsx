
import * as React from 'react';
import type { Web3ReactHooks } from '@web3-react/core';
import type { MetaMask } from '@web3-react/metamask';

import OctavYellowContainedButton from 'components/buttons/OctavYellowContainedButton';

interface Props {
  connector: MetaMask;
  chainId: ReturnType<Web3ReactHooks['useChainId']>;
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
  error: ReturnType<Web3ReactHooks['useError']>;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
}

function ConnectWalletUI({
  connector,
  chainId,
  isActivating,
  error,
  isActive
}: Props) {
  if (error) {
    return (
      <OctavYellowContainedButton onClick={() => void connector.activate(undefined)}>
        Try Again?
      </OctavYellowContainedButton>
    );
  } else if (isActive) {
    if (chainId === undefined) {
      throw new Error('Something went wrong!');
    }

    return (
      <OctavYellowContainedButton onClick={() => void connector.deactivate()}>
        Disconnect
      </OctavYellowContainedButton>
    );
  } else {
    return (
      <OctavYellowContainedButton
        onClick={
          isActivating ?
            undefined :
            () => void connector.activate(undefined)
        }
        disabled={isActivating}>
        Connect
      </OctavYellowContainedButton>
    );
  }
}

export default ConnectWalletUI;
