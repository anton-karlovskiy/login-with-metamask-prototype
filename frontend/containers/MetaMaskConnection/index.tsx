
// ray test touch <<
import clsx from 'clsx';

import Accounts from './Accounts';
import Status from './Status';
import Chain from './Chain';
import ConnectWalletUI from './ConnectWalletUI';
import {
  hooks,
  metaMask
} from 'connectors/meta-mask';

const MetaMaskConnection = () => {
  const chainId = hooks.useChainId();
  const accounts = hooks.useAccounts();
  const error = hooks.useError();
  const isActivating = hooks.useIsActivating();

  const isActive = hooks.useIsActive();

  const provider = hooks.useProvider();
  const ENSNames = hooks.useENSNames(provider);

  return (
    <div
      className={clsx(
        'bg-blue-900',
        'p-5',
        'text-white'
      )}>
      <b>MetaMask</b>
      <Status
        isActivating={isActivating}
        error={error}
        isActive={isActive} />
      <Chain chainId={chainId} />
      <Accounts
        accounts={accounts}
        provider={provider}
        ENSNames={ENSNames} />
      <ConnectWalletUI
        connector={metaMask}
        chainId={chainId}
        isActivating={isActivating}
        error={error}
        isActive={isActive} />
    </div>
  );
};

export default MetaMaskConnection;
// ray test touch >>
