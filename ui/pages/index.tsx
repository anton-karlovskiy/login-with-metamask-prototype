
import type { NextPage } from 'next';

import ProviderExample from 'components/ProviderExample';
import MetaMaskCard from 'components/connector-cards/MetaMaskCard';
// ray test touch <
import WalletConnectCard from 'components/connector-cards/WalletConnectCard';
import CoinbaseWalletCard from 'components/connector-cards/CoinbaseWalletCard';
import NetworkCard from 'components/connector-cards/NetworkCard';
import GnosisSafeCard from 'components/connector-cards/GnosisSafeCard';
// ray test touch >

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
        {/* ray test touch < */}
        <WalletConnectCard />
        <CoinbaseWalletCard />
        <NetworkCard />
        <GnosisSafeCard />
        {/* ray test touch > */}
      </div>
    </>
  );
};

export default Home;
