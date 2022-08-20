import { useConnect, useAccount } from "wagmi";

export const ConnectButton = () => {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  const connector = connectors[0];

  if (isConnected) {
    return <p>Connected with {address}</p>;
  }

  return (
    <div>
      <button onClick={() => connect({ connector })}>Connect</button>
    </div>
  );
};
