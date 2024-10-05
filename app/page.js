"use client";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { useState, useRef } from "react";
import rehypeRaw from "rehype-raw"; // Import the plugin
import {
  pdfstyles,
  useFetchReadme,
  // useHandleConvertToPDF,
  useSavedrepos,
} from "@/hooks/usefunctions";
import Link from "next/link";

import useHandleConvertToPDF from "@/hooks/useHandleConvertToPDF";

export default function Home() {
  const [repo, setRepo] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const { markdownRef, convertToPDF } = useHandleConvertToPDF();

  const {
    data: reposData,
    islosding: reposLoading,
    error: reposError,
  } = useQuery({
    queryKey: ["repos"],
    queryFn: useSavedrepos,
  });

  // Use useQuery to fetch the README.md file, but only if search is triggered
  const {
    data: markdown,
    isLoading: markdownloading,
    error: markdoenerror,
  } = useQuery({
    queryKey: ["readme", repo],
    queryFn: useFetchReadme,
    enabled: searchTriggered ,
  });
  const handleSearch = () => {
    setSearchTriggered(true);
  };

  return (
    <div className="mx-48">
      <div className="heading text-4xl font-bold text-center">
        Save Docs as PDF
      </div>

      <div className="search ">
        <div className="block">
          <label htmlFor="searchrepo">Enter your doc repo</label>
          <input
            type="text"
            className="flex border"
            placeholder="repoowner/reponame"
            onChange={(e) => setRepo(e.target.value)}
          />
          <button
            className="bg-slate-300 border border-black p-1 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="">
        {markdownloading ? (
          <p>Loading README...</p>
        ) : markdoenerror ? (
          <p>Error fetching README: {markdoenerror.message}</p>
        ) : markdown ? (
          <div className="flex flex-col">
            <button
              className="bg-slate-300 border border-black p-1 rounded mt-4 w-36 mx-auto mb-5 "
              onClick={convertToPDF}
            >
              Download as PDF
            </button>
            <div className="markdown" ref={markdownRef}>
              <ReactMarkdown rehypePlugins={[rehypeRaw]}
              components={pdfstyles}>
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          searchTriggered && <p>No data available</p>
        )}
      </div>

      <div className="">
        <p>Available repos</p>
        {reposLoading ? (
          <p>Loading...</p>
        ) : reposError ? (
          <p>Error: {reposError.message}</p>
        ) : reposData ? (
          reposData.map((repo) => (
            <Link href={`/${repo.id}`} key={repo.id}>
              <div key={repo.id} className="p-3 bg-slate-200 rounded mb-2">
                <p>Name: {repo.reponameandowner}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No repos found</p>
        )}
      </div>
    </div>
  );
}
