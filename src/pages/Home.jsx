import {
  Box,
  Grid,
  Image,
  HStack,
  Icon,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  MdLocationOn,
  MdWork,
  MdMonetizationOn,
  MdSearch,
} from "react-icons/md";
import { ImHourGlass } from "react-icons/im";
import { Link } from "react-router-dom";
import { callContract, useJobCoreContract } from "hooks/useContract";
import { BigNumber } from "@ethersproject/bignumber";
import { JOB_CORE_METHODS } from "configs";

const Home = () => {
  const jobCoreContract = useJobCoreContract();

  const [latestRecruiterId, setLatestRecruiterId] = useState();
  const [recruiters, setRecruiter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    async function getLatestRecruiterId() {
      if (jobCoreContract) {
        callContract(
          jobCoreContract,
          JOB_CORE_METHODS.latestRecruiterId,
          []
        ).then((latestRecruiterId) => setLatestRecruiterId(latestRecruiterId));
      }
    }
    getLatestRecruiterId();
  }, [jobCoreContract]);

  useEffect(() => {
    async function getRecruiters() {
      if (latestRecruiterId) {
        // let firstIndex = BigNumber.from(currentPage - 1).mul(
        //   BigNumber.from(perPage)
        // );
        // let lastIndex = BigNumber.from(currentPage).mul(
        //   BigNumber.from(perPage)
        // );
        // if (latestRecruiterId.gt(lastIndex)) {
        //   console.log("greater");
        // } else {
        //   console.log("lesser");
        //   // for(let i = firstIndex; i)
        //   // new Array(latestRecruiterId.add(BigNumber.from("1")).sub(firstIndex))
        //   console.log(
        //     latestRecruiterId.add(BigNumber.from("1")).sub(firstIndex)
        //   );
        // }

        // // callContract(jobCoreContract, JOB_CORE_METHODS.recruiters, [1]).then(
        // //   console.log
        // // );
        // // setLatestRecruiterId(latestRecruiterId)
        for (
          let i = BigNumber.from("1");
          i.lte(latestRecruiterId);
          i.add(BigNumber.from("1"))
        ) {
          jobCoreContract.recruiters(i).then(console.log);
        }
      }
    }
    getRecruiters();
  }, [latestRecruiterId, currentPage, perPage]);

  return (
    <Box>
      <HStack px="40" py="4" spacing="4">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={MdSearch} color="gray.500" />}
          />
          <Input type="text" placeholder="Skills or positions" />
        </InputGroup>
        <HStack minW="12em" pos="relative">
          {/* <Input type="text" placeholder="Locations" /> */}
          <Select color="gray.500" variant="outline" defaultValue="">
            <option value="" style={{ display: "none" }}>
              Locations
            </option>
            <option value="All">All cities</option>
            <option value="Ha Noi">Ha Noi</option>
            <option value="Da Nang">Da Nang</option>
            <option value="Ho Chi Minh">Ho Chi Minh</option>
          </Select>
        </HStack>
        <Button px="8" colorScheme="blue">
          Search
        </Button>
      </HStack>

      <Box fontWeight="semibold" fontSize="3xl" textAlign="center" pb="4">
        Suitable Jobs
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap="8">
        {new Array(10).fill("").map((item, idx) => (
          <Link to={`/jobs/${idx + 10}`}>
            <HStack
              className="hover-shadow"
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

      {/* Pagging */}
      <HStack align="center" justify="center" my="8" spacing="4">
        {new Array(4).fill("").map((e, idx) => (
          <Box
            px="4"
            py="2"
            border="1px solid"
            borderColor="#ff523b"
            cursor="pointer"
          >
            {idx + 1}
          </Box>
        ))}
        <Box
          px="4"
          py="2"
          border="1px solid"
          borderColor="#ff523b"
          cursor="pointer"
        >
          &gt;
        </Box>
      </HStack>

      {/* Recuiters */}
      <Box fontWeight="semibold" fontSize="3xl" textAlign="center" p="4">
        Featured Recruiters
      </Box>
      <Grid templateColumns="repeat(4, 1fr)" gap="8">
        {new Array(8).fill("").map((e) => (
          <Box className="hover-shadow" cursor="pointer">
            <Image
              border="2px solid"
              borderColor="gray.300"
              borderRadius="md"
              src="https://res.cloudinary.com/munumber2/image/upload/v1634401209/NHATUYENDUNG6_xvzgd8.png"
              alt="Segun Adebayo"
            />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
