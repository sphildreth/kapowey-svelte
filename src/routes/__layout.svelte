<script>
  import NavBar from '$lib/NavBar.svelte';
  import '../app.scss';
</script>

<NavBar>
  <slot />
</NavBar>

<main class="my-1 mx-2">
  <slot />
</main>
