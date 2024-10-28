<script lang="ts">
  import { greVocabMountain, type vocabMountain } from "@/utils/storage";
  import { Card } from "./card";
  import autoAnimate from "@formkit/auto-animate";
  import Fuse from "fuse.js";

  let data: vocabMountain = [];
  let search = "";

  async function get_data() {
    const val = await greVocabMountain.getValue();

    if (val === null) throw new Error("No data loaded!");

    data = val;
    return val;
  }

  let fuse;

  $: fuse = new Fuse(data.flat(), {
    keys: ["title", "text"],
    threshold: 0.2,
    ignoreLocation: true,
  });

  let result;
  $: result = fuse.search(search, { limit: 30 });
</script>

<main class="h-full dark:bg-slate-800 dark:text-white">
  <div class="h-lvh grid place-items-center">
    <div class="grid place-items-center gap-4 w-[700px]">
      {#await get_data()}
        <p>loading...</p>
      {:then}
        <div class="mb-24"></div>
        <div id="search-bar" class="w-full relative">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            bind:value={search}
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search GRE words..."
          />
        </div>

        <div class="w-full gap-4 grid" use:autoAnimate>
          {#each result as word}
            <Card
              title={word.item.title}
              description={word.item.description}
              pronunciation={word.item.pronunciation}
            />
          {/each}
        </div>
        <div class="mb-24"></div>
      {:catch}
        <p>err</p>
      {/await}
    </div>
  </div>
</main>
