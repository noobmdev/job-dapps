import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Box, Grid, GridItem, HStack, VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Spinner } from "@chakra-ui/spinner";
import Job from "components/Job";
import { JOB_CORE_METHODS, LOCATIONS } from "configs";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { callContract, useJobCoreContract } from "hooks/useContract";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MdSearch } from "react-icons/md";
import { useLocation, useHistory } from "react-router-dom";
import { removeNumericKey } from "utils";
import {
  getJobs,
  getLatestJobId,
  getLatestRecruiterId,
  getRecruiters,
} from "utils/callContract";
import Recruiters from "./Recruiters";

const Home = () => {
  const location = useLocation();
  const history = useHistory();
  const { library } = useActiveWeb3React();

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
  const [querySearch, setQuerySearch] = useState({
    query: "",
    location: "",
  });
  const urlQuery = new URLSearchParams(location.search);

  const urlQueryQuery = urlQuery.get("query");
  const urlQueryLocation = urlQuery.get("location");

  useEffect(() => {
    setSearchQuery((pre) => ({
      ...pre,
      query: urlQueryQuery ?? "",
    }));
    setQuerySearch((pre) => ({
      ...pre,
      query: urlQueryQuery ?? "",
    }));
  }, [urlQueryQuery]);

  useEffect(() => {
    setSearchQuery((pre) => ({
      ...pre,
      location: urlQueryLocation ?? "",
    }));
    setQuerySearch((pre) => ({
      ...pre,
      location: urlQueryLocation ?? "",
    }));
  }, [urlQueryLocation]);

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

  const _jobs = useMemo(
    () =>
      jobs.filter((job) => {
        return (
          job.location?.includes(querySearch.location) &&
          new RegExp(querySearch.query, "gi").test(job.skills?.join(""))
        );
      }),
    [jobs, querySearch.location, querySearch.query]
  );

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
        <HStack py="4" spacing="4">
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
          <Box>
            <Button
              id="search"
              colorScheme="blue"
              onClick={() => {
                let query = {};
                if (searchQuery?.query) {
                  query.query = searchQuery?.query;
                }
                if (searchQuery?.location) {
                  query.location = searchQuery?.location;
                }
                let params;
                if (Object.keys(query).length) {
                  params = new URLSearchParams(query);
                }
                params && history.replace({ search: params.toString() });
              }}
            >
              TÌM KIẾM
            </Button>
          </Box>
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
          {!!_jobs?.length ? (
            _jobs
              .slice((currentPage - 1) * perPage, currentPage * perPage)
              .map((job, idx) => <Job job={job} key={idx} />)
          ) : (
            <GridItem colSpan="2" textAlign="center">
              <Box fontSize="lg" fontWeight="semibol">
                Không có công việc phù hợp
              </Box>
            </GridItem>
          )}
        </Grid>
      ) : (
        <Box textAlign="center">
          <Spinner />
        </Box>
      )}

      {/* Paging */}
      {!!_jobs.length && (
        <HStack align="center" justify="center" my="8" spacing="4">
          {new Array(Math.ceil(_jobs.length / perPage))
            .fill("")
            .map((e, idx) => (
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

      {/* Recruiters */}
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
