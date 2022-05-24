
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
import MetaMaskConnection from 'containers/MetaMaskConnection';
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

const { useIsActive } = metaMaskHooks;

const Home: NextPage = () => {
  const isActive = useIsActive();

  // Attempt to connect eagerly on mount
  React.useEffect(() => {
    // TODO: only set up MetaMask connection for now
    void metaMask.connectEagerly();
  }, []);

  return (
    <Web3ReactProvider connectors={CONNECTORS}>
      <MetaMaskConnection />
      {isActive && <Web3AuthApp />}
      <ConnectorName />
    </Web3ReactProvider>
  );
};

export default Home;
