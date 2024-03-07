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
    fontSize: 12,
    fontFamily: "Jost",
  },

  introView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
  },
});

type Classic1Prop = {
  personalInfo?: PersonalInfo;
  skills?: Skill[];
};

// Create Document Component
const Classic1 = ({ personalInfo, skills }: Classic1Prop) => (
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
              textAlign: "center",
            }}
          >
            {personalInfo ? personalInfo.name : ""}
          </Text>

          <Text
            style={{
              fontSize: 15,
              fontWeight: "medium",
            }}
          >
            {personalInfo ? personalInfo.jobTitle : ""}
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {personalInfo && (
              <>
                <Text>{personalInfo.address1}</Text>
                <Text>{personalInfo.address2}</Text>
                <Text>{personalInfo.phone}</Text>
                <Text>{personalInfo.email}</Text>
                <Text>{personalInfo.website}</Text>
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
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "semibold",
            }}
          >
            Skills :
          </Text>

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
