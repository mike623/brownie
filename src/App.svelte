<script lang="ts">
  import Tailwind from "./components/Tailwind.svelte";
  import Nav from "./components/nav.svelte";
  import Carosel from "./components/carosel.svelte";
  import MovieDetail from "./components/movie-detail.svelte";

  import API, { MovieResult, MovieResponse } from "./api";
  import { onMount } from "svelte";

  export let image_url: string;
  export let movies: MovieResult[] = [];
  export let selectedMovie: MovieResponse;
  let defaultMovie: MovieResult[] = [];

  onMount(async () => {
    const { results } = await API.getMovies();
    selectMoive(results[0]);
    movies = results;
    defaultMovie = results;
  });

  const selectMoive = async (movie: MovieResult, e?) => {
    if (!movie) return;
    image_url = API.getImagePath(movie.poster_path || movie.backdrop_path);
    selectedMovie = await API.getMovie(movie.id);
    e?.target?.scrollIntoView({
      block: "center",
      behavior: "smooth",
      inline: "center",
    });
  };
  const handleSearch = async (event) => {
    selectedMovie = undefined;
    if (!event?.detail.text) return (movies = defaultMovie);
    const { results } = await API.searchMovies(event?.detail?.text);
    selectMoive(results[0]);
    movies = results;
  };
</script>

{#if image_url}
  <div id="background" class="" style="background-image: url({image_url});" />
{/if}

<main
  class="h-full overflow-y-auto backdrop-filter backdrop-blur-lg bg-black bg-opacity-50"
>
  <Nav on:search={handleSearch} />
  <Carosel
    {movies}
    {selectedMovie}
    on:selectMoive={({ detail }) => selectMoive(detail.movie, detail.e)}
  />
  <MovieDetail {selectedMovie} />

  <div class="mt-8 w-48">
    <div class="border-t border-white w-20 mb-6" />
    <img src={"assets/tmdb.svg"} alt="" />
  </div>
</main>

<style>
  #background {
    opacity: 0.5;
    background-size: cover;
    background-position: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  main {
    padding: 70px;
    position: relative;
  }
</style>
