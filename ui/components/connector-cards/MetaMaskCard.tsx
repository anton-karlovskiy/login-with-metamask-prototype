
import * as React from 'react';

import {
  hooks,
  metaMask
} from 'connectors/metaMask';
import Accounts from 'components/Accounts';
import Card from 'components/Card';
import { Chain } from 'components/Chain';
import { ConnectWithSelect } from 'components/ConnectWithSelect';
import Status from 'components/Status';

const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames
} = hooks;

function MetaMaskCard() {
  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  // Attempt to connect eagerly on mount
  React.useEffect(() => {
    void metaMask.connectEagerly();
  }, []);

  return (
    <Card>
      <div>
        <b>MetaMask</b>
        <Status
          isActivating={isActivating}
          error={error}
          isActive={isActive} />
        {/* TODO: could use tailwindcss */}
        <div style={{ marginBottom: '1rem' }} />
        <Chain chainId={chainId} />
        <Accounts
          accounts={accounts}
          provider={provider}
          ENSNames={ENSNames} />
      </div>
      {/* TODO: could use tailwindcss */}
      <div style={{ marginBottom: '1rem' }} />
      <ConnectWithSelect
        connector={metaMask}
        chainId={chainId}
        isActivating={isActivating}
        error={error}
        isActive={isActive} />
    </Card>
  );
}

export default MetaMaskCard;
