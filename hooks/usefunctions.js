"use client";
import { Octokit } from "@octokit/rest";
import { useRef } from "react";
import PocketBase from "pocketbase";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; // Optional: Syntax highlighting

// Initialize Octokit with GitHub token
const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
});

const pb = new PocketBase("http://127.0.0.1:8090");

const useFetchReadme = async ({ queryKey }) => {
  const [_, repo] = queryKey;
  const [owner, repoName] = repo.split("/");

  const { data } = await octokit.repos.getReadme({
    owner,
    repo: repoName,
    mediaType: {
      format: "raw",
    },
  });

  const reademefile = {
    reponameandowner: repo,
    field: data,
  };

  try {
    await pb.collection("document").create(reademefile);
  } catch (e) {
    console.log(e);
  }

  return data;
};

const useHandleConvertToPDF = async () => {
  const markdownRef = useRef();

  const element = markdownRef.current;

  if (!element) return;

  // Use html2pdf to convert the HTML element to a PDF
  const options = {
    margin: 1,
    filename: "readme.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(options).from(element).save();
};

const useSavedrepos = async () => {
  const records = await pb.collection("document").getFullList({
    sort: "-created",
  });
  return records;
};

const useGetrepo = async ({ queryKey }) => {
  const [_, id] = queryKey;
  const record = await pb.collection("document").getOne(id);
  return record;
};

const useSearchrepo = async (repo) => {
  const record = await pb
    .collection("doccument")
    .getFirstListItem(`reponameandowner=${repo}`);
  return record;
};

const pdfstyles = {
  h1: ({ children }) => (
    <>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "2rem",
          marginTop: "2rem",
        }}
      >
        {children}
      </h1>
      <hr style={{ border: "1px solid #ddd", margin: "1rem 0" }} />
    </>
  ),
  h2: ({ children }) => (
    <>
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "0.5rem",
          marginTop: "1rem",
        }}
      >
        {children}
      </h2>
      <hr style={{ border: "1px solid #ddd", margin: "1rem 0" }} />
    </>
  ),
  h3: ({ children }) => (
    <h3
      style={{
        fontSize: "1.75rem",
        fontWeight: "bold",
        marginBottom: "0.25rem",
      }}
    >
      {children}
    </h3>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "blue", textDecoration: "underline" }}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul
      style={{
        marginLeft: "1.5rem",
        listStyleType: "disc",
        marginBottom: "1rem",
      }}
    >
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol
      style={{
        marginLeft: "1.5rem",
        listStyleType: "decimal",
        marginBottom: "1rem",
      }}
    >
      {children}
    </ol>
  ),
  li: ({ children }) => <li style={{ marginBottom: "0.5rem" }}>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote
      style={{
        borderLeft: "4px solid #ddd",
        paddingLeft: "1rem",
        color: "#666",
        fontStyle: "italic",
        margin: "1rem 0",
      }}
    >
      {children}
    </blockquote>
  ),
  code: ({ inline, className, children }) => {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter language={match[1]}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code
        style={{
          background: "#f4f4f4",
          padding: "2px 4px",
          borderRadius: "4px",
        }}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre
      style={{
        background: "#f4f4f4",
        padding: "1rem",
        borderRadius: "5px",
        overflowX: "auto",
      }}
    >
      {children}
    </pre>
  ),
  hr: () => <hr style={{ border: "2px solid #ddd", margin: "2rem 0" }} />,
};

export {
  useFetchReadme,
  // useHandleConvertToPDF,
  useSavedrepos,
  useGetrepo,
  pdfstyles,
};
