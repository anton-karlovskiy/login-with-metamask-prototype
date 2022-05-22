
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import {
  useWeb3React,
  Web3ReactHooks,
  Web3ReactProvider
} from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import type { Connector } from '@web3-react/types';
import { WalletConnect } from '@web3-react/walletconnect';

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

function getName(connector: Connector) {
  // TODO: should use `switch`
  if (connector instanceof MetaMask) return 'MetaMask';
  if (connector instanceof WalletConnect) return 'WalletConnect';
  if (connector instanceof CoinbaseWallet) return 'Coinbase Wallet';
  if (connector instanceof Network) return 'Network';
  return 'Unknown';
}

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

function Child() {
  const { connector } = useWeb3React();
  // eslint-disable-next-line no-console
  console.log(`Priority Connector is: ${getName(connector)}`);
  return null;
}

function ProviderExample() {
  return (
    <Web3ReactProvider connectors={CONNECTORS}>
      <Child />
    </Web3ReactProvider>
  );
}

export default ProviderExample;
