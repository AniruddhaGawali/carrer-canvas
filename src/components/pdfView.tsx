import dynamic from "next/dynamic";

const PdfDoc = dynamic(
  () => import("@/data/resume-templetes/classic/default"),
  {
    ssr: false,
  },
);
export const PdfDocWithoutToolTip = dynamic(
  () => import("@/data/resume-templetes/classic/withoutToolTip"),
  {
    ssr: false,
  },
);

export default PdfDoc;
