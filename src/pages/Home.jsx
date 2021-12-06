import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Box, Grid, HStack, VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Spinner } from "@chakra-ui/spinner";
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
import Recruiters from "./Recruiters";

const Home = () => {
  const { library } = useActiveWeb3React();
  const jobCoreContract = useJobCoreContract();

  const [latestRecruiterId, setLatestRecruiterId] = useState();
  const [recruiters, setRecruiters] = useState([]);

  const [jobs, setJobs] = useState([]);

  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingRecruiters, setLoadingRecruiters] = useState(true);
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
      getJobs(library, perPage, (currentPage - 1) * perPage)
        .then(setJobs)
        .then((_) => setLoadingJobs(false))
        .catch((err) => setLoadingJobs(false));
    }
  }, [library, currentPage, perPage]);

  useEffect(() => {
    if (library && latestRecruiterId) {
      getRecruiters(library, latestRecruiterId)
        .then(setRecruiters)
        .then((_) => setLoadingRecruiters(false))
        .catch((err) => setLoadingRecruiters(false));
    }
  }, [library, latestRecruiterId]);

  return (
    <Box color="white">
      <VStack
        pos="absolute"
        bg="red"
        h="24em"
        top="14"
        left="0"
        right="0"
        bgImage="https://vieclam24h.vn/it/static/img/banner/bg-banner-img.png"
        bgPos="center"
        bgSize="cover"
        spacing="8"
      >
        <Box>
          <Box fontSize="4xl" fontWeight="bold" textAlign="center">
            Công nghệ dẫn đầu cuộc chơi
          </Box>
          <Box textAlign="center">
            Tìm công việc Công nghệ Thông tin phù hợp nhất với bạn.
          </Box>
        </Box>
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
                setSearchQuery((search) => ({
                  ...search,
                  query: e.target.value,
                }))
              }
            />
          </InputGroup>
          <HStack minW="12em" pos="relative">
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
                Vị trí
              </option>
              {Object.values(LOCATIONS).map((l) => (
                <option style={{ color: "black" }} key={l} value={l}>
                  {l}
                </option>
              ))}
            </Select>
          </HStack>
        </HStack>
      </VStack>

      <Box
        fontWeight="semibold"
        fontSize="3xl"
        textAlign="center"
        pb="4"
        pt="14em"
      >
        Công việc phù hợp
      </Box>

      {!loadingJobs ? (
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
      ) : (
        <Box textAlign="center">
          <Spinner />
        </Box>
      )}

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
        Nhà tuyển dụng nổi bật
      </Box>
      {!loadingRecruiters ? (
        <Recruiters recruiters={recruiters} />
      ) : (
        <Box textAlign="center">
          <Spinner />
        </Box>
      )}
    </Box>
  );
};

export default Home;
