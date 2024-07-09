<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import Icon from "@iconify/svelte";
</script>

<div class="flex items-center justify-center">
  <Card.Root>
    <Card.Header>
      <Card.Title>Create an account</Card.Title>
      <Card.Description>
        Enter your email below to create your account
      </Card.Description>
    </Card.Header>
    <Card.Content class="flex flex-col gap-4">
      <form action="" method="post">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            autocomplete="email"
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            autocomplete="current-password"
          />
        </div>
        <div class="grid gap-2">
          <Button>Create account</Button>
        </div>
      </form>
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t" />
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-6">
        <Button variant="outline" href="/login/google" class="gap-2">
          <Icon icon="ri:google-fill" height="24" />
          Google
        </Button>
        <Button variant="outline" href="/login/facebook" class="gap-2">
          <Icon icon="ic:twotone-facebook" height="24" />
          Facebook
        </Button>
      </div>
    </Card.Content>
  </Card.Root>
</div>
