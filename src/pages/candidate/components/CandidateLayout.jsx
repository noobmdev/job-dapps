import React from "react";
import { FiUser } from "react-icons/fi";
import { GoTasklist } from "react-icons/go";
import DashboardLayout from "components/layouts/DashboardLayout";

const menuList = [
  {
    icon: FiUser,
    name: "Your Profile",
    path: "/candidate",
  },
  {
    icon: GoTasklist,
    name: "Applied Jobs",
    path: "/applied-jobs",
  },
];

const CandidateLayout = ({ children }) => {
  return (
    <DashboardLayout
      redirectTittle="recruiter"
      redirectPath="/recruiter"
      menuList={menuList}
    >
      {children}
    </DashboardLayout>
  );
};

export default CandidateLayout;
