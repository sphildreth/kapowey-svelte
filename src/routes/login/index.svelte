<script context="module">
  export async function load({ session }) {
    if (session.user) {
      return {
        status: 302,
        redirect: '/',
      };
    }
    return {};
  }
</script>

<script>
  import { post } from '$lib/utils.js';
  import { page, session } from '$app/stores';
  import ListErrors from '$lib/ListErrors.svelte';

  let email = '';
  let password = '';
  let errors = null;

  async function submit(event) {
    const response = await post(`auth/login`, { email, password });

    // TODO handle network errors
    errors = response.errors;

    if (response.isSuccess) {
      const returnUrl = $page.query.get('returnUrl');
      window.location = returnUrl ? atob(returnUrl) : '/';
    }
  }
</script>

<svelte:head>
  <title>Sign in • Kapowey!</title>
</svelte:head>

<div class="auth-page">
  <div class="w-full flex mx-auto mt-10 justify-center items-center">
    <ListErrors {errors} />
    <form class="w-full md:w-1/3 bg-neutral rounded-lg" on:submit|preventDefault={submit}>
      <div class="px-12 pb-10 mt-6">
        <div class="w-full mb-2">
          <div class="flex items-center">
            <i class="ml-3 fill-current text-gray-400 text-xs z-10 fas fa-user" />
            <input
              type="email"
              bind:value={email}
              required
              placeholder="Email"
              class="-mx-6 w-full border rounded px-3 py-2 text-gray-700 focus:outline-none"
            />
          </div>
        </div>
        <div class="w-full mb-2">
          <div class="flex items-center">
            <i class="ml-3 fill-current text-gray-400 text-xs z-10 fas fa-lock" />
            <input
              type="password"
              required
              bind:value={password}
              placeholder="Password"
              class="-mx-6 w-full border rounded px-3 py-2 text-gray-700 focus:outline-none"
            />
          </div>
        </div>
        <a href="/register" class="text-xs text-gray-500 float-left mb-4">Need an account?</a>
        <a href="#" class="text-xs text-gray-500 float-right mb-4">Forgot Password?</a>
        <button type="submit" class="w-full py-2 rounded-full btn btn-primary focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
          Sign In</button
        >
      </div>
    </form>
  </div>
</div>
