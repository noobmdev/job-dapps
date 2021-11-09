import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Box, Grid, HStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import Job from "components/Job";
import { JOB_CORE_METHODS, LOCATIONS } from "configs";
import { callContract, useJobCoreContract } from "hooks/useContract";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { removeNumericKey } from "utils";

const Home = () => {
  const jobCoreContract = useJobCoreContract();

  const [latestRecruiterId, setLatestRecruiterId] = useState();
  const [recruiters, setRecruiters] = useState([]);

  const [jobs, setJobs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [searchQuery, setSearchQuery] = useState({
    query: "",
    location: "",
  });

  // console.count("counter");

  useEffect(() => {
    async function getLatestRecruiterId() {
      if (jobCoreContract) {
        callContract(
          jobCoreContract,
          JOB_CORE_METHODS.getLatestRecruiterId,
          []
        ).then((latestRecruiterId) => {
          setLatestRecruiterId(latestRecruiterId);
        });
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
            setTotalItem(_jobs.length);
          }
        );
      }
    }
    getJobs();
  }, [jobCoreContract, currentPage, perPage]);
  console.log(searchQuery);

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
    <Box color="white">
      <HStack px="40" py="4" spacing="4">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={MdSearch} color="white" />}
          />
          <Input
            type="text"
            placeholder="Skills"
            value={searchQuery.query}
            onChange={(e) =>
              setSearchQuery((search) => ({ ...search, query: e.target.value }))
            }
          />
        </InputGroup>
        <HStack minW="12em" pos="relative">
          {/* <Input type="text" placeholder="Locations" /> */}
          <Select
            color="white"
            variant="outline"
            value={searchQuery.location}
            onChange={(e) =>
              setSearchQuery((search) => ({
                ...search,
                location: e.target.value,
              }))
            }
          >
            <option value="" style={{ display: "none" }}>
              Locations
            </option>
            {Object.values(LOCATIONS).map((l) => (
              <option style={{ color: "black" }} key={l} value={l}>
                {l}
              </option>
            ))}
          </Select>
        </HStack>
        {/* <Button px="8" colorScheme="teal">
          Search
        </Button> */}
      </HStack>

      <Box fontWeight="semibold" fontSize="3xl" textAlign="center" pb="4">
        Suitable Jobs
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap="8">
        {jobs
          .filter((job) => {
            console.log(
              job.descriptions,
              new RegExp(searchQuery.query, "gi").test(job.descriptions)
            );
            return (
              job.location?.includes(searchQuery.location) &&
              new RegExp(searchQuery.query, "gi").test(job.skills?.join(""))
            );
          })
          .slice((currentPage - 1) * perPage, currentPage * perPage)
          .map((job, idx) => (
            <Job job={job} key={idx} />
          ))}
      </Grid>

      {/* Pagging */}
      {totalItem != 0 && (
        <HStack align="center" justify="center" my="8" spacing="4">
          {new Array(Math.ceil(totalItem / perPage)).fill("").map((e, idx) => (
            <Box
              key={idx}
              px="4"
              py="2"
              border="1px solid"
              borderColor="white"
              cursor="pointer"
              onClick={() => setCurrentPage(idx + 1)}
              bg={currentPage === idx + 1 ? "teal.400" : ""}
            >
              {idx + 1}
            </Box>
          ))}
          {/* <Box
            px="4"
            py="2"
            border="1px solid"
            borderColor="white"
            cursor="pointer"
          >
            &gt;
          </Box> */}
        </HStack>
      )}

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
