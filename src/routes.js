import Home from "pages/Home";
import NotFound from "pages/NotFound";
import JobDetail from "pages/JobDetail";
import CandidateAppliedJobs from "pages/candidate/AppliedJobs";
import Candidate from "pages/candidate";
import Recruiter from "pages/recruiter";
import JobsManagement from "pages/recruiter/JobsManagement";
import JobManagementDetail from "pages/recruiter/JobManagementDetail";
import Resumes from "pages/recruiter/Resumes";
import Admin from "pages/admin";
import ResumesManagement from "pages/admin/Resumes";

export const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/admin",
    component: Admin,
    exact: true,
  },
  {
    path: "/admin/resumes",
    component: ResumesManagement,
    exact: true,
  },
  {
    path: "/candidate",
    component: Candidate,
    exact: true,
  },
  {
    path: "/applied-jobs",
    component: CandidateAppliedJobs,
    exact: true,
  },
  {
    path: "/recruiter",
    component: Recruiter,
    exact: true,
  },
  {
    path: "/recruiter/jobs-management",
    component: JobsManagement,
    exact: true,
  },
  {
    path: "/recruiter/jobs-management/:id",
    component: JobManagementDetail,
    exact: true,
  },
  {
    path: "/recruiter/resumes",
    component: Resumes,
    exact: true,
  },
  {
    path: "/jobs/:id",
    component: JobDetail,
    exact: true,
  },
  {
    path: "*",
    component: NotFound,
  },
];
