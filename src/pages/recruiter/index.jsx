import { FormLabel } from "@chakra-ui/form-control";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Box, Grid, GridItem, HStack, VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { JOB_CORE_METHODS, ZeroBigNumber } from "configs";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { callContract, useJobCoreContract } from "hooks/useContract";
import React, { useEffect, useState } from "react";
import { removeNumericKey } from "utils";
import RecruiterLayout from "./components/RecruiterLayout";

const companySizes = [
  "1 - 9",
  "10 - 49",
  "50 - 99",
  "100 - 299",
  "300 - 999",
  "> 1000",
];

const Recruiter = () => {
  const { account } = useActiveWeb3React();

  const jobCoreContract = useJobCoreContract();

  const [recruiter, setRecruiter] = useState({
    name: "",
    headquarter: "",
    website: "",
    companySize: companySizes[0],
    contact: "",
    addr: "",
  });

  useEffect(() => {
    async function getRecruiterProfile() {
      if (jobCoreContract && account) {
        const recruiterId = await callContract(
          jobCoreContract,
          JOB_CORE_METHODS.recruiterToId,
          [account]
        );
        if (!ZeroBigNumber.eq(recruiterId)) {
          const recruiter = await callContract(
            jobCoreContract,
            JOB_CORE_METHODS.recruiters,
            [recruiterId]
          );
          const _recruiter = removeNumericKey(recruiter);
          setRecruiter((pre) => ({ ...pre, ..._recruiter }));
        }
      }
    }

    getRecruiterProfile();
  }, [jobCoreContract, account]);

  // useEffect(() => {
  //   if (recruiter) {
  //     console.log(recruiter);
  //     setRecruiterInfo(recruiter);
  //   }
  // }, [recruiter]);

  return (
    <RecruiterLayout>
      <VStack align="stretch" spacing="4">
        <Box p="6" border="1px solid" borderColor="gray.300" borderRadius="md">
          <HStack justify="space-between" align="center" pb="4">
            <Box fontSize="2xl" fontWeight="semibold">
              Company Information
            </Box>
            {/* <Icon w="8" h="8" as={BiEdit} cursor="pointer" /> */}
          </HStack>
          <Grid templateColumns="repeat(2, 1fr)" gap="4">
            <GridItem>
              <FormLabel>Company name</FormLabel>
              <Input
                value={recruiter.name}
                // onChange={(e) =>
                //   setRecruiter((info) => ({
                //     ...info,
                //     name: e.target.value,
                //   }))
                // }
                placeholder="Company name"
              />
            </GridItem>
            <GridItem rowSpan="2">
              <HStack justify="center">
                <Box boxSize="70%" role="group" pos="relative" p="4">
                  <Image src={recruiter.logo} alt="logo" />
                  <Box
                    pos="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    bg="rgba(0,0,0,0.3)"
                    d="none"
                    cursor="pointer"
                    borderRadius="md"
                    lineHeight="100%"
                    _groupHover={{
                      d: "block",
                    }}
                    textAlign="center"
                  />
                </Box>
              </HStack>
            </GridItem>
            <GridItem>
              <FormLabel>Headquarters</FormLabel>
              <Input value={recruiter.headquarter} placeholder="Headquarters" />
            </GridItem>

            <GridItem>
              <FormLabel>Website</FormLabel>
              <Input value={recruiter.website} placeholder="Website" />
            </GridItem>
            <GridItem>
              <FormLabel>Company size</FormLabel>
              <Box>
                <Select value={recruiter.name}>
                  {companySizes.map((item, idx) => (
                    <option key={idx} value="item">
                      {item} people
                    </option>
                  ))}
                </Select>
              </Box>
            </GridItem>
            <GridItem colSpan="2">
              <FormLabel>Contact</FormLabel>
              <Input value={recruiter.contact} placeholder="Contact" />
            </GridItem>
            <GridItem colSpan="2">
              <FormLabel>Company address</FormLabel>
              <Input
                value={recruiter.companySize}
                placeholder="Company address"
              />
            </GridItem>
          </Grid>
        </Box>
      </VStack>
    </RecruiterLayout>
  );
};

export default Recruiter;
