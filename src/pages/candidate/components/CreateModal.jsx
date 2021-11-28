import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Textarea } from "@chakra-ui/textarea";
import { CANDIDATE_INFO_TYPE, CANDIDATE_MODAL_TITLE } from "configs";
import React, { useEffect, useState } from "react";

const CreateModal = ({ type, isOpen, onClose, onSubmit }) => {
  const [info, setInfo] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      setInfo({});
    };
  }, [isOpen]);

  const handleSubmitting = async () => {
    try {
      setSubmitting(true);
      await onSubmit(info, type);
      setSubmitting(false);
      onClose();
    } catch (error) {
      setSubmitting(false);
    }
  };

  const renderModalTile = () => {
    switch (type) {
      case CANDIDATE_INFO_TYPE.EDUCATION:
        return CANDIDATE_MODAL_TITLE.ADD_EDUCATION;
      case CANDIDATE_INFO_TYPE.EXPERIENCES:
        return CANDIDATE_MODAL_TITLE.ADD_EXPERIENCE;
      case CANDIDATE_INFO_TYPE.SKILLS:
        return CANDIDATE_MODAL_TITLE.ADD_SKILL;
      case CANDIDATE_INFO_TYPE.PROJECTS:
        return CANDIDATE_MODAL_TITLE.ADD_PROJECT;
      case CANDIDATE_INFO_TYPE.CERTIFICATES:
        return CANDIDATE_MODAL_TITLE.ADD_CERTIFICATE;
      case CANDIDATE_INFO_TYPE.PRIZES:
        return CANDIDATE_MODAL_TITLE.ADD_PRIZE;

      default:
        return;
    }
  };

  const renderBody = () => {
    switch (type) {
      case CANDIDATE_INFO_TYPE.EDUCATION:
        return (
          <>
            <Box>
              <FormLabel>Education Name</FormLabel>
              <Input
                value={info.name ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, name: e.target.value }))
                }
                placeholder="Education Name"
              />
            </Box>
            <Box>
              <FormLabel>Major</FormLabel>
              <Input
                value={info.major ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, major: e.target.value }))
                }
                placeholder="Major"
              />
            </Box>
            <HStack>
              <Box flex="1">
                <FormLabel>From</FormLabel>
                <Input
                  value={info.from ?? ""}
                  onChange={(e) =>
                    setInfo((info) => ({ ...info, from: e.target.value }))
                  }
                  type="date"
                  placeholder="Major"
                />
              </Box>
              <Box flex="1">
                <FormLabel>To</FormLabel>
                <Input
                  value={info.to ?? ""}
                  onChange={(e) =>
                    setInfo((info) => ({ ...info, to: e.target.value }))
                  }
                  type="date"
                  placeholder="Full name"
                />
              </Box>
            </HStack>
          </>
        );

      case CANDIDATE_INFO_TYPE.EXPERIENCES:
        return (
          <>
            <Box>
              <FormLabel>Company</FormLabel>
              <Input
                value={info.name ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, name: e.target.value }))
                }
                placeholder="Company"
              />
            </Box>
            <Box>
              <FormLabel>Experiences</FormLabel>
              <Input
                value={info.experiences ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, experiences: e.target.value }))
                }
                placeholder="Experiences"
              />
            </Box>
            <HStack>
              <Box flex="1">
                <FormLabel>From</FormLabel>
                <Input
                  value={info.from ?? ""}
                  onChange={(e) =>
                    setInfo((info) => ({ ...info, from: e.target.value }))
                  }
                  type="date"
                  placeholder="Major"
                />
              </Box>
              <Box flex="1">
                <FormLabel>To</FormLabel>
                <Input
                  value={info.to ?? ""}
                  onChange={(e) =>
                    setInfo((info) => ({ ...info, to: e.target.value }))
                  }
                  type="date"
                  placeholder="Full name"
                />
              </Box>
            </HStack>
          </>
        );

      case CANDIDATE_INFO_TYPE.SKILLS:
        return (
          <>
            <Box>
              <FormLabel>Skill Name</FormLabel>
              <Input
                value={info.name ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, name: e.target.value }))
                }
                placeholder="Skill Name"
              />
            </Box>
            <Box>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={info.description ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, description: e.target.value }))
                }
                placeholder="Description"
              />
            </Box>
          </>
        );

      case CANDIDATE_INFO_TYPE.PROJECTS:
        return (
          <>
            <Box>
              <FormLabel>Project Name</FormLabel>
              <Input
                value={info.name ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, name: e.target.value }))
                }
                placeholder="Project Name"
              />
            </Box>
            <Box>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={info.description ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, description: e.target.value }))
                }
                placeholder="Description"
              />
            </Box>
          </>
        );

      case CANDIDATE_INFO_TYPE.CERTIFICATES:
        return (
          <>
            <Box>
              <FormLabel>Certificate Name</FormLabel>
              <Input
                value={info.name ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, name: e.target.value }))
                }
                placeholder="Certificate Name"
              />
            </Box>
            <Box>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={info.description ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, description: e.target.value }))
                }
                placeholder="Description"
              />
            </Box>
          </>
        );

      case CANDIDATE_INFO_TYPE.PRIZES:
        return (
          <>
            <Box>
              <FormLabel>Prize Name</FormLabel>
              <Input
                value={info.name ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, name: e.target.value }))
                }
                placeholder="Prize Name"
              />
            </Box>
            <Box>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={info.description ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, description: e.target.value }))
                }
                placeholder="Description"
              />
            </Box>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{renderModalTile()}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing="4" align="stretch">
            {renderBody()}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            isLoading={submitting}
            onClick={handleSubmitting}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateModal;
