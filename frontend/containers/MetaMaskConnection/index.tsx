
// ray test touch <<
import Accounts from './Accounts';
import Status from './Status';
import Chain from './Chain';
import ConnectWithSelect from './ConnectWithSelect';
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
    <div>
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
      <ConnectWithSelect
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
