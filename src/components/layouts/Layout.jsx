import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ReactComponent as MetamaskIcon } from "assets/images/metamask.svg";
import { ReactComponent as WalletConnectIcon } from "assets/images/walletconnect.svg";
import { injected } from "connectors";
import { useWallet } from "connectors/hooks";
import { ethers } from "ethers";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "assets/images/logo.png";

export const Layout = ({ children }) => {
  const { account, isConnected, library } = useActiveWeb3React();
  const { connect } = useWallet();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ETHBalacne, setETHBalance] = useState();

  useEffect(() => {
    const getBalance = async () => {
      library
        .getBalance(account, "latest")
        .then((balance) =>
          setETHBalance(
            parseFloat(ethers.utils.formatEther(balance.toString())).toFixed(4)
          )
        );
    };

    isConnected && getBalance();
  }, [isConnected]);

  return (
    <Box minH="100vh">
      <Modal
        isCentered
        size="sm"
        isOpen={isOpen && !isConnected}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" gap="12">
              <VStack
                cursor="pointer"
                p="4"
                borderRadius="md"
                _hover={{
                  bg: "gray.300",
                }}
                onClick={() => connect(injected)}
              >
                <Box h="12">
                  <MetamaskIcon />
                </Box>
                <Text as="b" textAlign="center">
                  Metamask
                </Text>
              </VStack>

              <VStack
                cursor="pointer"
                p="4"
                borderRadius="md"
                _hover={{
                  bg: "gray.300",
                }}
              >
                <Box h="12">
                  <WalletConnectIcon />
                </Box>
                <Text as="b" textAlign="center">
                  WalletConnect
                </Text>
              </VStack>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>

      <HStack h="14" px="8" py="4" align="center" bg="#2d333a">
        <Link to="/">
          <Box h="20">
            <Image h="100%" src={Logo} alt="logo" />
          </Box>
        </Link>

        <HStack flex="1" justify="flex-end" spacing="4">
          {isConnected ? (
            <HStack>
              {ETHBalacne && (
                <Button colorScheme="teal">{ETHBalacne} ETH</Button>
              )}
              <Link to="/profile">
                <Button colorScheme="teal">{account}</Button>
              </Link>
            </HStack>
          ) : (
            <Button colorScheme="teal" onClick={onOpen}>
              Connect wallet
            </Button>
          )}
        </HStack>
      </HStack>
      <Box minH="calc(100vh - 7em)" px="8" py="4" className="main-contanier">
        {children}
      </Box>

      <Box textAlign="center" p="4">
        © {new Date().getFullYear()} Copyright
      </Box>
    </Box>
  );
};
