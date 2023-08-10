import { useState } from "react";

import { useToast } from "@/lib/hooks/use-toast";

import { checkConnection } from "../gitcoin-passport-client";
import { getScore } from "../hooks/use-get-score";
import { ScoreGateProps } from "../utils/types";

export function ScoreGate({ apiKey, scorerId, setScore }: ScoreGateProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast, dismiss } = useToast();

  const handleToast = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    toast({
      title,
      description,
    });

    setTimeout(() => {
      dismiss();
    }, 4200);
  };

  const handleGetScore = async () => {
    setIsLoading(true);
    setScore(null);
    try {
      const address = await checkConnection();
      if (address) {
        const score = await getScore(address, scorerId, apiKey);
        if (score && typeof score === "number") {
          setScore(score);
        }
      }
    } catch (e) {
      handleToast({
        title: "An Error Occurred",
        description: "An error occurred while connecting to Gitcoin.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="m-4">
      <button
        className="btn btn-emerald"
        disabled={isLoading}
        onClick={handleGetScore}
      >
        {isLoading ? "Getting Score..." : "Get Score"}
      </button>
    </div>
  );
}
