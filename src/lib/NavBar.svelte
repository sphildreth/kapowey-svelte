<script>
  import { page, session } from '$app/stores';
  import NavBarLinks from './NavBarLinks.svelte';
  import { post } from '$lib/utils.js';

  async function logout() {
    await post(`/auth/logout`);
    $session.user = null;
    window.location = '/';
  }
</script>

<nav class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
  <div class="flex-none">
    <div class="avatar">
      <div class="rounded-full w-10 h-10 m-1">
        <a href="/">
          <img src="/logo-256.png" alt="Kapowey!" />
        </a>
      </div>
    </div>
  </div>
  <div class="flex-none flex">
    <div class="dropdown">
      <button class="btn btn-square btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
        <NavBarLinks />
      </div>
    </div>
  </div>
  <div class="hidden px-2 mx-2 navbar-center flex-1 lg:flex">
    <div class="flex items-stretch">
      <NavBarLinks />
    </div>
  </div>

  <div class="flex-1 lg:flex-none">
    <div class="form-control">
      <input type="text" placeholder="Search" class="input input-ghost" />
    </div>
  </div>
  <div class="flex-none">
    <button class="btn btn-square btn-ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block w-6 h-6 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  </div>
  <div class="flex-none">
    <button class="btn btn-square btn-ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block w-6 h-6 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    </button>
  </div>
  <div class="flex-none">
    {#if $session.user}
      <div class="dropdown dropdown-left">
        <div tabindex="0" class="m-1 btn btn-square btn-ghost">
          <div class="avatar">
            <div class="rounded-full w-10 h-10 m-1">
              <img src={$session.user.avatarUrl} alt={$session.user.userName} />
            </div>
          </div>
        </div>
        <div class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 mt-14">
          <a class="btn btn-ghost btn-sm rounded-btn" href="/editprofile">Edit Profile</a>
          <a class="btn btn-ghost btn-sm rounded-btn" href={'javascript:void(0)'} on:click={logout}
            >Logout</a
          >
        </div>
      </div>
    {:else}
      <div class="rounded-full m-1">
        <a rel="prefetch" href="/login" class="nav-link" class:active={$page.path === '/login'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </a>
      </div>
    {/if}
  </div>
</nav>
