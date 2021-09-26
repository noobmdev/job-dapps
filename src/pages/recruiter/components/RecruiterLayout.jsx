import React from "react";
import { FiUser } from "react-icons/fi";
import { GoTasklist } from "react-icons/go";
import DashboardLayout from "components/layouts/DashboardLayout";

const menuList = [
  {
    icon: FiUser,
    name: "Your Profile",
    path: "/recruiter",
  },
  {
    icon: GoTasklist,
    name: "Jobs Management",
    path: "/recruiter/jobs-management",
  },
];

const RecruiterLayout = ({ children }) => {
  return (
    <DashboardLayout
      redirectTittle="candidate"
      redirectPath="/candidate"
      menuList={menuList}
    >
      {children}
    </DashboardLayout>
  );
};

export default RecruiterLayout;
