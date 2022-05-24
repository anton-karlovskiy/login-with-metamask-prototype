
// ray test touch <
import type { NextPage } from 'next';

import ProviderExample from 'components/web3-connection/ProviderExample';
import MetaMaskCard from 'components/web3-connection/connector-cards/MetaMaskCard';
import WalletConnectCard from 'components/web3-connection/connector-cards/WalletConnectCard';
import CoinbaseWalletCard from 'components/web3-connection/connector-cards/CoinbaseWalletCard';
import NetworkCard from 'components/web3-connection/connector-cards/NetworkCard';
import GnosisSafeCard from 'components/web3-connection/connector-cards/GnosisSafeCard';

const Web3Connection: NextPage = () => {
  return (
    <>
      <ProviderExample />
      <div
        // TODO: could use tailwindcss
        style={{
          display: 'flex',
          flexFlow: 'wrap',
          fontFamily: 'sans-serif'
        }}>
        <MetaMaskCard />
        <WalletConnectCard />
        <CoinbaseWalletCard />
        <NetworkCard />
        <GnosisSafeCard />
      </div>
    </>
  );
};

export default Web3Connection;
// ray test touch >
