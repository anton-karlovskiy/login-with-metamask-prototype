
import type { NextPage } from 'next';
import clsx from 'clsx';

import ProviderExample from '../components/ProviderExample';
import MetaMaskCard from '../components/connectorCards/MetaMaskCard';
// ray test touch <
import WalletConnectCard from '../components/connectorCards/WalletConnectCard';
import CoinbaseWalletCard from '../components/connectorCards/CoinbaseWalletCard';
import NetworkCard from '../components/connectorCards/NetworkCard';
import GnosisSafeCard from '../components/connectorCards/GnosisSafeCard';
// ray test touch >

const Home: NextPage = () => {
  return (
    <>
      <ProviderExample />
      <div
        className={clsx(
          'flex',
          'flex-wrap'
        )}>
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
