import { Image } from "@chakra-ui/image";
import { Box, Grid } from "@chakra-ui/layout";
import React from "react";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Recruiters = ({ recruiters }) => {
  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" gap="8">
        {recruiters.map((recruiter, idx) => (
          <Box
            key={idx}
            cursor="pointer"
            className="hover-shadow"
            // border="1px solid"
            // borderColor="gray.300"
            borderRadius="md"
            bg="white"
            p="4"
          >
            <Image src={recruiter.logo} alt="Segun Adebayo" />
            <Box
              pt="4"
              fontSize={"lg"}
              fontWeight={"semibold"}
              textAlign={"center"}
              color="black"
            >
              {recruiter.name}
            </Box>
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default Recruiters;
