<script context="module">
  import { session } from '$app/stores';
</script>

<script>
  import * as api from '$lib/api.js';
  import { onMount } from 'svelte';
  import { toast } from 'bulma-toast';
  import PublisherCard from '$lib/components/PublisherCard.svelte';

  let publisherData = [];

  onMount(async () => {
    await getPublisherData();
  });

  async function getPublisherData() {
    const response = await api.post(`publishers`, { pageSize: 3 }, $session.user.token);
    if (response.isSuccess) {
      publisherData = response.data;
      return;
    }
    toast({ message: 'Unable to get Publishers!', position: 'top-center', type: 'is-error' });
  }
</script>

<svelte:head>
  <title>Publishers • Kapowey!</title>
</svelte:head>

<div class="columns">
  <div class="column is-one-quarter is-hidden-touch">
    <article class="message is-small is-info mt-2">
      <div class="message-header">
        <p><span class="icon"><i class="fas fa-building" /></span> Publishers</p>
      </div>
      <div class="message-body">
        <p>A Publisher is a company who has published comic books.</p>
        <blockquote class="my-2">
          <p class="pl-1">
            European comics have existed since 1837, when Swiss artist Rodolphe Töpffer published Histoire de M. Vieux Bois. The oldest comic publishing company on this list is the now-defunct book
            publishing company, David McKay Publications that was founded in 1882 and published comics from 1935 to 1950. Most comic publishing companies were established in the United States of
            America where comics became popular in the mid 1900s.
          </p>
          <footer>— <a target="_blank" href="https://en.wikipedia.org/wiki/List_of_comics_publishing_companies">Wikipedia</a></footer>
        </blockquote>
      </div>
    </article>
    <article class="message is-small is-dark mt-2">
      <div class="message-header">
        <p><span class="icon"><i class="fas fa-chart-bar" /></span> Publishers with most Issues</p>
      </div>
      <div class="message-body has-text-black">Put the top 5 publishers by issue count here</div>
    </article>
    <article class="message is-small is-dark mt-2">
      <div class="message-header">
        <p><span class="icon"><i class="fas fa-chart-bar" /></span> Most collected Publishers</p>
      </div>
      <div class="message-body has-text-black">Put the top 5 publishers by collected issues here</div>
    </article>
    <article class="message is-small is-dark mt-2">
      <div class="message-header">
        <p><span class="icon"><i class="fas fa-chart-bar" /></span> Newest Publishers</p>
      </div>
      <div class="message-body has-text-black">Put the last 5 created publishers here</div>
    </article>
  </div>
  <div class="column is-three-quarter">
    <div class="publishers-filtering-container mt-2">
      <div class="field is-half">
        <p class="control has-icons-left has-icons-right">
          <input placeholder="Search" class="input is-primary" />
          <span class="icon is-small is-left">
            <i class="fas fa-search" />
          </span>
        </p>
      </div>
    </div>
    <div class="publisher-cards-container my-2">
      <div class="columns">
        {#each publisherData as publisher}
          <div class="column">
            <PublisherCard {publisher} />
          </div>
        {/each}
      </div>
    </div>
    <nav class="pagination" role="navigation" aria-label="pagination">
      <a class="pagination-previous is-disabled" title="This is the first page">Previous</a>
      <a class="pagination-next">Next page</a>
      <ul class="pagination-list">
        <li>
          <a class="pagination-link is-current" aria-label="Page 1" aria-current="page">1</a>
        </li>
        <li>
          <a class="pagination-link" aria-label="Goto page 2">2</a>
        </li>
        <li>
          <a class="pagination-link" aria-label="Goto page 3">3</a>
        </li>
      </ul>
    </nav>
  </div>
</div>

<style>
  blockquote p {
    border-left: 1px solid;
  }
</style>
