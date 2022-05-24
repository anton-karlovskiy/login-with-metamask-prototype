
import type { Connector } from '@web3-react/types';
import { MetaMask } from '@web3-react/metamask';
import { WalletConnect } from '@web3-react/walletconnect';
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { Network } from '@web3-react/network';

function getName(connector: Connector) {
  // TODO: should use `switch`
  if (connector instanceof MetaMask) return 'MetaMask';
  if (connector instanceof WalletConnect) return 'WalletConnect';
  if (connector instanceof CoinbaseWallet) return 'Coinbase Wallet';
  if (connector instanceof Network) return 'Network';
  return 'Unknown';
}

export {
  getName
};
