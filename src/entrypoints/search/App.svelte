<script lang="ts">
  import {
    greVocabMountain,
    toeflVocabMountain,
    searchPreferences,
    type vocabMountain,
  } from "@/utils/storage";
  import { Card } from "./card";
  import autoAnimate from "@formkit/auto-animate";
  import Fuse from "fuse.js";
  import * as Popover from "@/components/ui/popover";
  import { Cog } from "lucide-svelte";
  import { Checkbox } from "@/components/ui/checkbox";
  import * as RadioGroup from "@/components/ui/radio-group";
  import { Label } from "@/components/ui/label";

  let data_gre: vocabMountain = [];
  let data_toefl: vocabMountain = [];
  let data: vocabMountain = [];
  let search = "";
  let limit = 30;
  let useTitle = true,
    useText = true;
  let group: "GRE" | "TOEFL";
  let isInitializing = true;

  async function set_data() {
    const val_gre = await greVocabMountain.getValue();
    const val_toefl = await toeflVocabMountain.getValue();
    const prefs = await searchPreferences.getValue();

    if (val_gre === null || val_toefl === null)
      throw new Error("No data loaded!");

    data_gre = val_gre;
    data_toefl = val_toefl;
    group = prefs.wordList;
    useTitle = prefs.useTitle;
    useText = prefs.useText;
    isInitializing = false;
  }

  let fuse;

  $: fuse = new Fuse(data.flat(), {
    keys: [
      ...(useTitle ? [{ name: "title", weight: 2 }] : []),
      ...(useText ? [{ name: "text", weight: 1 }] : []),
    ],
    threshold: 0.2,
    ignoreLocation: true,
    useExtendedSearch: true,
  });

  $: data = group === "GRE" ? data_gre : data_toefl;

  $: !isInitializing &&
    searchPreferences.setValue({ wordList: group, useText, useTitle });

  let result;
  $: result = fuse.search(search, { limit });
</script>

<main class="h-full dark:bg-slate-800 dark:text-white">
  <div class="h-lvh grid place-items-center">
    <div class="grid place-items-center gap-4 w-[700px]">
      {#await set_data()}
        <p>loading...</p>
      {:then}
        <div class="mb-24"></div>
        <div class="w-full">
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
              placeholder={`Search ${group} words...`}
            />
          </div>
          <div class="flex w-full justify-between p-1">
            <a
              target="_blank"
              href="https://www.fusejs.io/examples.html#extended-search"
              class="text-blue-600 hover:text-blue-800"
            >
              Supports extended search
            </a>
            <Popover.Root>
              <Popover.Trigger
                ><span
                  class="flex items-center text-gray-600 dark:text-gray-400"
                >
                  <Cog size={18} /> Preferences
                  <div></div>
                </span></Popover.Trigger
              >
              <Popover.Content
                class="rounded-xl dark:bg-slate-700 dark:text-gray-300 dark:dark"
              >
                <RadioGroup.Root bind:value={group}>
                  <div class="flex items-center space-x-2 justify-between mr-1">
                    <Label for="GRE">GRE Words</Label>
                    <RadioGroup.Item value="GRE" id="GRE" />
                  </div>
                  <div class="flex items-center space-x-2 justify-between mr-1">
                    <Label for="TOEFL">TOEFL Words</Label>
                    <RadioGroup.Item value="TOEFL" id="TOEFL" />
                  </div>
                </RadioGroup.Root>
                <hr class="my-2 dark:border-gray-500" />
                <div class="w-[250px]">
                  <div class="flex items-center justify-between">
                    <p>Search by name</p>
                    <Checkbox bind:checked={useTitle} />
                  </div>
                  <div class="flex items-center justify-between">
                    <p>Search by the other stuff</p>
                    <Checkbox bind:checked={useText} />
                  </div>
                </div></Popover.Content
              >
            </Popover.Root>
          </div>
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
        <p>No data loaded! Please open and log into gregmat once</p>
      {/await}
    </div>
  </div>
</main>
