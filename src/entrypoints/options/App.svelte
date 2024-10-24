<script lang="ts">
  import * as Tabs from "@/components/ui/tabs";
  import { Option } from "@/components/option";
  import { config as config_store } from "@/utils/storage";

  let local_config: { [key: string]: boolean } = {};

  function handler(id: string, checked: boolean) {
    local_config[id] = checked;
    // @ts-ignore 2345
    config_store.setValue(local_config);
  }

  async function get_options() {
    const config = await config_store.getValue();
    local_config = config;
    const options = {
      general: [
        {
          id: "banner",
          tooltip:
            "Automatically dismisses a banner after you dismiss it for the first time!",
          text: "Automatically remove banner",
          checked: config.banner,
        },
        {
          id: "playbackRate",
          text: "Persist video playback speed",
          tooltip: "",
          checked: config.playbackRate,
        },
      ],
      gregmat: [
        {
          id: "vocabMountain",
          text: "Enable vocab mountain keybinds",
          tooltip: "Includes gre and toefl vocab mountain",
          checked: config.vocabMountain,
        },
      ],
      prepswift: [
        {
          id: "prepswiftStats",
          text: "Show prepswift completion stats",
          tooltip: "Shows total time and lectures completed",
          checked: config.prepswiftStats,
        },
      ],
    } as const;

    return options;
  }
</script>

<main class="h-lvh dark:bg-black dark:text-white">
  <div class="h-lvh grid place-items-center">
    <Tabs.Root value="general" class="w-[400px]">
      <Tabs.List class="w-[400px]">
        <Tabs.Trigger value="general" class="w-full">General</Tabs.Trigger>
        <Tabs.Trigger value="gregmat" class="w-full">GregMat</Tabs.Trigger>
        <Tabs.Trigger value="prepswift" class="w-full">PrepSwift</Tabs.Trigger>
      </Tabs.List>
      {#await get_options() then options}
        {#each Object.entries(options) as [cat, val]}
          <Tabs.Content value={cat}>
            <div
              class="flex flex-col gap-2 font-mono text-gray-800 dark:text-gray-200"
            >
              {#each val as option}
                <Option
                  id={option.id}
                  {handler}
                  tooltip={option.tooltip}
                  checked={option.checked}
                >
                  {option.text}
                </Option>
              {/each}
            </div>
          </Tabs.Content>
        {/each}
      {/await}
    </Tabs.Root>
  </div>
</main>
