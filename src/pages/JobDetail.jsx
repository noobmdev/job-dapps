import {
  Box,
  HStack,
  Button,
  Grid,
  Icon,
  VStack,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import {
  MdLocationOn,
  MdWork,
  MdMonetizationOn,
  MdContacts,
} from "react-icons/md";
import { ImHourGlass } from "react-icons/im";
import { IoIosPeople } from "react-icons/io";
import { CgWebsite } from "react-icons/cg";
import { useState } from "react";

const JobDetail = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedCV, setSelectedCV] = useState("");

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
                <option value={idx}>CV {idx + 1}</option>
              ))}
            </Select>
            {selectedCV && (
              <Box
                pt="4"
                textDecor="underline"
                cursor="pointer"
                color="blue.600"
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
              .Net Developer (C#, Asp.Net) - Không Yc Kn (Lương Net 10 - 25
              Triệu)
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
              <Box>Ha Noi</Box>
            </HStack>
            <HStack>
              <Icon as={MdWork} />
              <Box>No experience</Box>
            </HStack>
            <HStack>
              <Icon as={MdMonetizationOn} />
              <Box>12-13 trieu vnd</Box>
            </HStack>
            <HStack>
              <Icon as={ImHourGlass} />
              <Box>11 days left to apply</Box>
            </HStack>
          </Grid>
        </Box>
        <hr />
        <VStack align="stretch" spacing="4">
          <Box>
            <Box fontSize="xl" fontWeight="semibold">
              Description
            </Box>
            {[
              "Tham gia dự án phát triên các phần mềm quản trị doanh nghiệp",
              "Cáccông việc khác theo yêu cầu của cấp trên",
            ].map((e) => (
              <Box>- {e}</Box>
            ))}
          </Box>
          <Box>
            <Box fontSize="xl" fontWeight="semibold">
              Benifits
            </Box>
            {[
              "Lương: Lương cứng thỏa thuận theo năng lực (10-25 triệu) + Doanh số dự án + Thưởng + Lương tháng thứ 13;",
              "Có đầy đủ trang thiết bị phục vụ cho công việc tại công ty",
              "Tăng lương 1-2 lần/ năm theo năng lực của bản thân",
              "Làm việc 5.5 ngày/ tuần giờ hành chính 8h00’ – 17h00",
              "Phụ cấp ăn trưa, gửi xe, tăng ca, công tác phí",
              "Du lịch: 2-3 lần/1 năm; Ăn uống liên hoan giao lưu văn nghệ: 1-2 lần/1 tháng",
              "Thực hiện đầy đủ các quy định theo Luật lao động hiện hành",
            ].map((e) => (
              <Box>- {e}</Box>
            ))}
          </Box>
          <Box>
            <Box fontSize="xl" fontWeight="semibold">
              Requirements
            </Box>
            {[
              "Tốt nghiệp Đại học, Cao đẳng chuyên ngành Công nghệ thông tin hoặc chuyên ngành liên quan",
              "Ưu tiên ứng viên biết sử dụng .Net, C#",
              "Có khả năng sử dụng SQL server;",
              "Đam mê lập trình, kỹ thuật, sẵn sàng chấp nhận thách thức",
              "CHẤP NHẬN SINH VIÊN MỚI TỐT NGHIỆP - CÔNG TY ĐÀO TẠO",
            ].map((e) => (
              <Box>- {e}</Box>
            ))}
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
            src="https://cdn1.timviecnhanh.com/asset/home/img/employer/5ac2f45827a14_1522725976.jpg"
          />
        </Box>
        <VStack flex="1" align="stretch" spacing="3">
          <Box fontSize="xl" fontWeight="semibold">
            CÔNG TY CỔ PHẦN PHÁT TRIỂN PHẦN MỀM ASIA
          </Box>
          <HStack align="stretch">
            <Box textAlign="top">
              <Icon as={MdLocationOn} />
            </Box>
            <Box>Headquarters: </Box>
            <Box>Tầng 4, Số 6 Vũ Ngọc Phan, Phường Láng Hạ, Quận Đống Đa</Box>
          </HStack>
          <HStack>
            <Box>
              <Icon as={IoIosPeople} />
            </Box>

            <Box>Company size: </Box>
            <Box>150 - 200 people</Box>
          </HStack>
          <HStack>
            <Icon as={CgWebsite} />
            <Box>Website: </Box>
            <Box>www.asiasoft.com.vn</Box>
          </HStack>

          <hr />
          <HStack>
            <Box>
              <Icon as={MdContacts} />
            </Box>
            <Box>Contact: </Box>
            <Box>Ms Phương</Box>
          </HStack>
          <HStack>
            <Box>
              <Icon as={MdLocationOn} />
            </Box>
            <Box>Company address: </Box>
            <Box>Tầng 4, Số 6 Vũ Ngọc Phan, Phường Láng Hạ, Quận Đống Đa</Box>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default JobDetail;
