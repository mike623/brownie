<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  import { SearchIcon, XIcon } from "svelte-feather-icons";
  export let showSeachBar = false;
  export let queryString: string = "";

  const onSearch = (q?: string) => {
    dispatch("search", {
      text: q,
    });
  };

  let timer;
  const debounce = (v) => {
    queryString = v;
    clearTimeout(timer);
    timer = setTimeout(() => {
      onSearch(v);
    }, 500);
  };
</script>

<nav class="flex items-center mb-8 h-10">
  <div>
    <button class="mr-8" on:click={() => (showSeachBar = !showSeachBar)}>
      <SearchIcon size="1.5x" />
    </button>
  </div>
  <div class="relative self-start flex-1">
    <div
      class:opacity-1={showSeachBar}
      class:opacity-0={!showSeachBar}
      class="absolute top-full -translate-y-1/4 text-3xl w-full transition-opacity"
    >
      <div class="flex items-center border-b-2 border-teal-500 py-2">
        <input
          bind:value={queryString}
          on:keyup={({ target: { value } }) => debounce(value)}
          class="bg-transparent border-none mr-3 px-2 leading-tight focus:outline-none w-full"
          type="text"
          placeholder="Search"
        />
        <button
          on:click={() => {
            if (queryString === "") {
              showSeachBar = !showSeachBar;
            } else {
              queryString = "";
              onSearch();
            }
          }}
        >
          <XIcon size="1x" />
        </button>
      </div>
    </div>
    <div
      class:opacity-0={showSeachBar}
      class:opacity-1={!showSeachBar}
      class:pointer-events-none={showSeachBar}
      class="mt-1 text-xl flex items-center justify-between max-w-xs w-full absolute"
    >
      <div class="">MOVIES</div>
      <!-- <div class="">SHOWS</div> -->
      <!-- <div class="">MUSIC</div> -->
    </div>
  </div>
</nav>

<style>
</style>
