import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import Icon from "@chakra-ui/icon";
import { Input } from "@chakra-ui/input";
import { Box, Grid, GridItem, HStack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";

const PersonalInformation = ({ candidateProfile, updateHandler, infoType }) => {
  const [canEdit, setCanEdit] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    gender: "male",
    yearOfBirth: new Date().getFullYear(),
    email: "",
    phone: "",
    addr: "",
    bio: "",
  });

  useEffect(() => {
    if (candidateProfile?.[infoType]?.length) {
      setPersonalInfo(candidateProfile?.[infoType][0]);
    }
  }, [candidateProfile]);

  console.log(personalInfo);

  return (
    <Box p="6" border="1px solid" borderColor="gray.300" borderRadius="md">
      <HStack justify="space-between" align="center" pb="4">
        <Box fontSize="2xl" fontWeight="semibold">
          Personal Information
        </Box>
        <HStack>
          {canEdit && (
            <Button
              onClick={async () => {
                setSubmitting(true);
                await updateHandler(personalInfo, infoType);
                setCanEdit(false);
                setSubmitting(false);
              }}
              colorScheme="teal"
              isLoading={submitting}
            >
              Save
            </Button>
          )}
          <Icon
            onClick={() => setCanEdit(true)}
            w="8"
            h="8"
            as={BiEdit}
            cursor="pointer"
          />
        </HStack>
      </HStack>
      <Grid templateColumns="repeat(2, 1fr)" gap="4">
        <GridItem colSpan="2">
          <FormLabel>Full Name</FormLabel>
          <Input
            value={personalInfo.name}
            onChange={(e) =>
              setPersonalInfo((info) => ({ ...info, name: e.target.value }))
            }
            isDisabled={!canEdit}
            placeholder="Full name"
          />
        </GridItem>
        <GridItem>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            value={personalInfo.gender}
            onChange={(value) =>
              setPersonalInfo((info) => ({ ...info, gender: value }))
            }
          >
            <HStack spacing="6">
              <Radio isDisabled={!canEdit} value="male">
                Male
              </Radio>
              <Radio isDisabled={!canEdit} value="female">
                Female
              </Radio>
            </HStack>
          </RadioGroup>
        </GridItem>
        <GridItem>
          <FormLabel>Year of birthday</FormLabel>
          <Select
            value={personalInfo.yearOfBirth}
            onChange={(e) =>
              setPersonalInfo((info) => ({
                ...info,
                yearOfBirth: e.target.value,
              }))
            }
            isDisabled={!canEdit}
          >
            {new Array(50).fill(new Date().getFullYear()).map((item, idx) => (
              <option
                style={{
                  color: "black",
                }}
                key={idx}
              >
                {item - idx}
              </option>
            ))}
          </Select>
        </GridItem>
        <GridItem>
          <FormLabel>Email</FormLabel>
          <Input
            value={personalInfo.email}
            onChange={(e) =>
              setPersonalInfo((info) => ({ ...info, email: e.target.value }))
            }
            isDisabled={!canEdit}
            placeholder="Email"
          />
        </GridItem>
        <GridItem>
          <FormLabel>Phone</FormLabel>
          <Input
            value={personalInfo.phone}
            onChange={(e) =>
              setPersonalInfo((info) => ({ ...info, phone: e.target.value }))
            }
            isDisabled={!canEdit}
            placeholder="Phone"
          />
        </GridItem>
        <GridItem colSpan="2">
          <FormLabel>Address</FormLabel>
          <Input
            value={personalInfo.addr}
            onChange={(e) =>
              setPersonalInfo((info) => ({ ...info, addr: e.target.value }))
            }
            isDisabled={!canEdit}
            placeholder="Address"
          />
        </GridItem>
        <GridItem colSpan="2">
          <FormLabel>Bio</FormLabel>
          <Textarea
            value={personalInfo.bio}
            onChange={(e) =>
              setPersonalInfo((info) => ({ ...info, bio: e.target.value }))
            }
            isDisabled={!canEdit}
            placeholder="Bio"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default PersonalInformation;
