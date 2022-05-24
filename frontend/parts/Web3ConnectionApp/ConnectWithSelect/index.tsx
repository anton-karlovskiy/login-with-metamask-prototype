
import * as React from 'react';
import type { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import type { Web3ReactHooks } from '@web3-react/core';
import { GnosisSafe } from '@web3-react/gnosis-safe';
import type { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';

import {
  CHAINS,
  getAddChainParameters,
  URLS,
  ETHEREUM_MAINNET_CHAIN_ID
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
  connector: MetaMask | WalletConnect | CoinbaseWallet | Network | GnosisSafe;
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
  const isNetwork = connector instanceof Network;
  const displayDefault = !isNetwork;
  const chainIds = (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map(chainId => Number(chainId));

  const [desiredChainId, setDesiredChainId] = React.useState<number>(
    isNetwork ?
      ETHEREUM_MAINNET_CHAIN_ID :
      INVALID_CHAIN_ID
  );

  const switchChain = React.useCallback(
    async (desiredChainId: number) => {
      setDesiredChainId(desiredChainId);
      // If we're already connected to the desired chain, return
      if (desiredChainId === chainId) return;
      // If they want to connect to the default chain and we're already connected, return
      if (desiredChainId === INVALID_CHAIN_ID && chainId !== undefined) return;

      if (connector instanceof WalletConnect || connector instanceof Network) {
        await connector.activate(desiredChainId === INVALID_CHAIN_ID ? undefined : desiredChainId);
      } else {
        await connector.activate(
          desiredChainId === INVALID_CHAIN_ID ?
            undefined :
            getAddChainParameters(desiredChainId)
        );
      }
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
        {!(connector instanceof GnosisSafe) && (
          <ChainSelect
            chainId={desiredChainId}
            switchChain={switchChain}
            displayDefault={displayDefault}
            chainIds={chainIds} />
        )}
        {/* TODO: could use tailwindcss */}
        <div style={{ marginBottom: '1rem' }} />
        <button
          onClick={() =>
            connector instanceof GnosisSafe ?
              void connector.activate() :
              connector instanceof WalletConnect || connector instanceof Network ?
                void connector.activate(desiredChainId === INVALID_CHAIN_ID ? undefined : desiredChainId) :
                void connector.activate(
                  desiredChainId === INVALID_CHAIN_ID ?
                    undefined :
                    getAddChainParameters(desiredChainId)
                )
          }>
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
        {!(connector instanceof GnosisSafe) && (
          <ChainSelect
            chainId={desiredChainId === INVALID_CHAIN_ID ? INVALID_CHAIN_ID : chainId}
            switchChain={switchChain}
            displayDefault={displayDefault}
            chainIds={chainIds} />
        )}
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
        {!(connector instanceof GnosisSafe) && (
          <ChainSelect
            chainId={desiredChainId}
            switchChain={isActivating ? undefined : switchChain}
            displayDefault={displayDefault}
            chainIds={chainIds} />
        )}
        {/* TODO: could use tailwindcss */}
        <div style={{ marginBottom: '1rem' }} />
        <button
          onClick={
            isActivating ?
              undefined :
              () =>
                connector instanceof GnosisSafe ?
                  void connector.activate() :
                  connector instanceof WalletConnect || connector instanceof Network ?
                    connector.activate(desiredChainId === INVALID_CHAIN_ID ? undefined : desiredChainId) :
                    connector.activate(
                      desiredChainId === INVALID_CHAIN_ID ?
                        undefined :
                        getAddChainParameters(desiredChainId)
                    )
          }
          disabled={isActivating}>
          Connect
        </button>
      </div>
    );
  }
}

export default ConnectWithSelect;
