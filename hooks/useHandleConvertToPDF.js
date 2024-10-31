"use client"
import { useRef } from "react";
import html2pdf from "html2pdf.js";

function useHandleConvertToPDF() {
  const markdownRef = useRef();
  const convertToPDF = () => {
    const element = markdownRef.current;
    console.log("wsw",element)
    if (!element) return;

    // Ensure all images are fully loaded before converting
    const images = element.querySelectorAll('img');
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
        image: { type: "jpeg", quality: 0.98 }, // Using JPEG as it works better for images in PDF
        html2canvas: {
          scale: 3, // Higher scale for better quality
          useCORS: true, // Allow cross-origin images
          allowTaint: false, // Prevent tainting of canvas by cross-origin images
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