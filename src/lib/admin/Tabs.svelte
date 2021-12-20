<script>
  import { page, session } from '$app/stores';
  import Users from '../../routes/admin/users.svelte';
</script>

<div class="tabs">
  <a class="tab tab-bordered" class:active={$page.path === '/admin'} href="/admin">Dashboard</a>
  {#if $session.user.isAdmin}
    <a class="tab tab-bordered" class:active={$page.path === '/admin/users'} href="/admin/users"
      >Users</a
    >
    <a
      class="tab tab-bordered"
      class:active={$page.path === '/admin/configuration'}
      href="/admin/configuration">Configuration</a
    >
    <a class="tab tab-bordered" class:active={$page.path === '/admin/system'} href="/admin/system"
      >System</a
    >
  {/if}
  <a
    class="tab tab-bordered"
    class:active={$page.path === '/admin/publishers'}
    href="/admin/publishers">Publishers</a
  >
  <a
    class="tab tab-bordered"
    class:active={$page.path === '/admin/franchises'}
    href="/admin/franchises">Franchises</a
  >
  <a class="tab tab-bordered" class:active={$page.path === '/admin/creators'} href="/admin/creators"
    >Creators</a
  >
  <a class="tab tab-bordered" class:active={$page.path === '/admin/series'} href="/admin/series"
    >Series</a
  >
  <a class="tab tab-bordered" class:active={$page.path === '/admin/issues'} href="/admin/issues"
    >Issues</a
  >
</div>
