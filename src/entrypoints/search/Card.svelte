<script lang="ts">
  export let title = "";
  export let description = "";
  export let pronunciation = "";

  if (!title || !description || !pronunciation) throw new Error("akbdkasbd");
</script>

<div
  class="border-solid border-black dark:border-white border-2 rounded-xl p-6 custom-card"
>
  <h3 class="font-bold italic text-slate-700 dark:text-slate-200 text-lg mb-4">
    {title}
  </h3>
  <div>{@html description}</div>
</div>

<style>
  .custom-card :global(hr) {
    @apply my-2;
  }
</style>
