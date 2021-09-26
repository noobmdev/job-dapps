import Home from "pages/Home";
import JobDetail from "pages/JobDetail";
import UserAppliedJobs from "pages/user/AppliedJobs";
import UserProfile from "pages/user/Profile";

export const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/profile",
    component: UserProfile,
    exact: true,
  },
  {
    path: "/applied-jobs",
    component: UserAppliedJobs,
    exact: true,
  },
  {
    path: "/jobs/:id",
    component: JobDetail,
    exact: true,
  },
];
