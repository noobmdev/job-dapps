import React from "react";
import { FiUser } from "react-icons/fi";
import { GoTasklist } from "react-icons/go";
import DashboardLayout from "components/layouts/DashboardLayout";

const menuList = [
  {
    icon: FiUser,
    name: "Recruiters",
    path: "/admin",
  },
  {
    icon: GoTasklist,
    name: "Resumes",
    path: "/admin/resumes",
  },
];

const RecruiterLayout = ({ children }) => {
  return (
    <DashboardLayout redirectTittle="" redirectPath="" menuList={menuList}>
      {children}
    </DashboardLayout>
  );
};

export default RecruiterLayout;
