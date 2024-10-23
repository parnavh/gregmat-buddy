<script lang="ts">
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export let id: string;
export let handler: () => void;
</script>

<div class="px-2 flex justify-between">
  <p><slot /></p>
  <Switch on:click={() => handler(id)} />
</div>
