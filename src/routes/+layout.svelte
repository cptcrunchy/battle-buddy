<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/components/ui/navbar/navbar.svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
  let { user } = data;
  $: ({ user } = data);
</script>

<Navbar {user} />

<main class="p-4 m-auto max-w-4xl">
  <slot />
</main>
