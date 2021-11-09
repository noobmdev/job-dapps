import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Icon } from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Box, Grid, GridItem, HStack, VStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Select } from "@chakra-ui/select";
import { Spinner } from "@chakra-ui/spinner";
import { Textarea } from "@chakra-ui/textarea";
import {
  CANDIDATE_INFO_TYPE,
  CANDIDATE_MODAL_TITLE,
  JOB_CORE_METHODS,
} from "configs";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { callContract, useJobCoreContract } from "hooks/useContract";
import React, { useEffect, useState } from "react";
import { BiEdit, BiPlus } from "react-icons/bi";
import { uploadIPFS } from "services/upload-ipfs";
import { removeNumericKey } from "utils";
import CandidateLayout from "./components/CandidateLayout";
import CreateModal from "./components/CreateModal";
import PersonalInformation from "./components/PersonalInformation";

const Candidate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account } = useActiveWeb3React();
  const jobCoreContract = useJobCoreContract();

  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(true); // TODO change trigger refresh data
  const [candidateProfile, setCandidateProfile] = useState();
  const [currentProfileUrl, setCurrentProfileUrl] = useState();
  const [creatingResume, setCreatingResume] = useState(false);

  useEffect(() => {
    async function getRecruiterProfile() {
      try {
        if (jobCoreContract && account) {
          const resume = await callContract(
            jobCoreContract,
            JOB_CORE_METHODS.getCurrentResume,
            []
          );
          if (resume.url) {
            setCurrentProfileUrl(resume.url);
            fetch(resume.url)
              .then((res) => res.json())
              .then((out) => {
                console.log(out);
                setCandidateProfile(out);
                //setIsLoading(false);
              })
              .catch((err) => {
                //setIsLoading(false);
                console.error(err);
              });
          }
        }
      } catch (error) {
        //setIsLoading(false);
        console.error(error);
      }
    }

    getRecruiterProfile();
  }, [jobCoreContract, account, refresh]);

  const handleUpdateCurrentResume = async (payload, infoType) => {
    try {
      let data = { ...candidateProfile };

      if (!Object.values(CANDIDATE_INFO_TYPE).some((e) => e.includes(infoType)))
        return;

      if (data[infoType] && data[infoType].length) {
        data[infoType] = [...data[infoType], payload];
      } else {
        data[infoType] = [payload];
      }

      const path = await uploadIPFS(data);
      if (path && jobCoreContract) {
        await callContract(
          jobCoreContract,
          JOB_CORE_METHODS.updateCurrentResume,
          [path]
        );
        setRefresh((pre) => !pre);
        return;
      }
      return;
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateResume = async () => {
    try {
      if (!currentProfileUrl || !candidateProfile) {
        return alert("Please update current profile");
      }
      setCreatingResume(true);
      const path = await uploadIPFS(candidateProfile);
      if (path && jobCoreContract) {
        await callContract(jobCoreContract, JOB_CORE_METHODS.addResume, [path]);
        setCreatingResume(false);
        return;
      }
    } catch (error) {
      setCreatingResume(false);
      console.error(error);
    }
  };

  const [infoTypeSelected, setInfoTypeSelected] = useState(
    CANDIDATE_INFO_TYPE.PERSONAL_INFO
  );

  const handleShowModal = (type) => {
    setInfoTypeSelected(type);
    onOpen();
  };

  return (
    <CandidateLayout>
      <CreateModal
        type={infoTypeSelected}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleUpdateCurrentResume}
      />

      {!isLoading ? (
        <VStack align="stretch" spacing="4">
          <Box>
            <Button
              colorScheme="teal"
              onClick={handleCreateResume}
              isLoading={creatingResume}
            >
              Create resume
            </Button>
          </Box>

          <PersonalInformation
            candidateProfile={candidateProfile}
            updateHandler={handleUpdateCurrentResume}
            infoType={CANDIDATE_INFO_TYPE.PERSONAL_INFO}
          />

          <Box
            p="6"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
          >
            <HStack justify="space-between" align="center" pb="4">
              <Box fontSize="2xl" fontWeight="semibold">
                Education
              </Box>
              <Icon
                onClick={() => handleShowModal(CANDIDATE_INFO_TYPE.EDUCATION)}
                w="8"
                h="8"
                as={BiPlus}
                cursor="pointer"
              />
            </HStack>

            {candidateProfile &&
            candidateProfile[CANDIDATE_INFO_TYPE.EDUCATION] &&
            candidateProfile[CANDIDATE_INFO_TYPE.EDUCATION].length ? (
              <Grid templateColumns="repeat(3, 1fr)" gap="4">
                {candidateProfile[CANDIDATE_INFO_TYPE.EDUCATION].map(
                  (item, idx) => (
                    <Box key={idx} px="8">
                      <Box fontSize="xl" fontWeight="bold">
                        {item.name}
                      </Box>
                      <Box fontSize="lg">{item.major}</Box>
                      <Box fontSize="xs" color="whiteAlpha.800">
                        {item.from} - {item.to}
                      </Box>
                    </Box>
                  )
                )}
              </Grid>
            ) : (
              <HStack
                align="flex-start"
                justify="space-between"
                px="8"
                spacing="6"
              >
                <Box fontSize="lg">
                  Your education makes you the person you are now
                </Box>
                <Image
                  alt="image"
                  src="https://www.topcv.vn/v3/profile/profile-png/profile-education.png"
                />
              </HStack>
            )}
          </Box>

          <Box
            p="6"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
          >
            <HStack justify="space-between" align="center" pb="4">
              <Box fontSize="2xl" fontWeight="semibold">
                Experiences
              </Box>
              <Icon
                onClick={onOpen}
                w="8"
                h="8"
                as={BiPlus}
                cursor="pointer"
                onClick={() => handleShowModal(CANDIDATE_INFO_TYPE.EXPERIENCES)}
              />
            </HStack>
            {candidateProfile &&
            candidateProfile[CANDIDATE_INFO_TYPE.EXPERIENCES] &&
            candidateProfile[CANDIDATE_INFO_TYPE.EXPERIENCES].length ? (
              <Grid templateColumns="repeat(3, 1fr)" gap="4">
                {candidateProfile[CANDIDATE_INFO_TYPE.EXPERIENCES].map(
                  (item, idx) => (
                    <Box key={idx} px="8">
                      <Box fontSize="xl" fontWeight="bold">
                        {item.name}
                      </Box>
                      <Box fontSize="lg">{item.experiences}</Box>
                      <Box fontSize="xs" color="whiteAlpha.800">
                        {item.from} - {item.to}
                      </Box>
                    </Box>
                  )
                )}
              </Grid>
            ) : (
              <HStack
                align="flex-start"
                justify="space-between"
                px="8"
                spacing="6"
              >
                <Box fontSize="lg">
                  Your work experience makes you the person you are now
                </Box>
                <Image
                  alt="image"
                  src="https://www.topcv.vn/v3/profile/profile-png/profile-experience.png"
                />
              </HStack>
            )}
          </Box>

          <Box
            p="6"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
          >
            <HStack justify="space-between" align="center" pb="4">
              <Box fontSize="2xl" fontWeight="semibold">
                Skills
              </Box>
              <Icon
                onClick={onOpen}
                w="8"
                h="8"
                as={BiPlus}
                cursor="pointer"
                onClick={() => handleShowModal(CANDIDATE_INFO_TYPE.SKILLS)}
              />
            </HStack>

            {candidateProfile &&
            candidateProfile[CANDIDATE_INFO_TYPE.SKILLS] &&
            candidateProfile[CANDIDATE_INFO_TYPE.SKILLS].length ? (
              <Grid templateColumns="repeat(3, 1fr)" gap="4">
                {candidateProfile[CANDIDATE_INFO_TYPE.SKILLS].map(
                  (item, idx) => (
                    <Box key={idx} px="8">
                      <Box fontSize="xl" fontWeight="bold">
                        {item.name}
                      </Box>
                      <Box fontSize="lg">{item.description}</Box>
                    </Box>
                  )
                )}
              </Grid>
            ) : (
              <HStack
                align="flex-start"
                justify="space-between"
                px="8"
                spacing="6"
              >
                <Box fontSize="lg">
                  Thoroughly describing your skills helps others understand your
                  strengths and increases your chances of connecting with
                  others.
                </Box>
                <Image
                  alt="image"
                  src="https://www.topcv.vn/v3/profile/profile-png/profile-skills.png"
                />
              </HStack>
            )}
          </Box>

          <Box
            p="6"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
          >
            <HStack justify="space-between" align="center" pb="4">
              <Box fontSize="2xl" fontWeight="semibold">
                Projects
              </Box>
              <Icon
                onClick={onOpen}
                w="8"
                h="8"
                as={BiPlus}
                cursor="pointer"
                onClick={() => handleShowModal(CANDIDATE_INFO_TYPE.PROJECTS)}
              />
            </HStack>
            {candidateProfile &&
            candidateProfile[CANDIDATE_INFO_TYPE.PROJECTS] &&
            candidateProfile[CANDIDATE_INFO_TYPE.PROJECTS].length ? (
              <Grid templateColumns="repeat(3, 1fr)" gap="4">
                {candidateProfile[CANDIDATE_INFO_TYPE.PROJECTS].map(
                  (item, idx) => (
                    <Box key={idx} px="8">
                      <Box fontSize="xl" fontWeight="bold">
                        {item.name}
                      </Box>
                      <Box fontSize="lg">{item.description}</Box>
                    </Box>
                  )
                )}
              </Grid>
            ) : (
              <HStack
                align="flex-start"
                justify="space-between"
                px="8"
                spacing="6"
              >
                <Box fontSize="lg">
                  Your work experience makes you the person you are now
                </Box>
                <Image
                  alt="image"
                  src="https://www.topcv.vn/v3/profile/profile-png/profile-project.png"
                />
              </HStack>
            )}
          </Box>

          <Box
            p="6"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
          >
            <HStack justify="space-between" align="center" pb="4">
              <Box fontSize="2xl" fontWeight="semibold">
                Certificates
              </Box>
              <Icon
                onClick={onOpen}
                w="8"
                h="8"
                as={BiPlus}
                cursor="pointer"
                onClick={() =>
                  handleShowModal(CANDIDATE_INFO_TYPE.CERTIFICATES)
                }
              />
            </HStack>
            {candidateProfile &&
            candidateProfile[CANDIDATE_INFO_TYPE.CERTIFICATES] &&
            candidateProfile[CANDIDATE_INFO_TYPE.CERTIFICATES].length ? (
              <Grid templateColumns="repeat(3, 1fr)" gap="4">
                {candidateProfile[CANDIDATE_INFO_TYPE.CERTIFICATES].map(
                  (item, idx) => (
                    <Box key={idx} px="8">
                      <Box fontSize="xl" fontWeight="bold">
                        {item.name}
                      </Box>
                      <Box fontSize="lg">{item.description}</Box>
                    </Box>
                  )
                )}
              </Grid>
            ) : (
              <HStack
                align="flex-start"
                justify="space-between"
                px="8"
                spacing="6"
              >
                <Box fontSize="lg">
                  You can describe it more clearly in your CV by inserting a
                  photo of your certificate or certificate of merit.
                </Box>
                <Image
                  alt="image"
                  src="https://www.topcv.vn/v3/profile/profile-png/profile-certificate.png"
                />
              </HStack>
            )}
          </Box>

          <Box
            p="6"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
          >
            <HStack justify="space-between" align="center" pb="4">
              <Box fontSize="2xl" fontWeight="semibold">
                Prizes
              </Box>
              <Icon
                onClick={onOpen}
                w="8"
                h="8"
                as={BiPlus}
                cursor="pointer"
                onClick={() => handleShowModal(CANDIDATE_INFO_TYPE.PRIZES)}
              />
            </HStack>
            {candidateProfile &&
            candidateProfile[CANDIDATE_INFO_TYPE.PRIZES] &&
            candidateProfile[CANDIDATE_INFO_TYPE.PRIZES].length ? (
              <Grid templateColumns="repeat(3, 1fr)" gap="4">
                {candidateProfile[CANDIDATE_INFO_TYPE.PRIZES].map(
                  (item, idx) => (
                    <Box key={idx} px="8">
                      <Box fontSize="xl" fontWeight="bold">
                        {item.name}
                      </Box>
                      <Box fontSize="lg">{item.description}</Box>
                    </Box>
                  )
                )}
              </Grid>
            ) : (
              <HStack
                align="flex-start"
                justify="space-between"
                px="8"
                spacing="6"
              >
                <Box fontSize="lg">
                  You can describe it more clearly in your CV by inserting a
                  photo of your merit
                </Box>
                <Image
                  alt="image"
                  src="https://www.topcv.vn/v3/profile/profile-png/profile-prize.png"
                />
              </HStack>
            )}
          </Box>
        </VStack>
      ) : (
        <Box textAlign="center">
          <Spinner />
        </Box>
      )}
    </CandidateLayout>
  );
};

export default Candidate;
