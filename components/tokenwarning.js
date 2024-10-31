"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { showtokenrate } from "@/hooks/usefunctions";

const TokenrateWarning = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['tokenrate'],
    queryFn: () => showtokenrate(),
  });

  const [showWarning, setShowWarning] = useState(false);
  const remainingTokens = data?.resources?.core?.remaining || 0;
  const timeToReset =data?.resources?.core?.reset || 0

  useEffect(() => {
    if (remainingTokens < 100) {
      const timer = setTimeout(() => setShowWarning(true), 2000); 

      return () => clearTimeout(timer); 
    }
    setShowWarning(false); 
  }, [remainingTokens]);

  if (showWarning) {
    return (
      <div className="bg-red-500 text-white text-center p-2">
        Please be mindful of your requests to GitHub; the remaining tokens are {remainingTokens}.
      </div>
    );
  }

  return <div className=""></div>;
};

export default TokenrateWarning;
