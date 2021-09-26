import { Box, Grid, Image, HStack, Icon, VStack } from "@chakra-ui/react";
import React from "react";
import { MdLocationOn, MdWork, MdMonetizationOn } from "react-icons/md";
import { ImHourGlass } from "react-icons/im";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box>
      <Box fontWeight="bold" fontSize="3xl" textAlign="center" pb="4">
        Suitable Jobs
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap="8">
        {new Array(10).fill("").map((item, idx) => (
          <Link to={`/jobs/${idx + 10}`}>
            <HStack
              key={idx}
              textAlign="center"
              p="4"
              border="1px solid"
              borderColor="gray.300"
              borderEndRadius="md"
              spacing="4"
            >
              <Box w="20">
                <Image
                  w="100%"
                  h="auto"
                  alt="logo"
                  src="https://cdn1.timviecnhanh.com/asset/home/img/employer/5ac2f45827a14_1522725976.jpg"
                />
              </Box>
              <VStack flex="1" align="stretch" textAlign="left">
                <Box
                  className="one-line-text"
                  fontSize="xl"
                  fontWeight="semibold"
                >
                  .Net Developer (C#, Asp.Net) - Không Yc Kn (Lương Net 10 - 25
                  Triệu)
                </Box>
                <Box>Công ty cổ phần phát triển phần mềm ASIA</Box>
                <Grid templateColumns="repeat(2, 1fr)" color="gray.500">
                  <HStack>
                    <Icon as={MdLocationOn} />
                    <Box>Ha Noi</Box>
                  </HStack>
                  <HStack>
                    <Icon as={MdWork} />
                    <Box>No experience</Box>
                  </HStack>
                  <HStack>
                    <Icon as={MdMonetizationOn} />
                    <Box>12-13 trieu vnd</Box>
                  </HStack>
                  <HStack>
                    <Icon as={ImHourGlass} />
                    <Box>11 days left to apply</Box>
                  </HStack>
                </Grid>
              </VStack>
            </HStack>
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
