<script lang="ts">
  import logo from "$lib/assets/brownie.png";
  import tmdbSvg from "$lib/assets/tmdb.svg";
  import Nav from "../components/nav.svelte";
  import Carosel from "../components/carosel.svelte";
  import MovieDetail from "../components/movie-detail.svelte";

  import API, { type MovieResult, type MovieResponse } from "../api";
  console.log("🚀 ~ file: App.svelte:24 ~ API:", API);
  import { onMount } from "svelte";

  let image_url: string;
  let movies: MovieResult[] = [];
  let selectedMovie: MovieResponse | undefined;
  let defaultMovie: MovieResult[] = [];

  onMount(async () => {
    const { results } = await API.getMovies();
    if (!results) return;
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
    if (!selectedMovie) return;
    selectedMovie = undefined;
    if (!event?.detail.text) return (movies = defaultMovie);
    const { results } = await API.searchMovies(event?.detail?.text);
    if (!results) return;
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
  <img class="m-5 w-10 h-10" src={logo} alt="" />
  <section class="px-16 mt-16 mb-16">
    <Nav on:search={handleSearch} />
    <Carosel
      {movies}
      {selectedMovie}
      on:selectMoive={({ detail }) => selectMoive(detail.movie, detail.e)}
    />
    {#if selectedMovie}
      <MovieDetail {selectedMovie} />
    {/if}

    <div class="mt-36">
      <div class="border-t border-white w-20 mb-6" />
      <div class="w-48">
        <img src={tmdbSvg} alt="" />
      </div>
      <br />
      <div class="text-xs">
        Icons made by
        <a href="https://www.freepik.com" title="Freepik">Freepik</a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a
        >
      </div>
    </div>
  </section>
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
    position: relative;
  }
</style>
