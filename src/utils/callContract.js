import { JOB_CORE_METHODS } from "configs";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
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

export const getIsRecuiter = (library, account) => {
  try {
    const jobCoreContract = getJobCoreContract(library);
    return callContract(jobCoreContract, JOB_CORE_METHODS.isRecuiter, [
      account,
    ]);
  } catch (error) {
    throw error;
  }
};

export const getOwner = async (library, account) => {
  try {
    const jobCoreContract = getJobCoreContract(library);
    const owner = await callContract(
      jobCoreContract,
      JOB_CORE_METHODS.owner,
      []
    );
    return owner === account;
  } catch (error) {
    throw error;
  }
};

export const getIsPurchasedFee = async (library, account) => {
  try {
    const jobCoreContract = getJobCoreContract(library);
    const timestamp = await callContract(
      jobCoreContract,
      JOB_CORE_METHODS.purchaseFeeTimes,
      [account]
    );
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return BigNumber.from(timestamp).gt(
      BigNumber.from(currentTimestamp.toString())
    );
    // return owner === account;
  } catch (error) {
    throw error;
  }
};

export const handlePurchaseFeeRecruiter = async (library, account) => {
  try {
    const jobCoreContract = getJobCoreContract(library, account);
    return callContract(
      jobCoreContract,
      JOB_CORE_METHODS.purchaseFeeRecruiter,
      [],
      { value: parseEther("0.001") }
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

export const getResumes = async (library) => {
  try {
    if (!library) return;
    const jobCoreContract = getJobCoreContract(library);
    if (!jobCoreContract) return [];

    const latestResumeId = await callContract(
      jobCoreContract,
      JOB_CORE_METHODS.getLatestResumeId,
      []
    );

    const resumes = await Promise.all(
      new Array(latestResumeId.toString()).fill("").map(async (_, idx) => {
        const [resumeIdx, owner] = await Promise.all([
          callContract(jobCoreContract, JOB_CORE_METHODS.resumeIndexs, [
            idx + 1,
          ]),
          callContract(jobCoreContract, JOB_CORE_METHODS.resumeOwner, [
            idx + 1,
          ]),
        ]);

        const resume = await callContract(
          jobCoreContract,
          JOB_CORE_METHODS.resumes,
          [owner, resumeIdx]
        );
        const res = await fetch(resume.url);
        const data = await res.json();
        return { id: idx + 1, ...data, url: resume.url };
        // const _recruiter = removeNumericKey(recruiter);
        // return _recruiter;
      })
    );

    return resumes;
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
