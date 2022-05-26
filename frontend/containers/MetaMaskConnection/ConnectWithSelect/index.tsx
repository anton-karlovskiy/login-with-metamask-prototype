
// ray test touch <<
import * as React from 'react';
import type { Web3ReactHooks } from '@web3-react/core';
import type { MetaMask } from '@web3-react/metamask';

import {
  CHAINS,
  getAddChainParameters
} from 'config/web3/chains';

const INVALID_CHAIN_ID = -1;

function ChainSelect({
  chainId,
  switchChain,
  displayDefault,
  chainIds
}: {
  chainId: number;
  switchChain: ((chainId: number) => Promise<void>) | undefined;
  displayDefault: boolean;
  chainIds: number[];
}) {
  return (
    <select
      value={chainId}
      onChange={event => {
        switchChain?.(Number(event.target.value));
      }}
      disabled={switchChain === undefined}>
      {displayDefault ? <option value={INVALID_CHAIN_ID}>Default Chain</option> : null}
      {chainIds.map(chainId => (
        <option
          key={chainId}
          value={chainId}>
          {CHAINS[chainId]?.name ?? chainId}
        </option>
      ))}
    </select>
  );
}

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
  // ray test touch <<
  const displayDefault = true;
  // ray test touch >>
  const chainIds = Object.keys(CHAINS).map(chainId => Number(chainId));

  const [desiredChainId, setDesiredChainId] = React.useState<number>(INVALID_CHAIN_ID);

  const switchChain = React.useCallback(
    async (desiredChainId: number) => {
      setDesiredChainId(desiredChainId);
      // If we're already connected to the desired chain, return
      if (desiredChainId === chainId) return;
      // If they want to connect to the default chain and we're already connected, return
      if (desiredChainId === INVALID_CHAIN_ID && chainId !== undefined) return;

      await connector.activate(
        desiredChainId === INVALID_CHAIN_ID ?
          undefined :
          getAddChainParameters(desiredChainId)
      );
    },
    [
      connector,
      chainId
    ]
  );

  if (error) {
    return (
      <div
        // TODO: could use tailwindcss
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
        {/* ray test touch << */}
        <ChainSelect
          chainId={desiredChainId}
          switchChain={switchChain}
          displayDefault={displayDefault}
          chainIds={chainIds} />
        {/* ray test touch >> */}
        {/* TODO: could use tailwindcss */}
        <div style={{ marginBottom: '1rem' }} />
        <button
          onClick={() => {
            connector.activate(
              desiredChainId === INVALID_CHAIN_ID ?
                undefined :
                getAddChainParameters(desiredChainId)
            );
          }}>
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
        {/* ray test touch << */}
        <ChainSelect
          chainId={desiredChainId === INVALID_CHAIN_ID ? INVALID_CHAIN_ID : chainId}
          switchChain={switchChain}
          displayDefault={displayDefault}
          chainIds={chainIds} />
        {/* ray test touch >> */}
        {/* TODO: could use tailwindcss */}
        <div style={{ marginBottom: '1rem' }} />
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
        {/* ray test touch << */}
        <ChainSelect
          chainId={desiredChainId}
          switchChain={isActivating ? undefined : switchChain}
          displayDefault={displayDefault}
          chainIds={chainIds} />
        {/* ray test touch >> */}
        {/* TODO: could use tailwindcss */}
        <div style={{ marginBottom: '1rem' }} />
        <button
          onClick={
            isActivating ?
              undefined :
              () => {
                connector.activate(
                  desiredChainId === INVALID_CHAIN_ID ?
                    undefined :
                    getAddChainParameters(desiredChainId)
                );
              }
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
