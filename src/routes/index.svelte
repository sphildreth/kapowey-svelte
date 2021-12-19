<script>
  import { session } from '$app/stores';
</script>

<svelte:head>
  <title>Dashboard • Kapowey!</title>
</svelte:head>

Dashboard content goes here.

{#if $session.user}
  User is logged in.
{/if}
