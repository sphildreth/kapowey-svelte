<script>
  import * as api from '$lib/api.js';
  import { toast } from 'bulma-toast';
  import ListErrors from '$lib/ListErrors.svelte';
  import { envSettings } from '$lib/envSettings.ts';

  let email = '';
  let errors;

  async function submit(event) {
    errors = null;
    var emailb64 = btoa(email);
    var returnurlb64 = btoa(encodeURIComponent(`${envSettings.appUrl}/login/resetpassword?e=${email}`));
    const response = await api.get(`user/sendpasswordresetemail/${encodeURIComponent(emailb64)}/${returnurlb64}`);
    if (response.isSuccess) {
      toast({ message: 'Email sent! Please check your email in a couple of minutes.', position: 'top-center', type: 'is-success' });
      return;
    }
    errors = response.messages.map((m) => m.message);
  }
</script>

<svelte:head>
  <title>Forgot Password • Kapowey!</title>
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
              <button class="button is-fullwidth is-success"><span class="icon mr-1"><i class="fas fa-unlock-alt" /></span> Send password reset email </button>
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
              <p>Password reset process</p>
            </div>
            <div class="message-body">
              <p class="mb-2">Enter your email address you used to register and then click on the button, this will send you an email with a link.</p>
              <p class="mb-2">Once you click the link you will be able to enter a new password.</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</section>
