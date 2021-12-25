import { Box, Grid, HStack, Icon, Image, VStack } from "@chakra-ui/react";
import Job from "components/Job";
import { JOB_CORE_METHODS } from "configs";
import { callContract, useJobCoreContract } from "hooks/useContract";
import React, { useEffect, useState } from "react";
import { ImHourGlass } from "react-icons/im";
import { MdLocationOn, MdMonetizationOn, MdWork } from "react-icons/md";
import { Link } from "react-router-dom";
import { removeNumericKey } from "utils";
import CandidateLayout from "./components/CandidateLayout";

const AppliedJobs = () => {
  const jobCoreContract = useJobCoreContract();

  const [jobIds, setJobIds] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    function getAppliedJobs() {
      if (jobCoreContract) {
        callContract(jobCoreContract, JOB_CORE_METHODS.getAppliedJobs, []).then(
          setJobIds
        );
      }
    }

    getAppliedJobs();
  }, [jobCoreContract]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        if (jobIds?.length) {
          const _jobs = await Promise.all(
            jobIds.map((jobId) =>
              callContract(jobCoreContract, JOB_CORE_METHODS.getJob, [jobId])
            )
          );
          const __jobs = await Promise.all(
            _jobs.map(async (e) => {
              const job = removeNumericKey(e);

              const recruiterAddress = await callContract(
                jobCoreContract,
                JOB_CORE_METHODS.jobOwner,
                [job.id]
              );
              const recruiterId = await callContract(
                jobCoreContract,
                JOB_CORE_METHODS.recruiterToId,
                [recruiterAddress]
              );
              const recruiter = await callContract(
                jobCoreContract,
                JOB_CORE_METHODS.recruiters,
                [recruiterId]
              );

              const _recruiter = removeNumericKey(recruiter);

              return { ...job, recruiter: _recruiter };
            })
          );

          setJobs(__jobs);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getJobs();
  }, [jobIds]);

  return (
    <CandidateLayout>
      <Grid templateColumns="repeat(1, 1fr)" gap="4">
        {jobs.map((job, idx) => (
          <Job job={job} key={idx} />
        ))}
      </Grid>
    </CandidateLayout>
  );
};

export default AppliedJobs;
