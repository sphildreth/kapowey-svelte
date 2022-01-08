<script>
  import { page, session } from '$app/stores';
  const showAdminMenu = $session.user && ($session.user.isAdmin || $session.user.isManager || $session.user.isEditor);
</script>

<a class="navbar-item" class:active={$page.url.pathname === '/creators'} href="/creators"><span class="icon mr-1"><i class="fas fa-pen-fancy" /></span> Creators </a>
<a class="navbar-item" class:active={$page.url.pathname === '/franchises'} href="/franchises"><span class="icon mr-1"><i class="fas fa-cubes" /></span> Franchises </a>
<a class="navbar-item" class:active={$page.url.pathname === '/publishers'} href="/publishers"><span class="icon mr-1"><i class="fas fa-building" /></span> Publishers </a>
<a class="navbar-item" class:active={$page.url.pathname === '/series'} href="/series"><span class="icon mr-1"><i class="fas fa-cube" /></span> Series </a>

{#if $session.user && showAdminMenu}
  <hr class="navbar-divider" />
  <a class="navbar-item" class:active={$page.url.pathname.indexOf('/admin') > -1} href="/admin"><span class="icon mr-1"><i class="fas fa-cogs" /></span> Admin </a>
{/if}
