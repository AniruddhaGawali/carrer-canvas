import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Rect,
  Svg,
  Circle,
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
  personalInfo?: PersonalInfo;
  skills?: Skill[];
  social: Social;
};

// Create Document Component
const Classic1 = ({ personalInfo, skills, social }: Classic1Prop) => (
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
                <Text>-{personalInfo.phone}</Text>
                <Text>- {personalInfo.email}</Text>
                <Text>
                  -{" "}
                  <Link
                    src={personalInfo.website}
                    style={{
                      color: "black",
                    }}
                  >
                    {social.linkedin}
                  </Link>
                </Text>
                <Text>- {personalInfo.address2}</Text>
              </>
            )}
          </View>
        </View>

        <View
          style={{
            display: "flex",
            marginTop: 10,
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "semibold",
                textAlign: "center",
                width: "100%",
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              Skills
            </Text>

            <Svg>
              <Rect x="0" y="0" width="1000" height="2" fill="black" />
            </Svg>
          </View>

          {skills && (
            <>
              {skills.map((skill, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 11,
                    fontWeight: "semibold",
                  }}
                >
                  {skill.skills}
                </Text>
              ))}
            </>
          )}
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default Classic1;
