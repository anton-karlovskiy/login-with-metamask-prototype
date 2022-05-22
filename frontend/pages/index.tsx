
import type { NextPage } from 'next';

import ProviderExample from 'components/ProviderExample';
import MetaMaskCard from 'components/connector-cards/MetaMaskCard';
import WalletConnectCard from 'components/connector-cards/WalletConnectCard';
import CoinbaseWalletCard from 'components/connector-cards/CoinbaseWalletCard';
import NetworkCard from 'components/connector-cards/NetworkCard';
import GnosisSafeCard from 'components/connector-cards/GnosisSafeCard';

const Home: NextPage = () => {
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

export default Home;
