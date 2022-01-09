<script context="module">
  import { session } from '$app/stores';
</script>

<script>
  import * as api from '$lib/api.js';
  import { onMount } from 'svelte';
  import { toast } from 'bulma-toast';
  import debounce from 'lodash/debounce';
  import PublisherCard from '$lib/components/PublisherCard.svelte';

  let publisherData = [];
  let filterValue = null;
  let pagingInformation = {
    pageNumber: 1,
    totalNumberOfPages: 1,
    totalNumberOfRecords: 0,
    filters: [],
  };
  let pageButtons = [];

  let nextPageDisabled = false;
  let previousPageDisabled = true;

  onMount(async () => {
    await getPublisherData();
  });

  async function btnGotoPage(e) {}

  const filterData = debounce(async (e) => {
    if (!filterValue) {
      pagingInformation.pageNumber = 1;
      pagingInformation.totalNumberOfPages = 1;
      pagingInformation.totalNumberOfRecords = 0;
    }
    pagingInformation.filters = [
      {
        operation: 'like',
        prop: 'name',
        value: filterValue,
      },
    ];
    await getPublisherData();
  }, 300);

  async function gotoPreviousPage() {
    pagingInformation.pageNumber--;
    await gotoPage();
  }

  async function gotoNextPage() {
    pagingInformation.pageNumber++;
    await gotoPage();
  }

  async function gotoPage() {
    nextPageDisabled = false;
    previousPageDisabled = true;
    if (pagingInformation.pageNumber >= pagingInformation.totalNumberOfPages) {
      pagingInformation.pageNumber = pagingInformation.totalNumberOfPages;
      nextPageDisabled = true;
    } else if (pagingInformation.pageNumber <= 1) {
      previousPageDisabled = false;
    }
    await getPublisherData();
  }

  async function getPublisherData() {
    const response = await api.post(
      `publishers`,
      {
        pageSize: 10,
        page: pagingInformation.pageNumber,
        filters: pagingInformation.filters,
      },
      $session.user.token,
    );
    if (response.isSuccess) {
      publisherData = response.data;
      pagingInformation.totalNumberOfPages = response.totalNumberOfPages;
      pagingInformation.totalNumberOfRecords = response.totalNumberOfRecords;
      pagingInformation.pageNumber = response.pageNumber;
      pageButtons = [pagingInformation.pageNumber];
      if (pagingInformation.totalNumberOfPages > pagingInformation.pageNumber) {
        pageButtons.push(pagingInformation.pageNumber + 1);
      }
      if (pagingInformation.totalNumberOfPages > pageButtons.slice(-1)[0]) {
        pageButtons.push(pageButtons.slice(-1)[0] + 1);
      }
      console.log({ nextPageDisabled, pagingInformation });
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
          <input placeholder="Filter" bind:value={filterValue} on:keydown={filterData} class="input is-primary" />
          <span class="icon is-small is-left">
            <i class="fas fa-search" />
          </span>
        </p>
      </div>
    </div>
    <div class="publisher-cards-container my-2">
      {#each publisherData as publisher}
        <PublisherCard {publisher} />
      {/each}
    </div>
    <nav class="pagination" aria-label="pagination">
      <button class="button pagination-previous" on:click={gotoPreviousPage} disabled={pagingInformation.pageNumber === 1}>Previous page</button>
      <button class="button pagination-next" on:click={gotoNextPage} disabled={nextPageDisabled}>Next page</button>
      <ul class="pagination-list">
        {#each pageButtons as pageButton}
          <li>
            <a href={'javascript:void(0);'} class="pagination-link" class:is-current={pageButton === pagingInformation.pageNumber} aria-label="Page {pageButton}" aria-current="page">{pageButton}</a>
          </li>
        {/each}
        {#if pageButtons.slice(-1)[0] < pagingInformation.totalNumberOfPages + 2}
          <li>
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
        {/if}
        {#if pageButtons.slice(-1)[0] < pagingInformation.totalNumberOfPages}
          <li>
            <a href={'javascript:void(0);'} class="pagination-link" on:click={btnGotoPage} aria-label="Page {pagingInformation.totalNumberOfPages}" aria-current="page"
              >{pagingInformation.totalNumberOfPages}</a
            >
          </li>
        {/if}
      </ul>
    </nav>
  </div>
</div>

<style>
  blockquote p {
    border-left: 1px solid;
  }
</style>
