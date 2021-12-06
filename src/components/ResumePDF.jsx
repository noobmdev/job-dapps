import { CANDIDATE_INFO_TYPE } from "configs";
import React from "react";

export const ResumePDF = React.forwardRef((props, ref) => {
  const { resume } = props;
  console.log(resume);
  return (
    <div style={{ display: "none" }}>
      <div ref={ref}>
        {resume && (
          <div>
            <div>Thông tin cá nhân</div>
            {resume[CANDIDATE_INFO_TYPE.PERSONAL_INFO]?.length ? (
              <>
                <div>
                  Họ và tên: {resume[CANDIDATE_INFO_TYPE.PERSONAL_INFO][0].name}
                </div>
                <div>
                  Giới tính:{" "}
                  {resume[CANDIDATE_INFO_TYPE.PERSONAL_INFO][0].gender}
                </div>
                <div>
                  Năm sinh:
                  {resume[CANDIDATE_INFO_TYPE.PERSONAL_INFO][0].yearOfBirth}
                </div>
                <div>
                  Email: {resume[CANDIDATE_INFO_TYPE.PERSONAL_INFO][0].email}
                </div>
                <div>
                  Điện thoại:{" "}
                  {resume[CANDIDATE_INFO_TYPE.PERSONAL_INFO][0].phone}
                </div>
                <div>
                  Địa chỉ: {resume[CANDIDATE_INFO_TYPE.PERSONAL_INFO][0].addr}
                </div>
                <div>
                  Giới thiệu: {resume[CANDIDATE_INFO_TYPE.PERSONAL_INFO][0].bio}
                </div>
              </>
            ) : (
              <div>None</div>
            )}

            <div>Education</div>
            {resume[CANDIDATE_INFO_TYPE.EDUCATION]?.length ? (
              resume[CANDIDATE_INFO_TYPE.EDUCATION].map((edu) => (
                <div>
                  - Education Name: {edu.name}. Major: {edu.major}. From{" "}
                  {edu.from} to {edu.to}
                </div>
              ))
            ) : (
              <div>None</div>
            )}

            <div>Experiences</div>
            {resume[CANDIDATE_INFO_TYPE.EXPERIENCES]?.length ? (
              resume[CANDIDATE_INFO_TYPE.EXPERIENCES].map((exp) => (
                <div>
                  - {exp.name}. From {exp.from} to {exp.to}
                </div>
              ))
            ) : (
              <div>None</div>
            )}

            <div>Skills</div>
            {resume[CANDIDATE_INFO_TYPE.SKILLS]?.length ? (
              resume[CANDIDATE_INFO_TYPE.SKILLS].map((skill) => (
                <div>
                  - {skill.name}: {skill.description}
                </div>
              ))
            ) : (
              <div>None</div>
            )}

            <div>Projects</div>
            {resume[CANDIDATE_INFO_TYPE.PROJECTS]?.length ? (
              resume[CANDIDATE_INFO_TYPE.PROJECTS].map((project) => (
                <div>
                  - {project.name}: {project.description}
                </div>
              ))
            ) : (
              <div>None</div>
            )}

            <div>Certificates</div>
            {resume[CANDIDATE_INFO_TYPE.CERTIFICATES]?.length ? (
              resume[CANDIDATE_INFO_TYPE.CERTIFICATES].map((cert) => (
                <div>
                  - {cert.name}: {cert.description}
                </div>
              ))
            ) : (
              <div>None</div>
            )}

            <div>Prizes</div>
            {resume[CANDIDATE_INFO_TYPE.PRIZES]?.length ? (
              resume[CANDIDATE_INFO_TYPE.PRIZES].map((prize) => (
                <div>
                  - {prize.name}: {prize.description}
                </div>
              ))
            ) : (
              <div>None</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

export default ResumePDF;
