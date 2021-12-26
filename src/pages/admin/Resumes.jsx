import { Box, Button, Grid } from "@chakra-ui/react";
import ResumePDF from "components/ResumePDF";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import ReactToPrint from "react-to-print";
import { getResumes } from "utils/callContract";
import Layout from "./Layout";

const ResumesManagement = () => {
  const { account, library } = useActiveWeb3React();

  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    (async () => {
      if (!library) return;

      try {
        const resumes = await getResumes(library);
        console.log(resumes);
        setResumes(resumes);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [library]);

  const [selectedResume, setSelectedResume] = useState();
  const resumeRef = useRef();
  const clickRef = useRef();

  const downloadResumePDF = () => {
    clickRef.current.click();
  };

  return (
    <Layout>
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
              display: "none",
            }}
          ></button>
        )}
        content={() => resumeRef.current}
      />
      <ResumePDF resume={selectedResume} ref={resumeRef} />

      <Button colorScheme={"teal"} mb="4" onClick={downloadResumePDF}>
        {selectedResume ? "Download resume" : "Select resume to download"}
      </Button>

      <Grid templateColumns="repeat(3,1fr)" gap="6">
        {resumes.map((resume, idx) => (
          <Box cursor={"pointer"}>
            <Box
              key={idx}
              pt="100%"
              bgImage={
                "https://is5-ssl.mzstatic.com/image/thumb/Purple115/v4/5a/a7/62/5aa76240-c939-c011-0f62-f15ef46010ed/source/512x512bb.jpg"
              }
              bgRepeat={"no-repeat"}
              bgSize={"cover"}
              onClick={() => setSelectedResume(resume)}
            />
            <Box textAlign={"center"} fontSize={"lg"} fontWeight={"semibold"}>
              Resume {idx + 1}
            </Box>
          </Box>
        ))}
      </Grid>
    </Layout>
  );
};

export default ResumesManagement;
