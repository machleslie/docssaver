"use client";
import { useRef } from "react";
import { jsPDF } from "jspdf";
import { useGetrepo } from "@/hooks/usefunctions";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { pdfstyles } from "@/hooks/usefunctions";


function useHandleConvertToPDF() {
  const markdownRef = useRef();

  const convertToPDF = async () => {
    const element = markdownRef.current;

    if (!element) return;

    // Create a new jsPDF instance
    const pdf = new jsPDF({
      unit: "pt", // Use pt units to better handle sizing
      format: "letter", // Use 'letter' size format for better alignment
      orientation: "portrait", // Portrait mode
    });

    // Use html() to convert the HTML content to PDF
    await pdf.html(element, {
      callback: (doc) => {
        doc.save("readme.pdf"); // Save the PDF once rendering is complete
      },
      x: 10, // Horizontal margin
      y: 10, // Vertical margin
      width: 600, // Width of the content area
      windowWidth: element.scrollWidth, // Match the content's width to the element
    });
  };

  return { markdownRef, convertToPDF };
}

export default function Home() {
  const { markdownRef, convertToPDF } = useHandleConvertToPDF();

  const repoid = "aillx1s5z2r05eh";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["repo", repoid],
    queryFn: useGetrepo,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="mx-48">
      <div className="heading text-center text-4xl font-bold">
        Save Docs as PDF
      </div>

      <button onClick={convertToPDF} className="mb-4 mt-4">
        Download as PDF
      </button>

      <div className="pdf-content" ref={markdownRef} style={{
    color: 'black', 
    fontSize: '12pt', 
    fontFamily: 'Arial, sans-serif',
    padding: '10px',
    lineHeight: '1.5',
    backgroundColor: 'white', // Set background to white for the PDF
}}>
  <ReactMarkdown rehypePlugins={[rehypeRaw]} components={pdfstyles}>
    {data.field}
  </ReactMarkdown>
</div>

    </div>
  );
}
