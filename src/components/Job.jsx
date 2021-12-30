import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Box, Grid, HStack, VStack } from "@chakra-ui/layout";
import React from "react";
import { ImHourGlass } from "react-icons/im";
import { MdLocationOn, MdMonetizationOn, MdWork } from "react-icons/md";
import { Link } from "react-router-dom";
import { timeLeft } from "utils";

const Job = ({ job }) => {
  return (
    <HStack
      className="hover-shadow"
      textAlign="center"
      // border="1px solid"
      // borderColor="white"
      borderEndRadius="md"
      spacing="8"
      bg="white"
      p="6"
    >
      <Box align="center">
        <Image w="40" h="auto" alt="logo" src={job.recruiter?.logo} />
      </Box>
      <VStack flex="1" align="stretch" textAlign="left" pos="relative">
        <Box
          className="one-line-text"
          fontSize="xl"
          fontWeight="semibold"
          textTransform="uppercase"
          color="black"
        >
          {job.title}
        </Box>
        <HStack spacing={4} color="black">
          <Box>{job.recruiter?.name}</Box>
          <Box>|</Box>
          <HStack color={"gray.700"}>
            <Icon as={MdLocationOn} />
            <Box>{job.location}</Box>
          </HStack>
        </HStack>
        <Grid
          templateColumns="repeat(3, 1fr)"
          color="black"
          // fontSize="xs"
        >
          <HStack>
            <Icon as={MdWork} />
            <Box>{job.experience}</Box>
          </HStack>
          <HStack>
            <Icon as={MdMonetizationOn} />
            <Box>
              {job.salaryMin?.toString()} - {job.salaryMax?.toString()}
            </Box>
          </HStack>
          <HStack>
            <Icon as={ImHourGlass} />
            <Box>{timeLeft(job.expiredIn)} left to apply</Box>
          </HStack>
        </Grid>
      </VStack>
    </HStack>
  );
};

export default Job;
