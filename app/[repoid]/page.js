"use client";
import { useGetrepo } from "@/hooks/usefunctions";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { pdfstyles } from "@/hooks/usefunctions";
import useHandleConvertToPDF from "@/hooks/useHandleConvertToPDF";
const Repopdf = ({ params }) => {
  const repoid = decodeURIComponent(params.repoid);

  const { markdownRef, convertToPDF } = useHandleConvertToPDF();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["repo", repoid],
    queryFn: useGetrepo,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="mx-48">
      <h1 className="my-5 text-5xl capitalize">{data.reponameandowner}</h1>
        <div className="">
          <button onClick={convertToPDF}>DOWNLOAD PDF</button>
        </div>
        <div className="" ref={markdownRef}>
      <ReactMarkdown 
        rehypePlugins={[rehypeRaw]} // For rendering raw HTML elements inside the Markdown
        components={pdfstyles}
      >
        {data.field}
      </ReactMarkdown>
      </div>
    </div>
  );
};

export default Repopdf;
