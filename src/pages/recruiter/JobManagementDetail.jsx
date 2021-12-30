import { Box, Button, Grid } from "@chakra-ui/react";
import ResumePDF from "components/ResumePDF";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import ReactToPrint from "react-to-print";
import { getAppliedResumes, getJobByIdx } from "utils/callContract";
import RecruiterLayout from "./components/RecruiterLayout";
import { useParams } from "react-router-dom";
import Job from "components/Job";

const JobManagementDetail = () => {
  const { account, library } = useActiveWeb3React();
  const { id: jobId } = useParams();

  const [job, setJob] = useState();
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    (async () => {
      if (!library || isNaN(jobId)) return;

      try {
        const [resumes, job] = await Promise.all([
          getAppliedResumes(library, jobId),
          getJobByIdx(library, jobId),
        ]);
        console.log(resumes);
        setResumes(resumes);
        setJob(job);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [library, jobId]);

  const [selectedResume, setSelectedResume] = useState();
  const resumeRef = useRef();
  const clickRef = useRef();

  const downloadResumePDF = () => {
    clickRef.current.click();
  };

  return (
    <RecruiterLayout>
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

      {job && <Job job={job} />}

      <Box py="4" fontSize={"xl"} fontWeight={"semibold"}>
        Applied CV
      </Box>

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
    </RecruiterLayout>
  );
};

export default JobManagementDetail;
