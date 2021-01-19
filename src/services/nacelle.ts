import NacelleClient from "@nacelle/client-js-sdk";

const settings = {
  id: import.meta.env.VITE_NACELLE_SPACE_ID as string,
  token: import.meta.env.VITE_NACELLE_GRAPHQL_TOKEN as string,
  nacelleEndpoint: "https://hailfrequency.com/v2/graphql",
  useStatic: false,
  locale: "en-us",
};

export default new NacelleClient(settings);
