
// ray test touch <<
import * as React from 'react';
import type { Web3ReactHooks } from '@web3-react/core';
import type { MetaMask } from '@web3-react/metamask';

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
      <div
        // TODO: could use tailwindcss
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
        <button
          onClick={() => void connector.activate(undefined)}>
          Try Again?
        </button>
      </div>
    );
  } else if (isActive) {
    if (chainId === undefined) {
      throw new Error('Something went wrong!');
    }

    return (
      <div
        // TODO: could use tailwindcss
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
        <button onClick={() => void connector.deactivate()}>Disconnect</button>
      </div>
    );
  } else {
    return (
      <div
        // TODO: could use tailwindcss
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
        <button
          onClick={
            isActivating ?
              undefined :
              () => void connector.activate(undefined)
          }
          disabled={isActivating}>
          Connect
        </button>
      </div>
    );
  }
}

export default ConnectWithSelect;
// ray test touch >>
