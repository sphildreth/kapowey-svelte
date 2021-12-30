<script>
  import { page, session } from '$app/stores';
  import NavBarLinks from './NavBarLinks.svelte';
  import { post } from '$lib/utils.js';

  async function logout() {
    await post(`/auth/logout`);
    $session.user = null;
    window.location = '/';
  }

  function navMenuToggleClick() {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach((el) => {
        el.addEventListener('click', () => {
          const target = el.dataset.target;
          const _target = document.getElementById(target);
          el.classList.toggle('is-active');
          _target.classList.toggle('is-active');
        });
      });
    }
  }
  let notifications = 0;
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a href="/">
      <img src="/android-icon-48x48.png" height="48" width="48" alt="Kapowey!" />
    </a>

    <a role="button" on:click={navMenuToggleClick} class="navbar-burger" href={'javascript:void(0)'} aria-label="menu" aria-expanded="false" data-target="navMenu">
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </div>

  <div id="navMenu" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" href="/" class:active={$page.path === '/'}> Dashboard </a>
      <a class="navbar-item" class:active={$page.path === '/issues'} href="/issues"> Issues </a>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" href={'javascript:void(0)'}> More </a>
        <div class="navbar-dropdown">
          <NavBarLinks />
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          {#if $session.user}
            <div class="navbar-item has-control has-control-without-left-space">
              <p class="control has-icons-left">
                <input placeholder="Search" class="input is-primary" />
                <span class="icon is-small is-left">
                  <i class="fas fa-search" />
                </span>
              </p>
            </div>
            <a class="navbar-item nav-tag" href={'javascript:void(0)'}>
              <span class="icon is-medium">
                <i class="fas fa-bell fa-lg" />
              </span>
              {#if notifications}
                <span class="tag is-danger counter">2</span>
              {/if}
            </a>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link" href={'javascript:void(0)'}>
                <figure class="image is-32x32 mr-2">
                  <img src={$session.user.avatarUrl} alt={$session.user.userName} />
                </figure>
                {$session.user.userName}
              </a>
              <div class="navbar-dropdown">
                <a class="navbar-item" href="/profile/edit"><span class="icon mr-1"><i class="fas fa-id-card" /></span> Edit Profile </a>
                <hr class="navbar-divider" />
                <a class="navbar-item is-warning" href={'javascript:void(0)'} on:click={logout}><span class="icon mr-1"><i class="fas fa-sign-out-alt" /></span> Sign out </a>
              </div>
            </div>
          {:else}
            <a class="button is-light" href="/register" class:active={$page.path === '/register'}>
              <span class="icon mr-1"><i class="fas fa-user-plus" /></span>
              Register
            </a>
            <a class="button is-primary" href="/login" class:active={$page.path === '/login'}><span class="icon mr-1"><i class="fas fa-sign-in-alt" /></span> Sign in </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
</nav>

<style>
  .nav-tag .icon {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
  }
  .nav-tag .counter {
    border-radius: 50%;
    position: absolute;
    top: 4px;
    left: 31px;
  }
</style>
