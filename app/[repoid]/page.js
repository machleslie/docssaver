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
    return <div className="mx-48 my-20 text-4xl">Loading...</div>;
  }

  if (isError) {
    return <div className="mx-48 my-20 text-4xl">Error fetching data</div>;
  }

  return (
    <div className="mx-48">
      <h1 className="my-5 text-5xl capitalize">{data.reponameandowner}</h1>
      <div className="flex justify-center">
        <button className="border-2 border-black shadow m-5 rounded mx-auto justify-items-center p-2" onClick={convertToPDF}>DOWNLOAD PDF</button>
      </div>
      <div className=" " ref={markdownRef}>
        {console.log(markdownRef)}

        <div className="bg-white p-8 rounded-md mb-8" ref={markdownRef}>
          <ReactMarkdown rehypePlugins={[rehypeRaw]} components={pdfstyles}>
            {data.field}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Repopdf;
