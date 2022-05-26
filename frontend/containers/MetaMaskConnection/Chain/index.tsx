
import type { Web3ReactHooks } from '@web3-react/core';

import { CHAINS } from 'config/web3/chains';

interface Props {
  chainId: ReturnType<Web3ReactHooks['useChainId']>;
}

function Chain({ chainId }: Props) {
  if (chainId === undefined) return null;

  const name = chainId ? CHAINS[chainId]?.name : undefined;

  if (name) {
    return (
      <div className='space-x-1'>
        <span>Chain:</span>
        <b>
          {name} ({chainId})
        </b>
      </div>
    );
  }

  return (
    <div>
      Chain Id: <b>{chainId}</b>
    </div>
  );
}

export default Chain;
