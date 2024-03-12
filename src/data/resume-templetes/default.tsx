import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Rect,
  Svg,
  PDFViewer,
  Font,
  Link,
} from "@react-pdf/renderer";

Font.register({
  family: "Jost",
  fonts: [
    {
      src: "/assets/font/Jost-Regular.ttf",
      fontWeight: "normal",
      fontStyle: "normal",
    },
    {
      src: "/assets/font/Jost-Medium.ttf",
      fontWeight: "medium",
      fontStyle: "normal",
    },
    {
      src: "/assets/font/Jost-Bold.ttf",
      fontWeight: "bold",
      fontStyle: "normal",
    },
    {
      src: "/assets/font/Jost-SemiBold.ttf",
      fontWeight: "semibold",
      fontStyle: "normal",
    },
    {
      src: "/assets/font/Jost-Italic.ttf",
      fontWeight: "normal",
      fontStyle: "italic",
    },
  ],
});

const styles = StyleSheet.create({
  document: {
    width: "100%",
    height: "100%",
  },
  page: {
    width: "100%",
    height: "100%",
    position: "relative",
    color: "#000",
    padding: 20,
    fontSize: 11,
    fontFamily: "Jost",
  },

  introView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: 0,
    textAlign: "center",
  },
});

type Classic1Prop = {
  personalInfo?: PersonalInfo | null;
  skills?: Skill[] | null;
  social?: Social | null;
  experience?: Experience[] | null;
  education?: Education[] | null;
  awardsAndCertifications?: AwardsAndCertifications[] | null;
};

// Create Document Component
export const Classic1 = ({
  personalInfo,
  skills,
  social,
  experience,
  awardsAndCertifications,
  education,
}: Classic1Prop) => (
  <Document style={styles.document}>
    <Page size="A4" style={styles.page}>
      <View style={styles.introView}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {personalInfo ? personalInfo.name : ""}
        </Text>

        <Text
          style={{
            fontSize: 14,
          }}
        >
          {personalInfo ? personalInfo.jobTitle : ""}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {personalInfo && (
            <>
              <Text>-{personalInfo.phone ?? ""}</Text>
              <Text>- {personalInfo.email ?? ""}</Text>
              <Text>
                -{" "}
                <Link
                  src={
                    `https://www.linkedin.com/in/${social?.linkedin?.split("@")[1]}` ??
                    ""
                  }
                  style={{
                    color: "black",
                  }}
                >
                  {social ? social.linkedin ?? "" : ""}
                </Link>
              </Text>
              <Text>- {personalInfo.address2 ?? ""}</Text>
            </>
          )}
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
          textAlign: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Skills
        </Text>

        <Svg
          style={{
            marginTop: 8,
            height: 2,
          }}
        >
          <Rect x={0} y={0} width={1000} height={2} fill="black" />
        </Svg>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 10,
            padding: "0px 20px",
          }}
        >
          {skills &&
            skills.map((skill, index) => (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    padding: "1px 5px",
                  }}
                >
                  {skill.skills}
                </Text>
                {skill.level == "Expert" && (
                  <Text
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    (Prof)
                  </Text>
                )}
              </View>
            ))}
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
          textAlign: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Experience
        </Text>

        <Svg
          style={{
            marginTop: 8,
            height: 2,
          }}
        >
          <Rect x={0} y={0} width={1000} height={2} fill="black" />
        </Svg>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 10,
            padding: "0 20",
          }}
        >
          {experience?.map((exp, index) => (
            <>
              <View
                key={exp.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: 8,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    >
                      {exp.company}{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                      }}
                    >
                      {exp.position}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <Text>
                      {new Date(exp.startDate).toLocaleDateString()} -{" "}
                      {new Date(exp.endDate).toLocaleDateString()}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "medium",
                        fontSize: 12,
                      }}
                    >
                      {exp.location}
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    marginTop: 8,
                    textAlign: "left",
                  }}
                >
                  {exp.description}
                </Text>
              </View>
            </>
          ))}
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
          textAlign: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Education
        </Text>

        <Svg
          style={{
            marginTop: 8,
            height: 2,
          }}
        >
          <Rect x={0} y={0} width={1000} height={2} fill="black" />
        </Svg>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 10,
            padding: "0 20",
          }}
        >
          {education?.map((edu, index) => (
            <>
              <View
                key={edu.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: 8,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    >
                      {edu.college}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                      }}
                    >
                      {edu.degree}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <Text>
                      {new Date(edu.startDate).toLocaleDateString()} -{" "}
                      {new Date(edu.endDate).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          ))}
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
          textAlign: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Certificates & Awards
        </Text>

        <Svg
          style={{
            marginTop: 8,
            height: 2,
          }}
        >
          <Rect x={0} y={0} width={1000} height={2} fill="black" />
        </Svg>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 10,
            padding: "0 20",
          }}
        >
          {awardsAndCertifications?.map((award, index) => (
            <>
              <View
                key={award.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: 8,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    >
                      {award.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                      }}
                    >
                      {award.description}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <Text>{new Date(award.date).toLocaleDateString()}</Text>
                  </View>
                </View>
              </View>
            </>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

import React from "react";

type Props = {
  personalInfo?: PersonalInfo | null;
  skills?: Skill[] | null;
  social?: Social | null;
  experience?: Experience[] | null;
  education?: Education[] | null;
  awardsAndCertifications?: AwardsAndCertifications[] | null;
};

function ClassicPDFView({
  personalInfo,
  skills,
  social,
  experience,
  education,
  awardsAndCertifications,
}: Props) {
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
    >
      <Classic1
        personalInfo={personalInfo}
        skills={skills}
        social={social}
        experience={experience}
        education={education}
        awardsAndCertifications={awardsAndCertifications}
      />
    </PDFViewer>
  );
}

export default ClassicPDFView;
