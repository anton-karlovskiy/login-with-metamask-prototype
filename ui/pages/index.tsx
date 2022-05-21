
import type { NextPage } from 'next';

// ray test touch <
import CoinbaseWalletCard from '../components/connectorCards/CoinbaseWalletCard';
import GnosisSafeCard from '../components/connectorCards/GnosisSafeCard';
import MetaMaskCard from '../components/connectorCards/MetaMaskCard';
import NetworkCard from '../components/connectorCards/NetworkCard';
import WalletConnectCard from '../components/connectorCards/WalletConnectCard';
import ProviderExample from '../components/ProviderExample';

const Home: NextPage = () => {
  return (
    <>
      <ProviderExample />
      <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
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
// ray test touch >
