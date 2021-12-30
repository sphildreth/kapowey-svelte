<script context="module">
  import { session } from '$app/stores';
  import { protectedRoute } from '$lib/protectedRoute';
  import { post } from '$lib/api';
  import { get } from '../../lib/api';
  export async function load({ session }) {
    return protectedRoute(session, {}, null, '/profile/edit');
  }
</script>

<script>
  import { onMount } from 'svelte';
  import ListErrors from '$lib/ListErrors.svelte';
  import { toast } from 'bulma-toast';

  let user = {};

  let errors, avatar, saveAvatarEnabled, modifyToken;

  onMount(async () => {
    user = (await get(`user/${$session.user.id}`, $session.user.token)).data;
    modifyToken = user.modifyToken;
    avatar = user.avatarUrl;
  });

  const onFileSelected = (e) => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      avatar = e.target.result;
      const fileName = document.querySelector('#user-avatar-file .file-name');
      fileName.textContent = image.name;
      saveAvatarEnabled = true;
    };
  };

  async function uploadSelectedAvatar(e) {
    const response = await post(`user/setavatar/${user.id}`, { id: user.id, modifyToken, avatarUrl: avatar }, $session.user.token);
    if (response.isSuccess) {
      $session.user.avatarUrl = response.data.avatarUrl;
      modifyToken = response.data.modifyToken;
      toast({ message: 'Updated profile image successfully!', position: 'top-center', type: 'is-success' });
    }
  }

  async function submit(event) {
    // errors = null;
    // const response = await post(`auth/login`, { email, password });
    // if (response.isSuccess) {
    //   const returnUrl = $page.query.get('returnUrl');
    //   window.location = returnUrl ? Buffer.from(returnUrl, 'base64') : '/';
    // }
    // email = '';
    // password = '';
    // errors = response.messages.map((m) => m.message);
  }
</script>

<section>
  <div class="container box my-3">
    <form action="" class="" on:submit|preventDefault={submit}>
      <div class="field is-pulled-right">
        <input id="switchExample" type="checkbox" name="switchExample" class="switch" bind:checked={user.isPublic} />
        <label for="switchExample">Can other users see your profile?</label>
      </div>
      <div class="field mt-4">
        <label for="" class="label">Email</label>
        <div class="control has-icons-left">
          <input type="email" bind:value={user.email} maxlength="256" class="input" required />
          <span class="icon is-small is-left">
            <i class="fa fa-envelope" />
          </span>
        </div>
      </div>
      <div class="field">
        <label for="" class="label">Username</label>
        <div class="control has-icons-left">
          <input type="email" bind:value={user.userName} maxlength="256" class="input" required />
          <span class="icon is-small is-left">
            <i class="fas fa-user" />
          </span>
        </div>
      </div>
      <div class="field">
        <label for="" class="label">Phone Number</label>
        <div class="control has-icons-left">
          <input type="tel" bind:value={user.phoneNumber} class="input" />
          <span class="icon is-small is-left">
            <i class="fas fa-mobile-alt" />
          </span>
        </div>
      </div>
      <div class="field">
        <button class="button is-success" disabled><span class="icon mr-1"><i class="fas fa-id-card" /></span> Save Profile </button>
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
  </div>
</section>

<section>
  <div class="container box">
    <div class="columns">
      <div class="column is-10">
        <div id="user-avatar-file" class="file has-name is-fullwidth is-info">
          <label class="file-label">
            <input class="file-input" type="file" name="avatar" accept=".jpg, .jpeg, .png" on:change={(e) => onFileSelected(e)} />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload" />
              </span>
              <span class="file-label"> Select new profile image </span>
            </span>
            <span class="file-name" />
          </label>
        </div>
        <div>
          <button class="button is-success mt-2 is-fullwidth" disabled={!saveAvatarEnabled} on:click={(e) => uploadSelectedAvatar(e)}>
            <span class="file-icon">
              <i class="fas fa-upload" />
            </span>
            Save selected profile image</button
          >
        </div>
      </div>
      <div class="column is-2">
        <figure class="image is-128x128">
          <img alt="Your Avatar" class="user-avatar" src={avatar} />
        </figure>
      </div>
    </div>
  </div>
</section>

<style>
  img.user-avatar {
    max-height: 128px;
  }
</style>
