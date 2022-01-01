<script context="module">
  import { session } from '$app/stores';
  import { protectedRoute } from '$lib/protectedRoute';
  import { post, patch } from '$lib/api';
  import { get } from '../../lib/api';
  export async function load({ session }) {
    return protectedRoute(session, {}, null, '/profile/edit');
  }
</script>

<script>
  import { onMount } from 'svelte';
  import ListErrors from '$lib/ListErrors.svelte';
  import { toast } from 'bulma-toast';
  import debounce from 'lodash/debounce';
  import { marked } from 'marked';

  let user = {
    profileAbout: '',
  };

  let errors, avatar, saveProfileEnabled, saveAvatarEnabled, modifyToken, isEmailValid, checkingEmailAddress, isUserNameValid, checkingUserName;

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

  const checkIfEmailExists = async () => {
    const response = await get(`user/byemail/${encodeURIComponent(btoa(user.email))}`, {});
    if (!response.isSuccess) {
      return false;
    }
    return response.totalNumberOfRecords === 0 || (response.totalNumberOfRecords === 1 && response.data[1].id === user.id);
  };

  const checkIfUserNamelExists = async () => {
    const response = await get(`user/byusername/${encodeURIComponent(btoa(user.userName))}`, {});
    if (!response.isSuccess) {
      return false;
    }
    return response.totalNumberOfRecords === 0 || (response.totalNumberOfRecords === 1 && response.data[1].id === user.id);
  };

  const checkForExistingEmail = debounce(async (e) => {
    checkingEmailAddress = true;
    errors = null;
    if (!user.email) {
      checkingEmailAddress = false;
      isEmailValid = false;
      return;
    }
    isEmailValid = await checkIfEmailExists();
    checkingEmailAddress = false;
    saveProfileEnabled = isEmailValid;
  }, 300);

  const checkForExistingUserName = debounce(async (e) => {
    checkingUserName = true;
    errors = null;
    if (!user.userName) {
      checkingUserName = false;
      isUserNameValid = false;
      return;
    }
    isUserNameValid = await checkIfUserNamelExists();
    checkingUserName = false;
    saveProfileEnabled = isUserNameValid;
  }, 300);

  async function uploadSelectedAvatar(e) {
    const response = await post(`user/setavatar/${user.id}`, { id: user.id, modifyToken, avatarUrl: avatar }, $session.user.token);
    if (response.isSuccess) {
      $session.user.avatarUrl = response.data.avatarUrl;
      modifyToken = response.data.modifyToken;
      toast({ message: 'Updated profile image successfully!', position: 'top-center', type: 'is-success' });
    }
  }

  async function submit(event) {
    errors = null;
    const response = await patch(
      `user/${user.id}/${modifyToken}`,
      [
        { op: 'add', path: '/email', value: user.email },
        { op: 'add', path: '/userName', value: user.userName },
        { op: 'add', path: '/phoneNumber', value: user.phoneNumber },
        { op: 'add', path: '/profileAbout', value: user.profileAbout },
        { op: 'add', path: '/isPublic', value: user.isPublic },
      ],
      $session.user.token,
    );
    if (response.isSuccess) {
      modifyToken = response.data.modifyToken;
      toast({ message: 'Updated profile successfully!', position: 'top-center', type: 'is-success' });
      return;
    }
    errors = response.messages.map((m) => m.message);
  }
</script>

<svelte:head>
  <title>Edit Profile • Kapowey!</title>
</svelte:head>

<section>
  <div class="container box my-3">
    <form action="" class="" on:submit|preventDefault={submit}>
      <div class="field is-pulled-right">
        <input id="switchExample" type="checkbox" name="switchExample" class="switch" bind:checked={user.isPublic} on:change={() => (saveProfileEnabled = true)} />
        <label for="switchExample">Can other users see your profile?</label>
      </div>
      <div class="field mt-4">
        <label for="" class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input type="email" bind:value={user.email} on:keydown={checkForExistingEmail} maxlength="256" class="input" required />
          <span class="icon is-small is-left">
            <i class="fa fa-envelope" />
          </span>
          {#if isEmailValid}
            <span class="icon has-text-success is-small is-right">
              <i class="fas fa-thumbs-up" />
            </span>
          {:else if checkingEmailAddress}
            <span class="icon has-text-danger is-small is-right">
              <i class="fas fas fa-spinner fa-pulse" />
            </span>
          {/if}
        </div>
      </div>
      <div class="field">
        <label for="" class="label">Username</label>
        <div class="control has-icons-left has-icons-right">
          <input type="text" bind:value={user.userName} on:keydown={checkForExistingUserName} maxlength="256" class="input" required />
          <span class="icon is-small is-left">
            <i class="fas fa-user" />
          </span>
          {#if isUserNameValid}
            <span class="icon has-text-success is-small is-right">
              <i class="fas fa-thumbs-up" />
            </span>
          {:else if checkingUserName}
            <span class="icon has-text-danger is-small is-right">
              <i class="fas fas fa-spinner fa-pulse" />
            </span>
          {/if}
        </div>
      </div>
      <div class="field">
        <label for="" class="label">Phone Number</label>
        <div class="control has-icons-left">
          <input type="tel" bind:value={user.phoneNumber} on:keydown={() => (saveProfileEnabled = true)} class="input" />
          <span class="icon is-small is-left">
            <i class="fas fa-mobile-alt" />
          </span>
        </div>
      </div>
      <div class="field profile-editor">
        <label for="" class="label">About</label>
        <div class="control columns is-6">
          <div class="column">
            <textarea class="profile-editor" bind:value={user.profileAbout} on:keydown={() => (saveProfileEnabled = true)} placeholder="Edit your profile about details here." />
          </div>
          <div class="column is-6 box">
            <div class="">{@html marked(user.profileAbout || '')}</div>
          </div>
        </div>
      </div>

      <div class="field">
        <button class="button is-success" disabled={!saveProfileEnabled}><span class="icon mr-1"><i class="fas fa-id-card" /></span> Save Profile </button>
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
                <i class="fas fa-image" />
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

  textarea.profile-editor {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
