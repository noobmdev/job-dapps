import { Routes } from "components/route/Routes";
import { GlobalContext } from "context/GlobalContext";
import { useContext, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import { messages } from "language";

import { Web3Provider } from "@ethersproject/providers";
import {
  UnsupportedChainIdError,
  useWeb3React,
  Web3ReactProvider,
} from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from "connectors/hooks";
import { injected } from "connectors";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function App() {
  const { language } = useContext(GlobalContext);
  const { connector, library, chainId, account, activate, error } =
    useWeb3React();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setupNetwork = async () => {
      const provider = window.ethereum;
      if (provider) {
        const chainId = 97;
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: "Binance Smart Chain Testnet",
                nativeCurrency: {
                  name: "BNB",
                  symbol: "bnb",
                  decimals: 18,
                },
                rpcUrls: ["https://data-seed-prebsc-2-s1.binance.org:8545/"],
              },
            ],
          });
          return true;
        } catch (error) {
          console.error("Failed to setup the network in Metamask:", error);
          return false;
        }
      } else {
        console.error(
          "Can't setup the BSC network on metamask because window.ethereum is undefined"
        );
        return false;
      }
    };

    const catchError = async () => {
      if (error) {
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork();
          if (hasSetup) {
            activate(injected);
          }
        } else {
          alert(
            "Some error please reload page and check your network of metamask"
          );
        }
      }
    };

    catchError();
  }, [error]);

  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  return loading ? (
    <div>loading</div>
  ) : (
    <IntlProvider locale={language} messages={messages[language]}>
      <Routes />
    </IntlProvider>
  );
}

export default function () {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  );
}
