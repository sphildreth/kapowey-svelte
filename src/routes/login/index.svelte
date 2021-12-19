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
  import ListErrors from '$lib/ListErrors.svelte';

  let email = '';
  let password = '';
  let errors = null;

  async function submit(event) {
    const response = await post(`auth/login`, { email, password });

    // TODO handle network errors
    errors = response.errors;

    if (response.isSuccess) {
      window.location = '/';
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
        <button
          type="submit"
          class="w-full py-2 rounded-full bg-success text-gray-100  focus:outline-none"
          >Button</button
        >
      </div>
    </form>
  </div>
</div>
