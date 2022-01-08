<script>
  import * as api from '$lib/api.js';
  import { page } from '$app/stores';
  import ListErrors from '$lib/ListErrors.svelte';
  import { passwordStrength } from 'check-password-strength';
  import { post } from '$lib/utils.js';

  const email = $page.url.searchParams.get('e');
  const token = $page.url.searchParams.get('t');

  let password1, password2, errors;
  let pwStrength = 0;
  let passwordMatch = false;
  let resetButtonDiabled = true;

  async function submit(event) {
    errors = null;
    const response = await api.post(`user/resetpassword/`, { email, password: password1, token, resetUrl: btoa(encodeURIComponent(`/login/resetpassword?e=${email}`)) });
    if (response.isSuccess) {
      const authResponse = await post(`/auth/login`, { email, password: password1 });
      if (authResponse.isSuccess) {
        window.location = '/';
      }
    }
    errors = response.messages.map((m) => m.message);
  }

  function checkPasswordStrength(event) {
    pwStrength = 0;
    const ps = passwordStrength(this.value).value;
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
    resetButtonDiabled = pwStrength != 100;
  }

  function doPasswordsMatch(event) {
    if (pwStrength != 100) {
      passwordMatch = false;
      return;
    }
    passwordMatch = password1 == password2;
    resetButtonDiabled = !passwordMatch;
  }
</script>

<svelte:head>
  <title>Reset Password • Kapowey!</title>
</svelte:head>

<section class="hero">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-6-tablet is-5-desktop is-4-widescreen">
          <form action="" class="box" on:submit|preventDefault={submit}>
            <div class="field">
              <label for="" class="label">Enter new password</label>
              <div class="control has-icons-left has-icons-right">
                <input type="password" bind:value={password1} on:keydown={checkPasswordStrength} placeholder="*******" maxlength="256" class="input" required />
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
              <label for="" class="label">Confirm new password</label>
              <div class="control has-icons-left has-icons-right">
                <input type="password" bind:value={password2} on:keydown={doPasswordsMatch} placeholder="*******" maxlength="256" class="input" required />
                <span class="icon is-small is-left">
                  <i class="fa fa-lock" />
                </span>
                {#if passwordMatch}
                  <span class="icon has-text-success is-small is-right">
                    <i class="fas fa-thumbs-up" />
                  </span>
                {:else if pwStrength}
                  <span class="icon has-text-danger is-small is-right">
                    <i class="fas fa-thumbs-down" />
                  </span>
                {/if}
              </div>
            </div>

            <div class="field">
              <button class="button is-fullwidth is-success" disabled={resetButtonDiabled}><span class="icon mr-1"><i class="fas fa-unlock-alt" /></span> Reset password </button>
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
              <p>Enter new password</p>
            </div>
            <div class="message-body">
              <p class="mb-2">Enter a new password and then click button. This will reset your password and sign you in.</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</section>
