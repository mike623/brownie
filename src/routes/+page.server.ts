import { API } from "../api";
export const load = async ({ params, url }) => {
  let q = url.searchParams.get("q") || "";
  let movies = [] as any[];
  if (!q) {
    movies = (await API.getMovies()?.then((r) => r.results)) || [];
  } else {
    movies = (await API.searchMovies(q)?.then((r) => r.results)) || [];
  }
  // const randomMovies = movies.sort(() => Math.random() - Math.random()).slice(0, 5);
  const randomMovies = movies;
  return {
    movies: randomMovies,
  };
};

export const actions = {
  search: ({ cookies, request }) => {
    const data = request.formData();
    console.log("🚀 ~ file: +page.server.ts:12 ~ data:", data);
  },
};
