
import * as React from 'react';
import type { Web3ReactHooks } from '@web3-react/core';
import type { MetaMask } from '@web3-react/metamask';

import YellowContainedButton from 'components/buttons/YellowContainedButton';

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
      <YellowContainedButton onClick={() => void connector.activate(undefined)}>
        Try Again?
      </YellowContainedButton>
    );
  } else if (isActive) {
    if (chainId === undefined) {
      throw new Error('Something went wrong!');
    }

    return (
      <YellowContainedButton onClick={() => void connector.deactivate()}>
        Disconnect
      </YellowContainedButton>
    );
  } else {
    return (
      <YellowContainedButton
        onClick={
          isActivating ?
            undefined :
            () => void connector.activate(undefined)
        }
        disabled={isActivating}>
        Connect
      </YellowContainedButton>
    );
  }
}

export default ConnectWalletUI;
