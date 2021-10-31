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
import { JOB_CORE_METHODS, LOCATIONS, OneBigNumber } from "configs";
import { removeNumericKey, timeLeft } from "utils";
import Job from "components/Job";

const Home = () => {
  const jobCoreContract = useJobCoreContract();

  const [latestRecruiterId, setLatestRecruiterId] = useState();
  const [recruiters, setRecruiters] = useState([]);

  const [jobs, setJobs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  console.count("counter");

  useEffect(() => {
    async function getLatestRecruiterId() {
      if (jobCoreContract) {
        callContract(
          jobCoreContract,
          JOB_CORE_METHODS.getLatestRecruiterId,
          []
        ).then((latestRecruiterId) => setLatestRecruiterId(latestRecruiterId));
      }
    }
    getLatestRecruiterId();
  }, [jobCoreContract]);

  useEffect(() => {
    async function getJobs() {
      if (jobCoreContract) {
        callContract(jobCoreContract, JOB_CORE_METHODS.getJobs, []).then(
          async (jobs) => {
            const _jobs = await Promise.all(
              jobs.map(async (e) => {
                const job = removeNumericKey(e);

                const recruiterAddress = await callContract(
                  jobCoreContract,
                  JOB_CORE_METHODS.jobOwner,
                  [job.id]
                );
                const recruiterId = await callContract(
                  jobCoreContract,
                  JOB_CORE_METHODS.recruiterToId,
                  [recruiterAddress]
                );
                const recruiter = await callContract(
                  jobCoreContract,
                  JOB_CORE_METHODS.recruiters,
                  [recruiterId]
                );

                const _recruiter = removeNumericKey(recruiter);

                return { ...job, recruiter: _recruiter };
              })
            );

            setJobs(_jobs);
          }
        );
      }
    }
    getJobs();
  }, [jobCoreContract, currentPage, perPage]);

  useEffect(() => {
    async function getRecruiters() {
      if (latestRecruiterId) {
        const recruiterLength = +latestRecruiterId.toString();
        const recruiters = await Promise.all(
          new Array(recruiterLength).fill("").map(async (_, idx) => {
            const recruiter = await callContract(
              jobCoreContract,
              JOB_CORE_METHODS.recruiters,
              [idx + 1]
            );
            const _recruiter = removeNumericKey(recruiter);
            return _recruiter;
          })
        );
        if (recruiters?.length) {
          setRecruiters(recruiters);
        }
      }
    }
    getRecruiters();
  }, [latestRecruiterId]);

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
            {Object.values(LOCATIONS).map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </Select>
        </HStack>
        <Button px="8" colorScheme="teal">
          Search
        </Button>
      </HStack>

      <Box fontWeight="semibold" fontSize="3xl" textAlign="center" pb="4">
        Suitable Jobs
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap="8">
        {jobs.map((job, idx) => (
          <Job job={job} key={idx} />
        ))}
      </Grid>

      {/* Pagging */}
      {/* <HStack align="center" justify="center" my="8" spacing="4">
        {new Array(4).fill("").map((e, idx) => (
          <Box
            key={idx}
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
      </HStack> */}

      {/* Recuiters */}
      <Box fontWeight="semibold" fontSize="3xl" textAlign="center" p="4">
        Featured Recruiters
      </Box>
      <Grid templateColumns="repeat(4, 1fr)" gap="8">
        {recruiters.map((recruiter, idx) => (
          <Box key={idx} cursor="pointer">
            <Image
              className="hover-shadow"
              border="2px solid"
              borderColor="gray.300"
              borderRadius="md"
              src={recruiter.logo}
              alt="Segun Adebayo"
            />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
