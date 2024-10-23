<script>
import * as Tabs from "@/components/ui/tabs";
import { Option } from "@/components/option";

function handler(id) {
  console.log(id);
}
</script>

<main class="h-lvh dark:bg-black dark:text-white">
  <div class="h-lvh grid place-items-center">
    <Tabs.Root value="general" class="w-[300px]">
      <Tabs.List class="w-[300px]">
        <Tabs.Trigger value="general" class="w-full">General</Tabs.Trigger>
        <Tabs.Trigger value="gregmat" class="w-full">GregMat</Tabs.Trigger>
        <Tabs.Trigger value="prepswift" class="w-full">PrepSwift</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="general">
        <div class="flex flex-col gap-2">
          <Option id="hello" {handler}>hello</Option>
        </div>
      </Tabs.Content>
      <Tabs.Content value="gregmat">greg</Tabs.Content>
      <Tabs.Content value="prepswift">prep</Tabs.Content>
    </Tabs.Root>
  </div>
</main>
