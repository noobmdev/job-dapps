const { BigNumber } = require("@ethersproject/bignumber");

export const JOB_CORE_ADDRESS = "0x33d06cfC1193433BF7CC922Db57C272dFf2391a3";

export const JOB_CORE_METHODS = {
  getLatestRecruiterId: "getLatestRecruiterId",
  recruiters: "recruiters",
  getJobs: "getJobs",
  jobOwner: "jobOwner",
  recruiterToId: "recruiterToId",
  addJob: "addJob",
  getOwnerJobs: "getOwnerJobs",
  jobs: "jobs",
  updateCurrentResume: "updateCurrentResume",
  getCurrentResume: "getCurrentResume",
};

export const OneBigNumber = BigNumber.from("1");
export const ZeroBigNumber = BigNumber.from("0");
