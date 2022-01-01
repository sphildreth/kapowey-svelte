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
    errors = null;
    const response = await post(`auth/login`, { email, password });
    if (response.isSuccess) {
      const returnUrl = $page.query.get('returnUrl');
      window.location = returnUrl ? atob(returnUrl) : '/';
    }
    email = '';
    password = '';
    errors = response.messages.map((m) => m.message);
  }
</script>

<svelte:head>
  <title>Sign in • Kapowey!</title>
</svelte:head>

<section class="hero">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-6-tablet is-5-desktop is-4-widescreen">
          <form action="" class="box" on:submit|preventDefault={submit}>
            <div class="field">
              <label for="" class="label">Email</label>
              <div class="control has-icons-left">
                <input type="email" bind:value={email} placeholder="e.g. bwayne@kapowey.com" maxlength="256" class="input" required />
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope" />
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Password</label>
              <div class="control has-icons-left">
                <input type="password" bind:value={password} placeholder="*******" maxlength="256" class="input" required />
                <span class="icon is-small is-left">
                  <i class="fa fa-lock" />
                </span>
              </div>
            </div>
            <div class="field">
              <button class="button is-success"><span class="icon mr-1"><i class="fas fa-sign-in-alt" /></span> Sign in </button>
              <a href="/login/forgotpassword" class="button is-pulled-right"> Forgot Password? </a>
            </div>
          </form>
          {#if errors}
            <article class="message is-danger">
              <div class="message-header">
                <p>Errors</p>
              </div>
              <div class="message-body">
                <ListErrors {errors} />
              </div>
            </article>
          {/if}
          <article class="message is-info">
            <div class="message-header">
              <p>Sign In</p>
            </div>
            <div class="message-body">
              <p class="mb-2">Sign in using your email and password you used to Register.</p>
            </div>
          </article>
          <article class="message is-warning">
            <div class="message-header">
              <p>Email validation required</p>
            </div>
            <div class="message-body">
              <p class="mb-2">You will not be able to sign in until you have validated your email via the link sent to your email address provided at registration.</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</section>
