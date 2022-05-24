
import ProviderExample from './ProviderExample';
import MetaMaskCard from './connector-cards/MetaMaskCard';
import WalletConnectCard from './connector-cards/WalletConnectCard';
import CoinbaseWalletCard from './connector-cards/CoinbaseWalletCard';
import NetworkCard from './connector-cards/NetworkCard';
import GnosisSafeCard from './connector-cards/GnosisSafeCard';

const Web3ConnectionApp = () => {
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

export default Web3ConnectionApp;
