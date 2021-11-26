import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Box, Grid, HStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import Job from "components/Job";
import { JOB_CORE_METHODS, LOCATIONS } from "configs";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { callContract, useJobCoreContract } from "hooks/useContract";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { removeNumericKey } from "utils";
import {
  getJobs,
  getLatestJobId,
  getLatestRecruiterId,
  getRecruiters,
} from "utils/callContract";

const Home = () => {
  const { library } = useActiveWeb3React();
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

  useEffect(() => {
    if (library) {
      getLatestRecruiterId(library).then(setLatestRecruiterId);
      getLatestJobId(library).then(setTotalItem);
    }
  }, [library]);

  useEffect(() => {
    if (library) {
      getJobs(library, perPage, (currentPage - 1) * perPage).then(setJobs);
    }
  }, [library, currentPage, perPage]);

  useEffect(() => {
    if (library && latestRecruiterId) {
      getRecruiters(library, latestRecruiterId).then(setRecruiters);
    }
  }, [library, latestRecruiterId]);

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
      {totalItem != 0 && !!jobs.length && (
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
