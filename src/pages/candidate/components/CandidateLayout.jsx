import React from "react";
import { FiUser } from "react-icons/fi";
import { GoTasklist } from "react-icons/go";
import DashboardLayout from "components/layouts/DashboardLayout";

const menuList = [
  {
    icon: FiUser,
    name: "Hồ sơ",
    path: "/candidate",
  },
  {
    icon: GoTasklist,
    name: "Công việc đã ứng tuyển",
    path: "/applied-jobs",
  },
];

const CandidateLayout = ({ children }) => {
  return (
    <DashboardLayout
      redirectTittle="nhà tuyển dụng"
      redirectPath="/recruiter"
      menuList={menuList}
    >
      {children}
    </DashboardLayout>
  );
};

export default CandidateLayout;
