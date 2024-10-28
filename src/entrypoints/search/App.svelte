<script type="ts">
  import { greVocabMountain } from "@/utils/storage";
  import { Card } from "./card";

  async function get_data() {
    const data = await greVocabMountain.getValue();

    if (data === null) throw new Error("No data loaded!");

    return data;
  }
</script>

<main class="dark:bg-black dark:text-white">
  <div class="">
    {#await get_data()}
      <p>loading...</p>
    {:then groups}
      <div class="w-[900px] grid grid-cols-2 gap-4 mx-auto custom-space">
        {#each groups as group}
          {#each group as word}
            <Card
              title={word.title}
              description={word.description}
              pronunciation={word.pronunciation}
            />
          {/each}
        {/each}
      </div>
    {:catch}
      <p>err</p>
    {/await}
  </div>
</main>
