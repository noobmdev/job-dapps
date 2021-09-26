const { useWeb3React } = require("@web3-react/core");

export const useActiveWeb3React = () => {
  const { account, chainId, ...rest } = useWeb3React();
  return {
    ...rest,
    account,
    chainId,
    isConnected: !!(account && chainId),
  };
};
