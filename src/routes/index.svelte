<script>
  import { session } from '$app/stores';
  import * as api from '$lib/api.js';
  import { onMount } from 'svelte';
  import { toast } from 'bulma-toast';
  import PublisherMiniCard from '$lib/components/PublisherMiniCard.svelte';

  let publisherData = [];

  onMount(async () => {
    await getPublisherData();
  });

  async function getPublisherData() {
    const response = await api.post(
      `publishers`,
      {
        pageSize: 3,
        page: 1,
        orderBy: 'issueCount',
        orderDir: 'desc',
      },
      $session.user.token,
    );
    if (response.isSuccess) {
      publisherData = response.data;
      return;
    }
    toast({ message: 'Unable to get Publishers!', position: 'top-center', type: 'is-error' });
  }
</script>

<svelte:head>
  <title>Dashboard • Kapowey!</title>
</svelte:head>

{#if !$session.user}
  <article class="message is-primary mt-2">
    <div class="message-header">
      <p>Kapowey!</p>
    </div>
    <div class="message-body">
      <p>The motivation behind Kapowey! is to create an application which helps you manage your comic book collection.</p>
      <p>
        Once you register an account, you can start adding issues to your collection. Then quickly find out what issues you need to complete a series, share with someone your collection, or share with
        someone issues you wish you had.
      </p>
    </div>
  </article>
{/if}

<!-- <div class="box cta">
  <p class="has-text-centered">
    <span class="tag is-primary">New</span> Here we have modal cards. When you click on them they will open functional modal examples.
  </p>
</div> -->

<div class="columns">
  <div class="column is-one-quarter">
    <article class="message is-info">
      <div class="message-header">
        <p><span class="icon"><i class="fas fa-building" /></span> Publishers</p>
      </div>
      <div class="message-body">
        {#each publisherData as publisher}
          <PublisherMiniCard {publisher} />
        {/each}
      </div>
    </article>
  </div>
  <div class="column is-one-quarter">
    <article class="message is-info">
      <div class="message-header">
        <p><span class="icon"><i class="fas fa-cube" /></span> Series</p>
      </div>
      <div class="message-body">Put top 3 series here.</div>
    </article>
  </div>
  <div class="column is-half">
    <article class="message is-info">
      <div class="message-header">
        <p><span class="icon"><i class="fas fa-book" /></span> Issues</p>
      </div>
      <div class="message-body">Put random issues here.</div>
    </article>
  </div>
</div>
