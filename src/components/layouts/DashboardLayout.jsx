import { Box, HStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const DashboardLayout = ({
  redirectTittle,
  redirectPath,
  children,
  menuList = [],
}) => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <HStack align="flex-start">
      <Box w={{ base: 48, md: 72, xl: 96 }}>
        <Box border="1px solid" borderColor="gray.200" borderRadius="md">
          {menuList.map((item, idx) => (
            <Link to={item.path} key={idx}>
              <HStack bg={pathname === item.path ? "blue.50" : ""} p="4">
                <Icon w="8" h="8" as={item.icon} />
                <Box>{item.name}</Box>
              </HStack>
            </Link>
          ))}
        </Box>
        <Box textAlign="center" mt="4">
          <Link to={redirectPath}>
            <Button colorScheme="teal">Switch to {redirectTittle}</Button>
          </Link>
        </Box>
      </Box>

      <Box flex="1" px="4">
        {children}
      </Box>
    </HStack>
  );
};

export default DashboardLayout;
