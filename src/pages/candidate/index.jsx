import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Icon } from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Box, Grid, GridItem, HStack, VStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";
import React from "react";
import { BiEdit, BiPlus } from "react-icons/bi";
import CandidateLayout from "./components/CandidateLayout";

const Candidate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <CandidateLayout>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{/* <Lorem count={2} /> */}</ModalBody>

          <ModalFooter>
            <Button colorSc>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <VStack align="stretch" spacing="4">
        <Box p="6" border="1px solid" borderColor="gray.300" borderRadius="md">
          <HStack justify="space-between" align="center" pb="4">
            <Box fontSize="2xl" fontWeight="semibold">
              Personal Infomation
            </Box>
            <Icon onClick={onOpen} w="8" h="8" as={BiEdit} cursor="pointer" />
          </HStack>
          <Grid templateColumns="repeat(2, 1fr)" gap="4">
            <GridItem colSpan="2">
              <FormLabel>Full Name</FormLabel>
              <Input placeholder="Full name" />
            </GridItem>
            <GridItem>
              <FormLabel>Gender</FormLabel>
              <RadioGroup defaultValue="2">
                <HStack spacing="6">
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </HStack>
              </RadioGroup>
            </GridItem>
            <GridItem>
              <FormLabel>Year of birthday</FormLabel>
              <Select defaultValue={new Date().getFullYear()}>
                {new Array(50)
                  .fill(new Date().getFullYear())
                  .map((item, idx) => (
                    <option>{item - idx}</option>
                  ))}
              </Select>
            </GridItem>
            <GridItem>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" />
            </GridItem>
            <GridItem>
              <FormLabel>Phone</FormLabel>
              <Input placeholder="Phone" />
            </GridItem>
            <GridItem colSpan="2">
              <FormLabel>Address</FormLabel>
              <Input placeholder="Address" />
            </GridItem>
            <GridItem colSpan="2">
              <FormLabel>Bio</FormLabel>
              <Textarea placeholder="Bio" />
            </GridItem>
          </Grid>
        </Box>

        <Box p="6" border="1px solid" borderColor="gray.300" borderRadius="md">
          <HStack justify="space-between" align="center" pb="4">
            <Box fontSize="2xl" fontWeight="semibold">
              Education
            </Box>
            <Icon onClick={onOpen} w="8" h="8" as={BiPlus} cursor="pointer" />
          </HStack>
          <Grid templateColumns="repeat(3, 1fr)" gap="4">
            {new Array(4).fill("").map((item, idx) => (
              <Box px="8">
                <Box fontSize="lg" fontWeight="semibold">
                  University {idx + 1}
                </Box>
                <Box>Major {idx + 1}</Box>
                <Box fontSize="sm" color="gray.600">
                  7/2015 - 7/2019
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>

        <Box p="6" border="1px solid" borderColor="gray.300" borderRadius="md">
          <HStack justify="space-between" align="center" pb="4">
            <Box fontSize="2xl" fontWeight="semibold">
              Experiences
            </Box>
            <Icon onClick={onOpen} w="8" h="8" as={BiPlus} cursor="pointer" />
          </HStack>
          <HStack align="flex-start" justify="space-between" px="8" spacing="6">
            <Box fontSize="lg">
              Your work experience makes you the person you are now
            </Box>
            <Image
              alt="image"
              src="https://www.topcv.vn/v3/profile/profile-png/profile-experience.png"
            />
          </HStack>
        </Box>

        <Box p="6" border="1px solid" borderColor="gray.300" borderRadius="md">
          <HStack justify="space-between" align="center" pb="4">
            <Box fontSize="2xl" fontWeight="semibold">
              Skills
            </Box>
            <Icon onClick={onOpen} w="8" h="8" as={BiPlus} cursor="pointer" />
          </HStack>
          <HStack align="flex-start" justify="space-between" px="8" spacing="6">
            <Box fontSize="lg">
              Thoroughly describing your skills helps others understand your
              strengths and increases your chances of connecting with others.
            </Box>
            <Image
              alt="image"
              src="https://www.topcv.vn/v3/profile/profile-png/profile-skills.png"
            />
          </HStack>
        </Box>

        <Box p="6" border="1px solid" borderColor="gray.300" borderRadius="md">
          <HStack justify="space-between" align="center" pb="4">
            <Box fontSize="2xl" fontWeight="semibold">
              Projects
            </Box>
            <Icon onClick={onOpen} w="8" h="8" as={BiPlus} cursor="pointer" />
          </HStack>
          <HStack align="flex-start" justify="space-between" px="8" spacing="6">
            <Box fontSize="lg">
              Your work experience makes you the person you are now
            </Box>
            <Image
              alt="image"
              src="https://www.topcv.vn/v3/profile/profile-png/profile-project.png"
            />
          </HStack>
        </Box>

        <Box p="6" border="1px solid" borderColor="gray.300" borderRadius="md">
          <HStack justify="space-between" align="center" pb="4">
            <Box fontSize="2xl" fontWeight="semibold">
              Certificates
            </Box>
            <Icon onClick={onOpen} w="8" h="8" as={BiPlus} cursor="pointer" />
          </HStack>
          <HStack align="flex-start" justify="space-between" px="8" spacing="6">
            <Box fontSize="lg">
              You can describe it more clearly in your CV by inserting a photo
              of your certificate or certificate of merit.
            </Box>
            <Image
              alt="image"
              src="https://www.topcv.vn/v3/profile/profile-png/profile-certificate.png"
            />
          </HStack>
        </Box>

        <Box p="6" border="1px solid" borderColor="gray.300" borderRadius="md">
          <HStack justify="space-between" align="center" pb="4">
            <Box fontSize="2xl" fontWeight="semibold">
              Prizes
            </Box>
            <Icon onClick={onOpen} w="8" h="8" as={BiPlus} cursor="pointer" />
          </HStack>
          <HStack align="flex-start" justify="space-between" px="8" spacing="6">
            <Box fontSize="lg">
              You can describe it more clearly in your CV by inserting a photo
              of your merit
            </Box>
            <Image
              alt="image"
              src="https://www.topcv.vn/v3/profile/profile-png/profile-prize.png"
            />
          </HStack>
        </Box>
      </VStack>
    </CandidateLayout>
  );
};

export default Candidate;
