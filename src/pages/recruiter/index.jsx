import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Icon } from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Box, Grid, GridItem, HStack, VStack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";
import React from "react";
import { BiEdit, BiPlus } from "react-icons/bi";
import RecruiterLayout from "./components/RecruiterLayout";

const companySizes = [
  "1 - 9",
  "10 - 49",
  "50 - 99",
  "100- 299",
  "300-999",
  "> 1000",
];

const Recruiter = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <RecruiterLayout>
      <VStack align="stretch" spacing="4">
        <Box p="6" border="1px solid" borderColor="gray.300" borderRadius="md">
          <HStack justify="space-between" align="center" pb="4">
            <Box fontSize="2xl" fontWeight="semibold">
              Company Information
            </Box>
            <Icon w="8" h="8" as={BiEdit} cursor="pointer" />
          </HStack>
          <Grid templateColumns="repeat(2, 1fr)" gap="4">
            <GridItem>
              <FormLabel>Company name</FormLabel>
              <Input placeholder="Company name" />
            </GridItem>
            <GridItem rowSpan="2">
              <HStack justify="center">
                <Box boxSize="70%" role="group" pos="relative" p="4">
                  <Image
                    src="https://cdn1.timviecnhanh.com/asset/home/img/employer/5ac2f45827a14_1522725976.jpg"
                    alt="logo"
                  />
                  <Box
                    pos="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    bg="rgba(0,0,0,0.3)"
                    d="none"
                    cursor="pointer"
                    borderRadius="md"
                    lineHeight="100%"
                    _groupHover={{
                      d: "block",
                    }}
                    textAlign="center"
                  />
                </Box>
              </HStack>
            </GridItem>
            <GridItem>
              <FormLabel>Headquarters</FormLabel>
              <Input placeholder="Headquarters" />
            </GridItem>

            <GridItem>
              <FormLabel>Website</FormLabel>
              <Input placeholder="Website" />
            </GridItem>
            <GridItem>
              <FormLabel>Company size</FormLabel>
              <Box>
                <Select defaultValue="1 - 9">
                  {companySizes.map((item, idx) => (
                    <option key={idx} value="item">
                      {item} people
                    </option>
                  ))}
                </Select>
              </Box>
            </GridItem>
            <GridItem colSpan="2">
              <FormLabel>Contact</FormLabel>
              <Input placeholder="Contact" />
            </GridItem>
            <GridItem colSpan="2">
              <FormLabel>Company address</FormLabel>
              <Input placeholder="Company address" />
            </GridItem>
          </Grid>
        </Box>
      </VStack>
    </RecruiterLayout>
  );
};

export default Recruiter;
