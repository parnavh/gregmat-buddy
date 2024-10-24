<script lang="ts">
  import * as Tabs from "@/components/ui/tabs";
  import { Option } from "@/components/option";

  function handler(id: string) {
    console.log(id);
  }

  const options = {
    general: [
      {
        id: "banner",
        tooltip:
          "Automatically dismisses a banner after you dismiss it for the first time!",
        text: "Automatically remove banner",
      },
      {
        id: "playback-speed",
        text: "Persist video playback speed",
        tooltip: "",
      },
    ],
    gregmat: [
      {
        id: "vocab-mountain",
        text: "Disable vocab mountain keybinds",
        tooltip: "Includes gre and toefl vocab mountain",
      },
    ],
    prepswift: [
      {
        id: "prepswift-stats",
        text: "Show prepswift completion stats",
        tooltip: "Shows total time and lectures completed",
      },
    ],
  } as const;
</script>

<main class="h-lvh dark:bg-black dark:text-white">
  <div class="h-lvh grid place-items-center">
    <Tabs.Root value="general" class="w-[400px]">
      <Tabs.List class="w-[400px]">
        <Tabs.Trigger value="general" class="w-full">General</Tabs.Trigger>
        <Tabs.Trigger value="gregmat" class="w-full">GregMat</Tabs.Trigger>
        <Tabs.Trigger value="prepswift" class="w-full">PrepSwift</Tabs.Trigger>
      </Tabs.List>
      {#each Object.entries(options) as [cat, val]}
        <Tabs.Content value={cat}>
          <div
            class="flex flex-col gap-2 font-mono text-gray-800 dark:text-gray-200"
          >
            {#each val as option}
              <Option id={option.id} {handler} tooltip={option.tooltip}
                >{option.text}</Option
              >
            {/each}
          </div>
        </Tabs.Content>
      {/each}
    </Tabs.Root>
  </div>
</main>
