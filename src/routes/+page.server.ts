import { API, type MovieResponse } from "../api";
export const load = async ({ params, url }) => {
  let q = url.searchParams.get("q") || "";
  let id = url.searchParams.get("id") || "";
  let movies = [] as any[];
  if (!q) {
    movies = (await API.getMovies()?.then((r) => r.results)) || [];
  } else {
    movies = (await API.searchMovies(q)?.then((r) => r.results)) || [];
  }
  let movie: MovieResponse | undefined = undefined;
  if (id) {
    movie = await API.getMovie(id);
  }

  // const randomMovies = movies.sort(() => Math.random() - Math.random()).slice(0, 5);
  const randomMovies = movies;
  return {
    movies: randomMovies,
    movie,
  };
};

export const actions = {
  search: ({ request }) => {
    const data = request.formData();
    console.log("🚀 ~ file: +page.server.ts:12 ~ data:", data);
  },
};
