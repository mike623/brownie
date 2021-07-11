<script lang="ts">
  import type { MovieResult, MovieResponse } from "../api";
  export let selectedMovie: MovieResponse;
</script>

{#if selectedMovie}
  <div class="movie-detail w-full">
    {#if selectedMovie.video}
      <div class="movie-detail--video">
        <!-- <video src={selectedMovie.video} /> -->
      </div>
    {/if}
    <div class="movie-detail--desc ">
      <div class="text-4xl">{selectedMovie.title}</div>
      <br />
      <div class="text-3xl font-light">{selectedMovie.overview}</div>
    </div>
  </div>
{/if}

<style>
  .movie-detail {
    margin-top: 64px;
  }
  .movie-detail--desc--title {
    font-size: 32px;
    font-weight: 300;
  }
  .movie-detail--desc--body {
    font-size: 22px;
    line-height: 2;
    font-weight: 300;
  }
</style>
