import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import Layout from "./Layout";
import { getLatestRecruiterId, getRecruiters } from "utils/callContract";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";

const Admin = () => {
  const { library } = useActiveWeb3React();

  const [latestRecruiterId, setLatestRecruiterId] = useState();
  const [recruiters, setRecruiters] = useState([]);
  const [loadingRecruiters, setLoadingRecruiters] = useState(true);

  useEffect(() => {
    if (library) {
      getLatestRecruiterId(library).then(setLatestRecruiterId);
    }
  }, [library]);

  useEffect(() => {
    if (library && latestRecruiterId) {
      getRecruiters(library, latestRecruiterId)
        .then(setRecruiters)
        .then((_) => setLoadingRecruiters(false))
        .catch((err) => setLoadingRecruiters(false));
    }
  }, [library, latestRecruiterId]);

  return (
    <Layout>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th color={"white"}>STT</Th>
            <Th color={"white"}>Name</Th>
            <Th color={"white"}>Website</Th>
            <Th color={"white"}>Logo</Th>
          </Tr>
        </Thead>
        <Tbody>
          {recruiters.map((r, idx) => (
            <Tr key={idx}>
              <Td>{idx + 1}</Td>
              <Td>{r.name}</Td>
              <Td>{r.website}</Td>
              <Td>
                <Box
                  pt="100%"
                  bgImage={r.logo}
                  bgRepeat={"no-repeat"}
                  bgSize={"contain"}
                  bgPos={"center"}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Layout>
  );
};

export default Admin;
