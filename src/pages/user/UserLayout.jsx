import { Box, HStack, Icon, VStack } from "@chakra-ui/react";
import React from "react";
import { FiUser } from "react-icons/fi";
import { GoTasklist } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";

const menuList = [
  {
    icon: FiUser,
    name: "Your Profile",
    path: "/profile",
  },
  {
    icon: GoTasklist,
    name: "Applied Jobs",
    path: "/applied-jobs",
  },
];

const UserLayout = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <HStack align="flex-start">
      <Box>
      <Box w="72" border="1px solid" borderColor="gray.200" borderRadius="md">
        {menuList.map((item, idx) => (
          <Link to={item.path} key={idx}>
            <HStack
              bg={new RegExp(pathname, "gi").test(item.path) ? "blue.50" : ""}
              p="4"
            >
              <Icon w="8" h="8" as={item.icon} />
              <Box>{item.name}</Box>
            </HStack>
          </Link>
        ))}
      </Box>
      </Box>
      
      <Box flex="1" px="4">
        {children}
      </Box>
    </HStack>
  );
};

export default UserLayout;
