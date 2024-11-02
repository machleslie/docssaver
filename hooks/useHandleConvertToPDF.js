"use client";
import { useRef } from "react";

function useHandleConvertToPDF() {
  const markdownRef = useRef();

  const convertToPDF = async () => {
    const element = markdownRef.current;
    if (!element) return;

    // Dynamically import html2pdf.js to ensure it runs on the client side
    const html2pdf = (await import("html2pdf.js")).default;

    // Ensure all images are fully loaded before converting
    const images = element.querySelectorAll("img");
    const loadImages = Array.from(images).map((img) => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = resolve;
          img.onerror = resolve;
        }
      });
    });

    Promise.all(loadImages).then(() => {
      // Use html2pdf to convert the HTML element to a PDF
      const options = {
        margin: 1,
        filename: "readme.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 3,
          useCORS: true,
          allowTaint: false,
          logging: true,
          letterRendering: true,
        },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf().set(options).from(element).save();
    });
  };

  return { markdownRef, convertToPDF };
}

export default useHandleConvertToPDF;