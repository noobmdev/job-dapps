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
              <FormLabel>Tên cơ sở giáo dục</FormLabel>
              <Input
                value={info.name ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, name: e.target.value }))
                }
                placeholder="Tên cơ sở giáo dục"
              />
            </Box>
            <Box>
              <FormLabel>Chuyên ngành</FormLabel>
              <Input
                value={info.major ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, major: e.target.value }))
                }
                placeholder="Chuyên ngành"
              />
            </Box>
            <HStack>
              <Box flex="1">
                <FormLabel>Từ</FormLabel>
                <Input
                  value={info.from ?? ""}
                  onChange={(e) =>
                    setInfo((info) => ({ ...info, from: e.target.value }))
                  }
                  type="date"
                />
              </Box>
              <Box flex="1">
                <FormLabel>Đến</FormLabel>
                <Input
                  value={info.to ?? ""}
                  onChange={(e) =>
                    setInfo((info) => ({ ...info, to: e.target.value }))
                  }
                  type="date"
                />
              </Box>
            </HStack>
          </>
        );

      case CANDIDATE_INFO_TYPE.EXPERIENCES:
        return (
          <>
            <Box>
              <FormLabel>Công ty</FormLabel>
              <Input
                value={info.name ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, name: e.target.value }))
                }
                placeholder="Công ty"
              />
            </Box>
            <Box>
              <FormLabel>Kinh nghiệm</FormLabel>
              <Input
                value={info.experiences ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, experiences: e.target.value }))
                }
                placeholder="Kinh nghiệm"
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
                />
              </Box>
            </HStack>
          </>
        );

      case CANDIDATE_INFO_TYPE.SKILLS:
        return (
          <>
            <Box>
              <FormLabel>Kỹ năng</FormLabel>
              <Input
                value={info.name ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, name: e.target.value }))
                }
                placeholder="Tên kỹ năng"
              />
            </Box>
            <Box>
              <FormLabel>Mô tả</FormLabel>
              <Textarea
                value={info.description ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, description: e.target.value }))
                }
                placeholder="Mô tả"
              />
            </Box>
          </>
        );

      case CANDIDATE_INFO_TYPE.PROJECTS:
        return (
          <>
            <Box>
              <FormLabel>Tên sản phẩm</FormLabel>
              <Input
                value={info.name ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, name: e.target.value }))
                }
                placeholder="Tên sản phẩm"
              />
            </Box>
            <Box>
              <FormLabel>Mô tả</FormLabel>
              <Textarea
                value={info.description ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, description: e.target.value }))
                }
                placeholder="Mô tả"
              />
            </Box>
          </>
        );

      case CANDIDATE_INFO_TYPE.CERTIFICATES:
        return (
          <>
            <Box>
              <FormLabel>Tên chứng chỉ</FormLabel>
              <Input
                value={info.name ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, name: e.target.value }))
                }
                placeholder="Tên chứng chỉ"
              />
            </Box>
            <Box>
              <FormLabel>Mô tả</FormLabel>
              <Textarea
                value={info.description ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, description: e.target.value }))
                }
                placeholder="Mô tả"
              />
            </Box>
          </>
        );

      case CANDIDATE_INFO_TYPE.PRIZES:
        return (
          <>
            <Box>
              <FormLabel>Tên giải thưởng</FormLabel>
              <Input
                value={info.name ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, name: e.target.value }))
                }
                placeholder="Tên giải thưởng"
              />
            </Box>
            <Box>
              <FormLabel>Mô tả</FormLabel>
              <Textarea
                value={info.description ?? ""}
                onChange={(e) =>
                  setInfo((info) => ({ ...info, description: e.target.value }))
                }
                placeholder="Mô tả"
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
            Lưu
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateModal;
