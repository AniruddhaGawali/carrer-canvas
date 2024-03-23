import ReactPDF from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import React from "react";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

type Props = {
  doc: React.ReactElement<
    ReactPDF.DocumentProps,
    string | React.JSXElementConstructor<any>
  >;
  children: React.ReactNode;
  name: string;
};

function DownloadPDF({ doc, children, name }: Props) {
  return (
    <PDFDownloadLink document={doc} fileName={`${name}.pdf`}>
      {children}
    </PDFDownloadLink>
  );
}

export default DownloadPDF;
