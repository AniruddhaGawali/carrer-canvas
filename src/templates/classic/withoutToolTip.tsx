import { PDFViewer } from "@react-pdf/renderer";
import { Classic1 } from "./default";

type Classic1Prop = {
  personalInfo?: PersonalInfo | null;
  skills?: Skill[] | null;
  social?: Social | null;
  experience?: Experience[] | null;
  projects?: Project[] | null;
  education?: Education[] | null;
  awardsAndCertifications?: AwardsAndCertifications[] | null;
};

export default function ClassicPDFViewWithoutToolTip({
  personalInfo,
  skills,
  social,
  experience,
  education,
  projects,
  awardsAndCertifications,
}: Classic1Prop) {
  return (
    <PDFViewer
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
      }}
      showToolbar={false}
    >
      <Classic1
        personalInfo={personalInfo}
        skills={skills}
        social={social}
        experience={experience}
        education={education}
        projects={projects}
        awardsAndCertifications={awardsAndCertifications}
      />
    </PDFViewer>
  );
}
