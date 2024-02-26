import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Rect,
  Svg,
} from "@react-pdf/renderer";

const themeColor = "#00ab44";

const styles = StyleSheet.create({
  document: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
  page: {
    width: "100%",
    height: "100%",
    color: "#000",
  },

  introView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
  },
});

type Classic1Prop = {
  personalInfo: PersonalInfo;
};

// Create Document Component
const Classic1 = ({ personalInfo }: Classic1Prop) => (
  <Document style={styles.document}>
    <Page size="A4" style={styles.page}>
      <View>
        <Svg
          width="100%"
          height={8}
          style={{
            marginTop: 30,
          }}
        >
          <Rect
            x={0}
            y={0}
            width="100%"
            height={8}
            strokeWidth={1}
            stroke={themeColor}
            fill={themeColor}
          />
        </Svg>
      </View>

      <View style={styles.introView}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "normal",
          }}
        >
          {personalInfo.name}
        </Text>

        <Text
          style={{
            fontSize: 25,
            fontWeight: "medium",
            color: themeColor,
          }}
        >
          {personalInfo.jobTitle}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 15,
            fontWeight: "light",
          }}
        >
          <Text>{personalInfo.address1}</Text>
          <Text>{personalInfo.address2}</Text>
          <Text>{personalInfo.phone}</Text>
          <Text>{personalInfo.email}</Text>
          <Text>{personalInfo.website}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default Classic1;
