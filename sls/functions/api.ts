import { Handler } from "@netlify/functions";

import axios, { Method } from "axios";

const client = axios.create({ baseURL: "https://api.themoviedb.org/3/" });

export const handler: Handler = async (event, context) => {
  const { data } = await client.request({
    method: <Method>event.httpMethod,
    url: event.path.replace("/f/api/", ""),
    params: { api_key: process.env.TMDB_API_KEY },
  });
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
