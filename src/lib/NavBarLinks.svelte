<script>
  import { page, session } from '$app/stores';
  const showAdminMenu =
    $session.user && ($session.user.isEditor || $session.user.isManager || $session.user.isEditor);
</script>

<a
  class="btn btn-ghost btn-sm rounded-btn"
  class:active={$page.path === '/publishers'}
  href="/publishers">Publishers</a
>
<a
  class="btn btn-ghost btn-sm rounded-btn"
  class:active={$page.path === '/franchises'}
  href="/franchises">Franchises</a
>
<a
  class="btn btn-ghost btn-sm rounded-btn"
  class:active={$page.path === '/creators'}
  href="/creators">Creators</a
>
<a class="btn btn-ghost btn-sm rounded-btn" class:active={$page.path === '/series'} href="/series"
  >Series</a
>
<a class="btn btn-ghost btn-sm rounded-btn" class:active={$page.path === '/issues'} href="/issues"
  >Issues</a
>
{#if $session.user && showAdminMenu}
  <a
    class="btn btn-ghost btn-sm rounded-btn"
    class:active={$page.path.indexOf('/admin') > -1}
    href="/admin">Admin</a
  >
{/if}
