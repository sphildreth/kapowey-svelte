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

<section class="hero">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
          <form action="" class="box" on:submit|preventDefault={submit}>
            <div class="field">
              <label for="" class="label">Email</label>
              <div class="control has-icons-left">
                <input type="email" bind:value={email} placeholder="e.g. bwayne@kapowey.com" class="input" required />
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope" />
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Password</label>
              <div class="control has-icons-left">
                <input type="password" bind:value={password} placeholder="*******" class="input" required />
                <span class="icon is-small is-left">
                  <i class="fa fa-lock" />
                </span>
              </div>
            </div>
            <div class="field">
              <button class="button is-success"><span class="icon mr-1"><i class="fas fa-sign-in-alt" /></span> Sign in </button>
              <button class="button is-pulled-right"> Forgot Password? </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
