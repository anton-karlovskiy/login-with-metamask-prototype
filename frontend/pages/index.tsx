
import * as React from 'react';
import type { NextPage } from 'next';
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import {
  Web3ReactHooks,
  Web3ReactProvider
} from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';

import Web3AuthApp from 'parts/Web3AuthApp';
// ray test touch <
import Accounts from 'containers/Accounts';
import Status from 'containers/Status';
import Chain from 'containers/Chain';
import ConnectWithSelect from 'containers/ConnectWithSelect';
// ray test touch >
import ConnectorName from 'containers/ConnectorName';
import {
  hooks as coinbaseWalletHooks,
  coinbaseWallet
} from 'connectors/coinbase-wallet';
import {
  hooks as metaMaskHooks,
  metaMask
} from 'connectors/meta-mask';
import {
  hooks as networkHooks,
  network
} from 'connectors/network';
import {
  hooks as walletConnectHooks,
  walletConnect
} from 'connectors/wallet-connect';

const CONNECTORS: [
  MetaMask |
  WalletConnect |
  CoinbaseWallet |
  Network,
  Web3ReactHooks
][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [coinbaseWallet, coinbaseWalletHooks],
  [network, networkHooks]
];

const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames
} = metaMaskHooks;

const Home: NextPage = () => {
  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  // Attempt to connect eagerly on mount
  React.useEffect(() => {
    // TODO: only set up MetaMask connection for now
    void metaMask.connectEagerly();
  }, []);

  return (
    <Web3ReactProvider connectors={CONNECTORS}>
      {/* ray test touch < */}
      <div>
        <b>MetaMask</b>
        <Status
          isActivating={isActivating}
          error={error}
          isActive={isActive} />
        {/* TODO: could use tailwindcss */}
        <div style={{ marginBottom: '1rem' }} />
        <Chain chainId={chainId} />
        <Accounts
          accounts={accounts}
          provider={provider}
          ENSNames={ENSNames} />
        <ConnectWithSelect
          connector={metaMask}
          chainId={chainId}
          isActivating={isActivating}
          error={error}
          isActive={isActive} />
      </div>
      {/* ray test touch > */}
      {isActive && <Web3AuthApp />}
      <ConnectorName />
    </Web3ReactProvider>
  );
};

export default Home;
