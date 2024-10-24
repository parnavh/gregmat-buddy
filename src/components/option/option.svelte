<script lang="ts">
  import { Label } from "@/components/ui/label";
  import { Switch } from "@/components/ui/switch";
  import * as Tooltip from "@/components/ui/tooltip";
  import { CircleHelp } from "lucide-svelte";

  export let id: string;
  export let handler: (id: string, checked: boolean) => void;
  export let checked: boolean = false;
  export let tooltip: string = "";

  let isInitialLoad = true;

  $: if (!isInitialLoad) {
    handler(id, checked);
  } else {
    isInitialLoad = false;
  }
</script>

<div class="px-2 flex justify-between">
  <Label for={id} class="my-auto"><slot /></Label>
  <div class="flex gap-2 items-center">
    {#if tooltip !== ""}
      <Tooltip.Root>
        <Tooltip.Trigger>
          <CircleHelp size={20} class="stroke-gray-400 dark:stroke-zinc-400" />
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>{tooltip}</p>
        </Tooltip.Content>
      </Tooltip.Root>
    {/if}
    <Switch {id} bind:checked />
  </div>
</div>
