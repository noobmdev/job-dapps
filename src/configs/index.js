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

export const LOCATIONS = {
  ALL: "All cities",
  HA_NOI: "Ha Noi",
  HO_CHI_MINH: "Ho Chi Minh",
  DA_NANG: "Da Nang",
  OTHER: "Other",
};

export const SKILLS = {
  BLOCKCHAIN: "Blockchain",
  JAVASCRIPT: "Javascript",
  HTML_CSS: "HTML & CSS",
  DATABASE: "Database",
  GIT: "Git",
  OTHER: "Other",
};
