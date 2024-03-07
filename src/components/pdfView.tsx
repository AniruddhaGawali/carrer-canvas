import dynamic from "next/dynamic";

const PdfDoc = dynamic(() => import("@/data/resume-templetes/default"), {
  ssr: false,
});

export default PdfDoc;
