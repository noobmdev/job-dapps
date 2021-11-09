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
    <Link to={`/jobs/${job.id?.toString() ?? ""}`}>
      <HStack
        className="hover-shadow"
        textAlign="center"
        border="1px solid"
        borderColor="white"
        borderEndRadius="md"
        spacing="4"
        color="white"
        p="4"
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
          >
            {job.title}
          </Box>
          <Box>{job.recruiter?.name}</Box>
          <Grid
            templateColumns="repeat(2, 1fr)"
            color="whiteAlpha.800"
            fontSize="xs"
          >
            <HStack>
              <Icon as={MdLocationOn} />
              <Box>{job.location}</Box>
            </HStack>
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
    </Link>
  );
};

export default Job;
