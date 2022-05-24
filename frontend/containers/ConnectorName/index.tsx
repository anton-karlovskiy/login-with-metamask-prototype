
// ray test touch <<
import { useWeb3React } from '@web3-react/core';
import { getName } from 'utils/helpers/web3/connectors';

function ConnectorName() {
  const { connector } = useWeb3React();
  // eslint-disable-next-line no-console
  console.log(`Priority Connector is: ${getName(connector)}`);
  return null;
}

export default ConnectorName;
// ray test touch >>
