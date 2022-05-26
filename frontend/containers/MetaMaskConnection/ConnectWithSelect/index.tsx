
// ray test touch <<
import * as React from 'react';
import type { Web3ReactHooks } from '@web3-react/core';
import type { MetaMask } from '@web3-react/metamask';

import Button from 'components/Button';

interface Props {
  connector: MetaMask;
  chainId: ReturnType<Web3ReactHooks['useChainId']>;
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
  error: ReturnType<Web3ReactHooks['useError']>;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
}

function ConnectWithSelect({
  connector,
  chainId,
  isActivating,
  error,
  isActive
}: Props) {
  if (error) {
    return (
      <Button onClick={() => void connector.activate(undefined)}>
        Try Again?
      </Button>
    );
  } else if (isActive) {
    if (chainId === undefined) {
      throw new Error('Something went wrong!');
    }

    return (
      <Button onClick={() => void connector.deactivate()}>
        Disconnect
      </Button>
    );
  } else {
    return (
      <Button
        onClick={
          isActivating ?
            undefined :
            () => void connector.activate(undefined)
        }
        disabled={isActivating}>
        Connect
      </Button>
    );
  }
}

export default ConnectWithSelect;
// ray test touch >>
