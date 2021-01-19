import { useState } from "react";
import fetch from "isomorphic-unfetch";
import useSwr from "swr";

interface keyable {
  [key: string]: any;
}

interface clientParams {
  query: string;
  variables?: keyable;
}

interface dataWithLoading {
  response: keyable | undefined;
  error?: Error | undefined;
  loadingState: loadingStates;
}

enum loadingStates {
  loading = "loading",
  done = "done",
}

export const nacelleCredentials = {
  "x-nacelle-space-id": import.meta.env.VITE_NACELLE_SPACE_ID as string,
  "x-nacelle-space-token": import.meta.env.VITE_NACELLE_GRAPHQL_TOKEN as string,
};

export const hailFrequencyFetch = ({ query, variables }: clientParams) =>
  fetch("https://hailfrequency.com/v3/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...nacelleCredentials,
    },
    body: JSON.stringify({ query, variables }),
  });

export function useHailFrequency(
  query: string,
  variables?: keyable
): dataWithLoading {
  const [loadingState, setLoadingState] = useState(loadingStates.loading);

  const fetcher = (query: string, variables?: keyable) => {
    return hailFrequencyFetch({ query, variables }).then((res) => {
      setLoadingState(loadingStates.done);

      return res.json();
    });
  };

  const { data: response, error } = useSwr([query, variables], fetcher);

  return { response, error, loadingState };
}
