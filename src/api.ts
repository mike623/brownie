export * from "moviedb-promise/dist/types";
export * from "moviedb-promise/dist/request-types";
import { MovieDb } from "moviedb-promise";

const db = new MovieDb("[replaced]", "/f/api/");

export default {
  getMovies: () => db.moviePopular(),
  searchMovies: (q) => db.searchMovie({ query: q }),
  getImages: (args) => db.movieImages(args),
  getMovie: (args) => db.movieInfo(args),
  getImagePath: (path, { w }: { w: string | number } = { w: "original" }) =>
    `https://image.tmdb.org/t/p/${typeof w === "number" ? `w${w}` : w}${path}`,
};
