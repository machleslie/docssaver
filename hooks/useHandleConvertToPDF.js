"use client";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
function useHandleConvertToPDF() {
  const markdownRef = useRef();

  const convertToPDF = () => {
    const element = markdownRef.current;

    if (!element) return;

    const options = {
      margin: 1,
      filename: "readme.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "A4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return { markdownRef, convertToPDF };
}

export default useHandleConvertToPDF;
