<script>
  import { page, session } from '$app/stores';
</script>

<div class="tabs">
  <a class="tab tab-bordered" class:active={$page.url.pathname === '/admin'} href="/admin">Dashboard</a>
  {#if $session.user && $session.user.isAdmin}
    <a class="tab tab-bordered" class:active={$page.url.pathname === '/admin/users'} href="/admin/users">Users</a>
    <a class="tab tab-bordered" class:active={$page.url.pathname === '/admin/configuration'} href="/admin/configuration">Configuration</a>
    <a class="tab tab-bordered" class:active={$page.url.pathname === '/admin/system'} href="/admin/system">System</a>
  {/if}
  <a class="tab tab-bordered" class:active={$page.url.pathname === '/admin/publishers'} href="/admin/publishers">Publishers</a>
  <a class="tab tab-bordered" class:active={$page.url.pathname === '/admin/franchises'} href="/admin/franchises">Franchises</a>
  <a class="tab tab-bordered" class:active={$page.url.pathname === '/admin/creators'} href="/admin/creators">Creators</a>
  <a class="tab tab-bordered" class:active={$page.url.pathname === '/admin/series'} href="/admin/series">Series</a>
  <a class="tab tab-bordered" class:active={$page.url.pathname === '/admin/issues'} href="/admin/issues">Issues</a>
</div>
