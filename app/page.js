"use client";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { useState, useRef ,useEffect } from "react";
import rehypeRaw from "rehype-raw"; // Import the plugin
import {
  pdfstyles,
  useFetchReadme,
  // useHandleConvertToPDF,
  useSavedrepos,
  showtokenrate
} from "@/hooks/usefunctions";
import Link from "next/link";

import useHandleConvertToPDF from "@/hooks/useHandleConvertToPDF";



export default function Home() {
  const [repo, setRepo] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const { markdownRef, convertToPDF } = useHandleConvertToPDF();
  const [storedHtml, setStoredHtml] = useState("");


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
    enabled: searchTriggered,
  });
  const handleSearch = () => {
    setSearchTriggered(true);
  };
  
  return (
    <div className="mx-48">
      <div className="heading text-center text-4xl font-bold">
        Save Docs as PDF
      </div>
   
      <div className="search">
        <div className="block text-center">
          <label htmlFor="searchrepo " className={`m-2 text-2xl GeistMono`}>
            Enter your doc repo
          </label>
          <input
            type="text"
            className="mx-auto my-5 flex w-96 rounded-3xl border border-black bg-transparent p-1.5 text-center"
            placeholder="repoowner/reponame"
            onChange={(e) => setRepo(e.target.value)}
          />
          <button
            className="border-2 border-black shadow  rounded  justify-items-center p-2"
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
              className="border-2 border-black shadow m-5 rounded mx-auto justify-items-center p-2 "
              onClick={convertToPDF}
            >
              Download as PDF
            </button>
            <div className="markdown mb-6 rounded-3xl bg-white p-10" ref={markdownRef}>
              <ReactMarkdown rehypePlugins={[rehypeRaw]} components={pdfstyles}>
                {markdown}
              </ReactMarkdown>
              <pre>{storedHtml}</pre>
            </div>
          </div>
        ) : (
          searchTriggered && <p>No data available</p>
        )}
      </div>

      <div className="">
        <h1 className="my-4 text-center text-3xl">Available repos</h1>
        {reposLoading ? (
          <p>Loading...</p>
        ) : reposError ? (
          <p>Error: {reposError.message}</p>
        ) : reposData ? (
          reposData.map((repo) => (
            <Link href={`/${repo.id}`} key={repo.id}>
              <div
                key={repo.id}
                className="mb-5 rounded bg-transparent p-3 shadow-sm hover:shadow-md"
              >
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
