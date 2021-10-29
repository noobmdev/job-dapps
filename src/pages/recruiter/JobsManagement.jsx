import { Box, Grid, HStack, VStack } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Icon } from "@chakra-ui/icon";
import { Button } from "@chakra-ui/button";
import React, { useEffect, useState } from "react";
import { ImHourGlass } from "react-icons/im";
import { MdLocationOn, MdMonetizationOn, MdWork } from "react-icons/md";
import { Link } from "react-router-dom";
import RecruiterLayout from "./components/RecruiterLayout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/number-input";
import { Textarea } from "@chakra-ui/textarea";
import { callContract, useJobCoreContract } from "hooks/useContract";
import { JOB_CORE_METHODS } from "configs";
import { removeNumericKey } from "utils";
import Job from "components/Job";
import { Spinner } from "@chakra-ui/react";

const JobsManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const jobCoreContract = useJobCoreContract();

  const [refresh, setRefresh] = useState(false); // TODO trigger refresh data
  const [ownerJobs, setOwnerJobs] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [jobInfo, setJobInfo] = useState({
    title: "",
    salaryMin: 10,
    salaryMax: 10,
    location: "",
    experience: "",
    descriptions: "",
    benefits: "",
    requirements: "",
  });

  useEffect(() => {
    if (jobCoreContract) {
      try {
        setIsLoading(true);
        callContract(jobCoreContract, JOB_CORE_METHODS.getOwnerJobs, []).then(
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

            setOwnerJobs(_jobs);
            setIsLoading(false);
          }
        );
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    }
  }, [jobCoreContract, refresh]);

  const handleCreateNewJob = () => {
    setSubmitting(true);
    callContract(jobCoreContract, JOB_CORE_METHODS.addJob, [
      ...Object.values(jobInfo),
    ]).then(() => {
      setRefresh((pre) => !pre);
      setSubmitting(false);
      onClose();
    }); // TODO change to refresh
  };

  return (
    <RecruiterLayout>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new job</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="4" align="stretch">
              <FormControl isRequired>
                <FormLabel>Job's Title</FormLabel>
                <Input
                  value={jobInfo.title}
                  onChange={(e) =>
                    setJobInfo((job) => ({ ...job, title: e.target.value }))
                  }
                  placeholder="Job's title"
                />
              </FormControl>

              <HStack>
                <FormControl isRequired>
                  <FormLabel>Salary Min</FormLabel>
                  <NumberInput value={jobInfo.salaryMin} min={10} step={10}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Salary Max</FormLabel>
                  <NumberInput value={jobInfo.salaryMax} min={10} step={10}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </HStack>

              <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <Input
                  value={jobInfo.location}
                  onChange={(e) =>
                    setJobInfo((job) => ({ ...job, location: e.target.value }))
                  }
                  placeholder="Location"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Experience</FormLabel>
                <Input
                  value={jobInfo.experience}
                  onChange={(e) =>
                    setJobInfo((job) => ({
                      ...job,
                      experience: e.target.value,
                    }))
                  }
                  placeholder="Experience"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Descriptions</FormLabel>
                <Textarea
                  value={jobInfo.descriptions}
                  onChange={(e) =>
                    setJobInfo((job) => ({
                      ...job,
                      descriptions: e.target.value,
                    }))
                  }
                  placeholder="Descriptions"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Benefits</FormLabel>
                <Textarea
                  value={jobInfo.benefits}
                  onChange={(e) =>
                    setJobInfo((job) => ({
                      ...job,
                      benefits: e.target.value,
                    }))
                  }
                  placeholder="Benefits"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Requirements</FormLabel>
                <Textarea
                  value={jobInfo.requirements}
                  onChange={(e) =>
                    setJobInfo((job) => ({
                      ...job,
                      requirements: e.target.value,
                    }))
                  }
                  placeholder="Requirements"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              onClick={handleCreateNewJob}
              isLoading={submitting}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box pb="4">
        <Button colorScheme="teal" onClick={onOpen}>
          Create a new job
        </Button>
      </Box>
      {isLoading ? (
        <Box textAlign="center">
          <Spinner />
        </Box>
      ) : (
        <Grid templateColumns="repeat(2, 1fr)" gap="8">
          {ownerJobs.map((job, idx) => (
            <Job job={job} key={idx} />
          ))}
        </Grid>
      )}
    </RecruiterLayout>
  );
};

export default JobsManagement;
