
// ray test touch <<
import * as React from 'react';
// ray test touch >>
import type { NextPage } from 'next';
// ray test touch <<
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import {
  Web3ReactHooks,
  Web3ReactProvider
} from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
// ray test touch >>

import App from 'components/web3-authentication/App';
// ray test touch <<
import ConnectorName from 'containers/ConnectorName';
import Accounts from 'components/web3-connection/Accounts';
import Status from 'components/web3-connection/Status';
import Chain from 'components/web3-connection/Chain';
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
  // TODO: only support MetaMask wallet for now
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
// ray test touch >>

const Web3Authentication: NextPage = () => {
  // ray test touch <<
  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  // Attempt to connect eagerly on mount
  React.useEffect(() => {
    void metaMask.connectEagerly();
  }, []);
  // ray test touch >>

  return (
    // ray test touch <<
    <Web3ReactProvider connectors={CONNECTORS}>
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
      </div>
      {isActive && <App />}
      <ConnectorName />
    </Web3ReactProvider>
    // ray test touch >>
  );
};

export default Web3Authentication;
