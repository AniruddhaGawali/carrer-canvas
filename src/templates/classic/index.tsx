import dynamic from "next/dynamic";

export const ClassicPdfDocWithToolTip = dynamic(
  () => import("@/templates/classic/default"),
  {
    ssr: false,
  },
);
 const ClassicPdfDocWithoutToolTip = dynamic(
  () => import("@/templates/classic/withoutToolTip"),
  {
    ssr: false,
  },
);

export default ClassicPdfDocWithoutToolTip;
