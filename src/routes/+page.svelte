<script lang="ts">
  import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
  import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
  import SignInButton from 'clerk-sveltekit/client/SignInButton.svelte';
  import SignUpButton from 'clerk-sveltekit/client/SignUpButton.svelte';
	import Box from '../internal/Box.svelte'
</script>

<p><b>clerk-sveltekit</b> is a JavaScript package that integrates <a href="https://clerk.com/">Clerk</a> authentication into a <a href="https://kit.svelte.dev/">SvelteKit</a> site. This demo site is included in <a href="https://github.com/markjaquith/clerk-sveltekit">the repo</a> as an example and for end-to-end testing the package.</p>

<SignedIn let:user>
	<div class="p-4">
		<Box>
			<p>Welcome, {user?.fullName ?? 'buddy'}!</p>
			<p>Since you are signed in, you should be able to access the <a href="/admin">admin panel</a>.</p>
		</Box>
	</div>
</SignedIn>
<SignedOut>
	<Box>
		<p>You are not signed in to this demo app.</p>
		<p>
			You should not be able to go to the <a href="/admin">admin panel</a> without signing in, because
			it is defined as a protected route in <code>hooks.server.ts</code> — go ahead and try!
		</p>
		<ul class="flex flex-row flex-wrap justify-center gap-2 my-4 whitespace-nowrap">
			<li><SignInButton class="p-2 rounded bg-slate-300">Sign in</SignInButton></li>
			<li><SignUpButton class="p-2 rounded bg-slate-300">Sign up</SignUpButton></li>
			</ul>
		<ul class="flex flex-row flex-wrap justify-center gap-2 whitespace-nowrap">
			<li><SignInButton class="p-2 rounded bg-slate-300" mode="modal">Sign in (modal)</SignInButton></li>
			<li><SignUpButton class="p-2 rounded bg-slate-300" mode="modal">Sign up (modal)</SignUpButton></li>
		</ul>
	</Box>
</SignedOut>
