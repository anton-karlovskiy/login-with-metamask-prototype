
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { initializeConnector } from '@web3-react/core';

import {
  URLS,
  ETHEREUM_MAINNET_CHAIN_ID
} from 'config/web3/chains';

export const [coinbaseWallet, hooks] = initializeConnector<CoinbaseWallet>(
  actions =>
    new CoinbaseWallet(actions, {
      url: URLS[ETHEREUM_MAINNET_CHAIN_ID][0], // `0` the first item in the `URLS` array
      appName: 'web3-react'
    })
);
