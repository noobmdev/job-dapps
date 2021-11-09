import { Button } from "@chakra-ui/button";
import { Checkbox, CheckboxGroup } from "@chakra-ui/checkbox";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Grid, HStack, VStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/number-input";
import { Select } from "@chakra-ui/select";
import { Spinner } from "@chakra-ui/spinner";
import { Textarea } from "@chakra-ui/textarea";
import Job from "components/Job";
import { JOB_CORE_METHODS, LOCATIONS, SKILLS } from "configs";
import { callContract, useJobCoreContract } from "hooks/useContract";
import React, { useEffect, useState } from "react";
import { removeNumericKey } from "utils";
import RecruiterLayout from "./components/RecruiterLayout";

const EXPERIENCES = [
  "No experience",
  "6 month",
  "1 year",
  "2 years",
  "3 years",
  "4 years",
  "5 years",
  "> 5 years",
];

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
    location: LOCATIONS.ALL,
    experience: EXPERIENCES[0],
    skills: [],
    descriptions: "",
    benefits: "",
    requirements: "",
  });

  useEffect(() => {
    setJobInfo({
      title: "",
      salaryMin: 10,
      salaryMax: 50,
      location: LOCATIONS.ALL,
      experience: EXPERIENCES[0],
      skills: [],
      descriptions: "",
      benefits: "",
      requirements: "",
    });
  }, [isOpen]);

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

  const handleCreateNewJob = async () => {
    try {
      setSubmitting(true);

      await callContract(jobCoreContract, JOB_CORE_METHODS.addJob, [
        jobInfo.title,
        jobInfo.salaryMin,
        jobInfo.salaryMax,
        jobInfo.location,
        jobInfo.experience,
        jobInfo.skills,
        jobInfo.descriptions,
        jobInfo.benefits,
        jobInfo.requirements,
      ]);
      setRefresh((pre) => !pre);
      setSubmitting(false);
      onClose(); // TODO change to refresh
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <RecruiterLayout>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
                  <NumberInput
                    value={jobInfo.salaryMin}
                    onChange={(v) =>
                      setJobInfo((job) => ({ ...job, salaryMin: v }))
                    }
                    min={10}
                    step={10}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Salary Max</FormLabel>
                  <NumberInput
                    value={jobInfo.salaryMax}
                    onChange={(v) =>
                      setJobInfo((job) => ({ ...job, salaryMax: v }))
                    }
                    min={50}
                    step={10}
                  >
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
                <Select
                  value={jobInfo.location}
                  onChange={(e) =>
                    setJobInfo((job) => ({ ...job, location: e.target.value }))
                  }
                >
                  {Object.values(LOCATIONS).map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Skills</FormLabel>
                <CheckboxGroup
                  colorScheme="green"
                  value={jobInfo.skills}
                  onChange={(v) =>
                    setJobInfo((job) => ({ ...job, skills: [...v] }))
                  }
                >
                  <Grid templateColumns="repeat(3, 1fr)" gap="2">
                    {Object.values(SKILLS).map((s) => (
                      <Checkbox value={s}>{s}</Checkbox>
                    ))}
                  </Grid>
                </CheckboxGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Experience</FormLabel>
                <Select
                  value={jobInfo.experience}
                  onChange={(e) =>
                    setJobInfo((job) => ({
                      ...job,
                      experience: e.target.value,
                    }))
                  }
                >
                  {EXPERIENCES.map((exp) => (
                    <option key={exp} value={exp}>
                      {exp}
                    </option>
                  ))}
                </Select>
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
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(2, 1fr)" }}
          gap="8"
        >
          {ownerJobs.map((job, idx) => (
            <Job job={job} key={idx} />
          ))}
        </Grid>
      )}
    </RecruiterLayout>
  );
};

export default JobsManagement;
