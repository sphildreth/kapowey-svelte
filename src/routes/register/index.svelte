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
  import { get } from '$lib/api.js';
  import { page, session } from '$app/stores';
  import ListErrors from '$lib/ListErrors.svelte';
  import debounce from 'lodash/debounce';
  import { passwordStrength } from 'check-password-strength';

  let email = '';
  let password = '';
  let errors = null;

  let uniqueEmailAddress = false;
  let checkingEmailAddress = false;
  let pwStrength = 0;

  let registerButtonDiabled = true;

  async function submit(event) {
    const response = await post(`auth/register`, { email, password });
    if (response.isSuccess) {
      const returnUrl = $page.url.searchParams.get('returnUrl');
      window.location = returnUrl ? atob(returnUrl) : '/';
    }
    errors = response.messages.map((m) => m.message);
  }

  const checkIfEmailExists = async () => {
    const response = await get(`user/byemail/${encodeURIComponent(btoa(email))}`, {});
    if (!response.isSuccess) {
      return false;
    }
    return !response.totalNumberOfRecords;
  };

  const checkForExistingEmail = debounce(async (e) => {
    checkingEmailAddress = true;
    errors = null;
    if (!email) {
      checkingEmailAddress = false;
      uniqueEmailAddress = false;
      return;
    }
    uniqueEmailAddress = await checkIfEmailExists();
    checkingEmailAddress = false;
    registerButtonDiabled = !(uniqueEmailAddress && pwStrength == 100);
  }, 300);

  function checkPasswordStrength(event) {
    pwStrength = 0;
    const ps = passwordStrength(password).value;
    switch (ps) {
      case 'Too weak':
        pwStrength = 25;
        break;

      case 'Weak':
        pwStrength = 50;
        break;

      case 'Medium':
        pwStrength = 75;
        break;

      case 'Strong':
        pwStrength = 100;
        break;
    }
    registerButtonDiabled = !(uniqueEmailAddress && pwStrength == 100);
  }
</script>

<svelte:head>
  <title>Register • Kapowey!</title>
</svelte:head>

<section class="hero">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-6-tablet is-5-desktop is-4-widescreen">
          <form action="" class="box" on:submit|preventDefault={submit}>
            <div class="field">
              {#if email && !uniqueEmailAddress}
                <div class="has-text-warning is-pulled-right is-size-7">Email is in use or invalid</div>
              {/if}
              <label for="" class="label">Email</label>
              <div class="control has-icons-left has-icons-right">
                <input type="email" bind:value={email} on:keydown={checkForExistingEmail} placeholder="e.g. bwayne@kapowey.com" maxlength="256" class="input" required />
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope" />
                </span>
                {#if uniqueEmailAddress}
                  <span class="icon has-text-success is-small is-right">
                    <i class="fas fa-thumbs-up" />
                  </span>
                {:else if checkingEmailAddress}
                  <span class="icon has-text-danger is-small is-right">
                    <i class="fas fas fa-spinner fa-pulse" />
                  </span>
                {:else if email}
                  <span class="icon has-text-danger is-small is-right">
                    <i class="fas fa-thumbs-down" />
                  </span>
                {/if}
              </div>
            </div>
            <div class="field">
              {#if pwStrength && pwStrength < 100}
                <div class="has-text-warning is-pulled-right is-size-7">Password is not strong enough</div>
              {/if}
              <label for="" class="label">Password</label>
              <div class="control has-icons-left has-icons-right">
                <input type="password" bind:value={password} on:keydown={checkPasswordStrength} placeholder="*******" maxlength="256" class="input" required />
                <span class="icon is-small is-left">
                  <i class="fa fa-lock" />
                </span>
                {#if pwStrength}
                  <span class="icon is-small is-right">
                    <progress
                      class="progress mr-1"
                      class:is-danger={pwStrength < 50}
                      class:is-warning={pwStrength >= 75 && pwStrength !== 100}
                      class:is-success={pwStrength === 100}
                      value={pwStrength}
                      max="100"
                    />
                  </span>
                {/if}
              </div>
            </div>
            <div class="field">
              <button class="button is-success" disabled={registerButtonDiabled}><span class="icon mr-1"><i class="fas fa-user-plus" /></span> Register </button>
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
              <p>Register</p>
            </div>
            <div class="message-body">
              <p class="mb-2">Here you can create a new user account on Kapowey!</p>
              <p class="mb-2">A user account is necessary to create collections and help Kapowey! grow by contributing and editing information.</p>
              <p>When you create an account, you will receive an email with a link. Before you can sign into Kapowey! you must validate your email by clicking the link in the email.</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</section>
