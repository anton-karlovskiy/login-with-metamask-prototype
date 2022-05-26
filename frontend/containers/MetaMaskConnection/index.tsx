
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
        'text-white',
        'space-y-4'
      )}>
      <div
        className={clsx(
          'flex',
          'flex-col',
          'space-y-4',
          'sm:flex-row',
          'sm:space-x-4',
          'sm:space-y-0',
          'items-center',
          'justify-between'
        )}>
        <strong>MetaMask</strong>
        <Status
          isActivating={isActivating}
          error={error}
          isActive={isActive} />
        <Chain chainId={chainId} />
        <ConnectWalletUI
          connector={metaMask}
          chainId={chainId}
          isActivating={isActivating}
          error={error}
          isActive={isActive} />
      </div>
      <Accounts
        accounts={accounts}
        provider={provider}
        ENSNames={ENSNames} />
    </div>
  );
};

export default MetaMaskConnection;
