export * from "moviedb-promise/dist/types";
export * from "moviedb-promise/dist/request-types";
import { MovieDb } from "moviedb-promise";

const db = new MovieDb("[replaced]", '/f/api/');

export default {
  getMovies: () => db.moviePopular(),
  searchMovies: (q) => db.searchMovie({ query: q }),
  getImages: (args) => db.movieImages(args),
  getMovie: (args) => db.movieInfo(args),
  getImagePath: (path, {} = {}) =>
    `https://image.tmdb.org/t/p/original/${path}`,
};
