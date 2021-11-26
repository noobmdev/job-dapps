import { JOB_CORE_METHODS } from "configs";
import { callContract, getJobCoreContract } from "hooks/useContract";
import { removeNumericKey } from "./index";

export const getLatestRecruiterId = (library) => {
  try {
    const jobCoreContract = getJobCoreContract(library);
    return callContract(
      jobCoreContract,
      JOB_CORE_METHODS.getLatestRecruiterId,
      []
    );
  } catch (error) {
    throw error;
  }
};

export const getRecruiters = async (library, latestRecruiterId) => {
  try {
    const jobCoreContract = getJobCoreContract(library);
    if (!jobCoreContract) return [];

    const recruiterLength = +latestRecruiterId.toString();
    const recruiters = await Promise.all(
      new Array(recruiterLength).fill("").map(async (_, idx) => {
        const recruiter = await callContract(
          jobCoreContract,
          JOB_CORE_METHODS.recruiters,
          [idx + 1]
        );
        const _recruiter = removeNumericKey(recruiter);
        return _recruiter;
      })
    );

    return recruiters;
  } catch (error) {
    throw error;
  }
};

export const getLatestJobId = (library) => {
  try {
    const jobCoreContract = getJobCoreContract(library);
    return callContract(jobCoreContract, JOB_CORE_METHODS.getLatestJobId, []);
  } catch (error) {
    throw error;
  }
};

export const getJobs = async (library, first, skip) => {
  try {
    const jobCoreContract = getJobCoreContract(library);
    if (!jobCoreContract) return [];

    const jobs = await callContract(jobCoreContract, JOB_CORE_METHODS.getJobs, [
      first,
      skip,
    ]);

    const _jobs = await Promise.all(
      jobs.map(async (e) => {
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

    return _jobs;
  } catch (error) {
    throw error;
  }
};
