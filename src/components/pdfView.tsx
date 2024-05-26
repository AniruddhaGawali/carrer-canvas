import * as React from "react";
import ClassicTemplate, { ClassicPdfDocWithToolTip } from "@/templates/classic";

interface PDFViewerProps {
  typeOfTemplate: ResumeTypeTemplate;
  typeOfView: TemplateViewType;
  personalInfo?: PersonalInfo | null;
  skills?: Skill[] | null;
  social?: Social | null;
  experience?: Experience[] | null;
  projects?: Project[] | null;
  education?: Education[] | null;
  awardsAndCertifications?: AwardsAndCertifications[] | null;
}

const PDFViewer: React.FunctionComponent<PDFViewerProps> = (props) => {
  const {
    typeOfView,
    typeOfTemplate,
    personalInfo,
    skills,
    social,
    experience,
    projects,
    education,
    awardsAndCertifications,
  } = props;

  if (typeOfTemplate == "Classic") {
    if (typeOfView == "WithToolTip") {
      return (
        <ClassicPdfDocWithToolTip
          awardsAndCertifications={awardsAndCertifications}
          education={education}
          experience={experience}
          personalInfo={personalInfo}
          skills={skills}
          projects={projects}
          social={social}
        />
      );
    } else {
      return (
        <ClassicTemplate
          awardsAndCertifications={awardsAndCertifications}
          education={education}
          experience={experience}
          personalInfo={personalInfo}
          skills={skills}
          projects={projects}
          social={social}
        />
      );
    }
  } else {
    return null;
  }
};

export default PDFViewer;
