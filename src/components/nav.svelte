<script lang="ts">
  import { SearchIcon, XIcon } from "svelte-feather-icons";

  let form;
  let timeoutRef;
  const qs = new URLSearchParams(location.search);
  export const initValue = qs.get("q");
  export let showSearchBar = !!initValue;
</script>

<nav class="flex items-center mb-8 h-10">
  <div>
    <button class="mr-8" on:click={() => (showSearchBar = !showSearchBar)}>
      <SearchIcon size="1.5x" />
    </button>
  </div>
  <div class="relative self-start flex-1">
    <div
      class:opacity-1={showSearchBar}
      class:opacity-0={!showSearchBar}
      class="absolute top-full -translate-y-1/4 text-3xl w-full transition-opacity"
    >
      <form bind:this={form} action="?/search" data-sveltekit-keepfocus>
        <div class="flex items-center border-b-2 border-teal-500 py-2">
          <input
            name="q"
            value={initValue}
            class="bg-transparent border-none mr-3 px-2 leading-tight focus:outline-none w-full"
            type="text"
            placeholder="Search"
            on:input={() => {
              clearTimeout(timeoutRef);
              timeoutRef = setTimeout(() => {
                form.dispatchEvent(new Event("submit", { bubbles: true }));
              }, 500);
            }}
          />
          <button>
            <XIcon size="1x" />
          </button>
        </div>
      </form>
    </div>
    <div
      class:opacity-0={showSearchBar}
      class:opacity-1={!showSearchBar}
      class:pointer-events-none={showSearchBar}
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
