export * from "moviedb-promise/dist/types";
export * from "moviedb-promise/dist/request-types";
import { MovieDb } from "moviedb-promise";
import { PUBLIC_TMDB_READ_API_KEY } from '$env/static/public';


const db = new MovieDb(PUBLIC_TMDB_READ_API_KEY);

export default {
  getMovies: () => db.moviePopular(),
  searchMovies: (q) => db.searchMovie({ query: q }),
  getImages: (args) => db.movieImages(args),
  getMovie: (args) => db.movieInfo(args),
  getImagePath: (path, { w }: { w: string | number } = { w: "original" }) =>
    `https://image.tmdb.org/t/p/${typeof w === "number" ? `w${w}` : w}${path}`,
};
