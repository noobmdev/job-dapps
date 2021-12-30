import React from "react";
import { FiUser, FiSearch } from "react-icons/fi";
import { GoTasklist } from "react-icons/go";
import DashboardLayout from "components/layouts/DashboardLayout";

const menuList = [
  {
    icon: FiUser,
    name: "Hồ sơ",
    path: "/recruiter",
  },
  {
    icon: GoTasklist,
    name: "Quản lý công việc",
    path: "/recruiter/jobs-management",
  },
  {
    icon: FiSearch,
    name: "Tìm kiếm CV",
    path: "/recruiter/resumes",
  },
];

const RecruiterLayout = ({ children }) => {
  return (
    <DashboardLayout
      redirectTittle="ứng viên"
      redirectPath="/candidate"
      menuList={menuList}
    >
      {children}
    </DashboardLayout>
  );
};

export default RecruiterLayout;
