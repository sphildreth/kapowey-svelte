<script>
  import { page, session } from '$app/stores';
  const showAdminMenu = $session.user && ($session.user.isAdmin || $session.user.isManager || $session.user.isEditor);
</script>

<a class="navbar-item" class:active={$page.path === '/publishers'} href="/publishers"> Publishers </a>
<a class="navbar-item" class:active={$page.path === '/franchises'} href="/franchises"> Franchises </a>
<a class="navbar-item" class:active={$page.path === '/creators'} href="/creators"> Creators </a>
<a class="navbar-item" class:active={$page.path === '/series'} href="/series"> Series </a>

{#if $session.user && showAdminMenu}
  <hr class="navbar-divider" />
  <a class="navbar-item" class:active={$page.path.indexOf('/admin') > -1} href="/admin"> Admin </a>
{/if}
