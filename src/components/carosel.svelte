<script lang="ts">
  import API, { MovieResult, MovieResponse } from "../api";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let movies: MovieResult[] = [];
  export let selectedMovie: MovieResponse;
  function selectMoive(movie, e) {
    dispatch("selectMoive", { movie, e });
  }
  function isSelected(movie: MovieResult) {
    return selectedMovie?.id === movie.id;
  }
</script>

{#if movies.length > 0}
  <div
    class="flex -mx-5 px-5 py-10 post-list scrollbar scrollbar-thumb-gray-100 scrollbar-track-transparent scrollbar-thin"
  >
    {#each movies as movie}
      <div
        on:click={(e) => selectMoive(movie, e)}
        class="poster-preview opacity-30 cursor-pointer"
        class:opacity-100={isSelected(movie)}
        style="background-image: url({API.getImagePath(
          movie.poster_path || movie.backdrop_path,
          { w: 185 }
        )});"
      />
    {/each}
  </div>
{/if}

<style>
  .poster-preview {
    flex-shrink: 0;
    margin: 0 16px;
    width: 150px;
    height: 225px;
    background-size: cover;
    background-position: center;
    border-radius: 4px;
    /* opacity: 0.5; */
  }
  .poster-preview.selected {
    opacity: 1;
  }
  .poster-preview:first-child {
    margin-left: 0;
  }
  .poster-preview:hover {
    opacity: 1;
    transform: scale(1.1);
    transition: all 0.2s ease;
  }
</style>
