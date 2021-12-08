import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Icon } from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
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
import { Select } from "@chakra-ui/select";
import { Spinner } from "@chakra-ui/spinner";
import ReactToPrint from "react-to-print";
import ResumePDF from "components/ResumePDF";
import { JOB_CORE_METHODS } from "configs";
import { callContract, useJobCoreContract } from "hooks/useContract";
import { useEffect, useState, useRef } from "react";
import { CgWebsite } from "react-icons/cg";
import { ImHourGlass } from "react-icons/im";
import { IoIosPeople } from "react-icons/io";
import {
  MdContacts,
  MdLocationOn,
  MdMonetizationOn,
  MdWork,
} from "react-icons/md";
import { useParams } from "react-router";
import { removeNumericKey, timeLeft } from "utils";

const JobDetail = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const jobCoreContract = useJobCoreContract();
  const { id: jobId } = useParams();

  const resumeRef = useRef();
  const clickRef = useRef();

  const [job, setJob] = useState();
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (jobCoreContract && jobId) {
      try {
        callContract(jobCoreContract, JOB_CORE_METHODS.getJob, [jobId]).then(
          async (e) => {
            console.log(e);
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

        callContract(jobCoreContract, JOB_CORE_METHODS.getOwnerResumes, [])
          .then((resumes) => resumes.map(removeNumericKey))
          .then(setResumes);
      } catch (error) {
        console.error("getJob", error);
      }
    }
  }, [jobCoreContract, jobId]);

  const applyJob = async () => {
    try {
      if (!selectedResumeId || !jobId || !job) return;

      const isAppliedJob = await callContract(
        jobCoreContract,
        JOB_CORE_METHODS.isAppliedJob,
        [jobId]
      );

      if (isAppliedJob) {
        return alert("You already applied job");
      }
      setSubmitting(true);
      await callContract(jobCoreContract, JOB_CORE_METHODS.applyJob, [
        jobId,
        selectedResumeId,
      ]);
      setSubmitting(false);
      onClose();
      alert("Apply job success");
    } catch (error) {
      setSubmitting(false);
      console.log(error);
      alert("ERROR apply job");
    }
  };

  const displayLineBreak = (text) => {
    return text.split("\n").map((str) => <p>{str}</p>);
  };

  const [selectedResume, setSelectedResume] = useState();

  const handleChangeSelectedResume = (selectedResumeId) => {
    setSelectedResumeId(selectedResumeId);
    const resume = resumes.find((r) => r.id?.toString() === selectedResumeId);
    fetch(resume.url)
      .then((res) => res.json())
      .then((out) => {
        setSelectedResume(out);
      })
      .catch((err) => {
        console.error(err);
        alert("ERROR");
      });
  };

  const downloadResumePDF = () => {
    clickRef.current.click();
  };

  return (
    <Box px="32">
      <ReactToPrint
        trigger={() => (
          <button
            id="print_pdf"
            ref={clickRef}
            style={{
              padding: "1em 0.5em",
              color: "#333",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          ></button>
        )}
        content={() => resumeRef.current}
      />
      <ResumePDF resume={selectedResume} ref={resumeRef} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select CV</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              placeholder="Choose your CV"
              value={selectedResumeId}
              onChange={(e) => handleChangeSelectedResume(e.target.value)}
            >
              {resumes.map((resume, idx) => (
                <option key={idx} value={resume.id}>
                  Resume {resume.id?.toString()}
                </option>
              ))}
            </Select>
            {selectedResumeId && (
              <Box
                pt="4"
                textDecor="underline"
                cursor="pointer"
                color="teal.600"
                onClick={() => downloadResumePDF(selectedResumeId)}
              >
                Download resume {selectedResumeId?.toString()}
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              id="apply_job"
              onClick={applyJob}
              isLoading={submitting}
              colorScheme="teal"
            >
              Apply
            </Button>
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
                  id="show_apply"
                  onClick={onOpen}
                  textTransform="uppercase"
                  colorScheme="teal"
                >
                  Apply Job
                </Button>
              </HStack>
              <Grid templateColumns="repeat(4, 1fr)" color="whiteAlpha.800">
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
                  Skills
                </Box>
                {job.skills.map((s) => (
                  <Box>- {s}</Box>
                ))}
              </Box>
              <Box>
                <Box fontSize="xl" fontWeight="semibold">
                  Description
                </Box>
                <Box>{displayLineBreak(job.descriptions)}</Box>
              </Box>
              <Box>
                <Box fontSize="xl" fontWeight="semibold">
                  Benefits
                </Box>
                <Box>{displayLineBreak(job.benefits)}</Box>
              </Box>
              <Box>
                <Box fontSize="xl" fontWeight="semibold">
                  Requirements
                </Box>
                <Box>{displayLineBreak(job.requirements)}</Box>
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
