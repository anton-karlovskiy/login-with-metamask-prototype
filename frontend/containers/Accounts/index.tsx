
// ray test touch <<
import * as React from 'react';
import type { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import type { Web3ReactHooks } from '@web3-react/core';

function useBalances(
  provider?: ReturnType<Web3ReactHooks['useProvider']>,
  accounts?: string[]
): BigNumber[] | undefined {
  const [balances, setBalances] = React.useState<BigNumber[] | undefined>();

  React.useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false;

      void Promise.all(accounts.map(account => provider.getBalance(account))).then(balances => {
        if (stale) return;
        setBalances(balances);
      });

      return () => {
        stale = true;
        setBalances(undefined);
      };
    }
  }, [
    provider,
    accounts
  ]);

  return balances;
}

interface Props {
  accounts: ReturnType<Web3ReactHooks['useAccounts']>;
  provider: ReturnType<Web3ReactHooks['useProvider']>;
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']>;
}

function Accounts({
  accounts,
  provider,
  ENSNames
}: Props) {
  const balances = useBalances(provider, accounts);

  if (accounts === undefined) return null;

  return (
    <div>
      Accounts:{' '}
      <b>
        {accounts.length === 0 ?
          'None' :
          accounts.map((account, index) => (
            <ul
              key={account}
              // TODO: could use tailwindcss
              style={{
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
              {ENSNames?.[index] ?? account}
              {balances?.[index] ? ` (Ξ${formatEther(balances[index])})` : null}
            </ul>
          ))}
      </b>
    </div>
  );
}

export default Accounts;
// ray test touch >>
