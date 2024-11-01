const { BigNumber } = require("@ethersproject/bignumber");

export const JOB_CORE_ADDRESS = "0x26C357AAac1350AC68FEEbF9b8fCAa73a1AEb8c3";

export const JOB_CORE_METHODS = {
  getLatestRecruiterId: "getLatestRecruiterId",
  recruiters: "recruiters",
  getLatestJobId: "getLatestJobId",
  getJob: "getJob",
  getJobs: "getJobs(uint256,uint256)",
  jobOwner: "jobOwner",
  recruiterToId: "recruiterToId",
  addJob: "addJob",
  getOwnerJobs: "getOwnerJobs",
  jobs: "jobs",
  updateCurrentResume: "updateCurrentResume",
  getCurrentResume: "getCurrentResume",
  addResume: "addResume",
  getOwnerResumes: "getOwnerResumes",
  isAppliedJob: "isAppliedJob",
  isResumeApplied: "isResumeApplied",
  applyJob: "applyJob",
  getAppliedJobs: "getAppliedJobs",
  isRecuiter: "isRecuiter",
  owner: "owner",
  purchaseFeeTimes: "purchaseFeeTimes",
  purchaseFeeRecruiter: "purchaseFeeRecruiter",
  getLatestResumeId: "getLatestResumeId",
  resumeIndexs: "resumeIndexs",
  resumes: "resumes",
  resumeOwner: "resumeOwner",
  getAppliedResumeIds: "getAppliedResumeIds",
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

export const CANDIDATE_MODAL_TITLE = {
  ADD_EDUCATION: "Add Education",
  ADD_EXPERIENCE: "Add Experience",
  ADD_SKILL: "Add Skill",
  ADD_PROJECT: "Add Project",
  ADD_CERTIFICATE: "Add Certificate",
  ADD_PRIZE: "Add Prize",
};

export const CANDIDATE_INFO_TYPE = {
  PERSONAL_INFO: "personalInfo",
  EDUCATION: "education",
  EXPERIENCES: "experiences",
  SKILLS: "skills",
  CERTIFICATES: "certificates",
  PROJECTS: "projects",
  PRIZES: "prizes",
};
