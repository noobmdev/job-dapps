import { Box, HStack, Grid, VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  MdLocationOn,
  MdWork,
  MdMonetizationOn,
  MdContacts,
} from "react-icons/md";
import { ImHourGlass } from "react-icons/im";
import { IoIosPeople } from "react-icons/io";
import { CgWebsite } from "react-icons/cg";
import { useEffect, useState } from "react";
import { callContract, useJobCoreContract } from "hooks/useContract";
import { JOB_CORE_METHODS } from "configs";
import { removeNumericKey, timeLeft } from "utils";
import { useParams } from "react-router";
import { Spinner } from "@chakra-ui/spinner";

const JobDetail = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const jobCoreContract = useJobCoreContract();
  const { id: jobId } = useParams();

  const [job, setJob] = useState();
  const [selectedCV, setSelectedCV] = useState("");

  useEffect(() => {
    if (jobCoreContract && jobId) {
      callContract(jobCoreContract, JOB_CORE_METHODS.jobs, [jobId]).then(
        async (e) => {
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
          setJob({ ...job, recruiter: _recruiter });
        }
      );
    }
  }, [jobCoreContract, jobId]);

  return (
    <Box px="32">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select CV</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              placeholder="Choose your CV"
              value={selectedCV}
              onChange={(e) => setSelectedCV(e.target.value)}
            >
              {new Array(4).fill("").map((item, idx) => (
                <option key={idx} value={idx}>
                  CV {idx + 1}
                </option>
              ))}
            </Select>
            {selectedCV && (
              <Box
                pt="4"
                textDecor="underline"
                cursor="pointer"
                color="teal.600"
              >
                Download CV {selectedCV}
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal">Apply</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {job ? (
        <>
          <VStack
            align="stretch"
            spacing="4"
            px="16"
            py="8"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
          >
            <Box>
              <HStack spacing="16" align="flex-start" mb="2">
                <Box flex="1" fontSize="2xl" fontWeight="semibold">
                  {job.title}
                </Box>
                <Button
                  onClick={onOpen}
                  textTransform="uppercase"
                  colorScheme="teal"
                >
                  Apply Job
                </Button>
              </HStack>
              <Grid templateColumns="repeat(4, 1fr)" color="gray.500">
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
                    {" "}
                    {job.salaryMin?.toString()} - {job.salaryMax?.toString()}
                  </Box>
                </HStack>
                <HStack>
                  <Icon as={ImHourGlass} />
                  <Box>{timeLeft(job.expiredIn)} left to apply</Box>
                </HStack>
              </Grid>
            </Box>
            <hr />
            <VStack align="stretch" spacing="4">
              <Box>
                <Box fontSize="xl" fontWeight="semibold">
                  Description
                </Box>
                <Box>{job.descriptions}</Box>
              </Box>
              <Box>
                <Box fontSize="xl" fontWeight="semibold">
                  Benefits
                </Box>
                <Box>{job.benefits}</Box>
              </Box>
              <Box>
                <Box fontSize="xl" fontWeight="semibold">
                  Requirements
                </Box>
                <Box>{job.requirements}</Box>
              </Box>
            </VStack>
          </VStack>

          <HStack
            align="flex-start"
            spacing="8"
            px="16"
            py="8"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            mt="10"
          >
            <Box w="40">
              <Image
                w="100%"
                h="auto"
                alt="compat_logo"
                src={job.recruiter?.logo}
              />
            </Box>
            <VStack flex="1" align="stretch" spacing="3">
              <Box fontSize="xl" fontWeight="semibold">
                {job.recruiter?.name}
              </Box>
              <HStack align="stretch">
                <Box textAlign="top">
                  <Icon as={MdLocationOn} />
                </Box>
                <Box>Headquarters: </Box>
                <Box>{job.recruiter?.headquarter}</Box>
              </HStack>
              <HStack>
                <Box>
                  <Icon as={IoIosPeople} />
                </Box>

                <Box>Company size: </Box>
                <Box>{job.recruiter?.companySize} people</Box>
              </HStack>
              <HStack>
                <Icon as={CgWebsite} />
                <Box>Website: </Box>
                <Box>{job.recruiter?.website}</Box>
              </HStack>

              <hr />
              <HStack>
                <Box>
                  <Icon as={MdContacts} />
                </Box>
                <Box>Contact: </Box>
                <Box>{job.recruiter?.contact}</Box>
              </HStack>
              <HStack>
                <Box>
                  <Icon as={MdLocationOn} />
                </Box>
                <Box>Company address: </Box>
                <Box>{job.recruiter?.addr}</Box>
              </HStack>
            </VStack>
          </HStack>
        </>
      ) : (
        <Box textAlign="center">
          <Spinner />
        </Box>
      )}
    </Box>
  );
};

export default JobDetail;
