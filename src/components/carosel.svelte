<script lang="ts">
  import Carousel from "svelte-carousel";
  import API, { type MovieResult, type MovieResponse } from "../api";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let movies: MovieResult[] = [];
  export let selectedMovie: MovieResponse | undefined;

  function selectMoive(movie, e) {
    dispatch("selectMoive", { movie, e });
  }
</script>

{#if movies.length > 0}
  <!-- class="flex -mx-5 px-5 py-10 post-list scrollbar scrollbar-thumb-gray-100 scrollbar-track-transparent scrollbar-thin" -->
  <Carousel particlesToShow={5}>
    {#each movies as movie, i}
      <div class="h-[400px] grid relative">
        <div class="absolute inset-5 bg-slate-800 overflow-hidden">
          <button
            tabindex={i}
            role="checkbox"
            on:click={(e) => selectMoive(movie, e)}
            class:opacity-100={movie.id === selectedMovie?.id}
            class:opacity-30={movie.id !== selectedMovie?.id}
            class=" cursor-pointer w-full h-full bg-no-repeat bg-center bg-cover transition-opacity aria-checked:opacity-100"
            style="background-image: url({API.getImagePath(
              movie.poster_path || movie.backdrop_path,
              { w: 185 }
            )});"
          />
        </div>
      </div>
    {/each}
  </Carousel>
{/if}

<style>
</style>
