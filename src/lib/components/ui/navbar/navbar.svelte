<!--  -->
<script lang="ts">
  import { page } from "$app/stores";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Avatar from "$lib/components/ui/avatar";
  import { getInitialsFromName } from "$lib/utils";

  export let user;
  export let userInfo;
  const pageLinks = [
    { href: "/admin", text: "Admin Panel", signedIn: false },
    { href: "/admin/profile", text: "Profile", signedIn: true },
  ];
</script>

<header class="flex gap-8 p-4 items-top">
  <div class="flex flex-col gap-y-4 gap-x-8 md:flex-row">
    <Button variant="link" href="/" class="text-2xl font-black">
      Battle-Buddy
    </Button>
    {#if user}
      <nav class="flex items-center gap-x-2">
        {#each pageLinks as link}
          <Button variant="link" href={link.href}>{link.text}</Button>
        {/each}
      </nav>
    {/if}
  </div>
  <div class="flex gap-4 ml-auto">
    {#if user}
      <!-- TODO: User Avatar -->
      <Avatar.Root>
        <Avatar.Image src={userInfo?.picture} alt="user" />
        <Avatar.AvatarFallback
          >{getInitialsFromName(userInfo?.name)}</Avatar.AvatarFallback
        >
      </Avatar.Root>
      <Button variant="outline" href="/logout">Log out</Button>
    {/if}
    {#if !user && $page.url.pathname !== "/login"}
      <Button variant="outline" href="/login">Login</Button>
    {/if}
  </div>
</header>
