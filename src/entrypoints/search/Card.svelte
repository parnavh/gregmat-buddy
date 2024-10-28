<script lang="ts">
  export let title = "";
  export let description = "";
  export let pronunciation = "";

  if (!title || !description || !pronunciation) throw new Error("akbdkasbd");
</script>

<div
  class="rounded border-solid border-black dark:border-white border-2 p-2 space"
>
  <h3 class="font-bold text-lg mb-4">{title}</h3>
  <div>{@html description}</div>
</div>

<style>
  .space :global(hr) {
    @apply my-2;
  }
</style>
