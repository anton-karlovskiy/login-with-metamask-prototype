
import { initializeConnector } from '@web3-react/core';
import { Url } from '@web3-react/url';

import {
  URLS,
  ETHEREUM_MAINNET_CHAIN_ID
} from 'config/web3/chains';

// TODO: not used for now
export const [url, hooks] = initializeConnector<Url>(
  actions => new Url(actions, URLS[ETHEREUM_MAINNET_CHAIN_ID][0]), // `0` the first item in the `URLS` array
  [ETHEREUM_MAINNET_CHAIN_ID]
);
