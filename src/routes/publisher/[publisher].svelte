<script context="module">
  import { session } from '$app/stores';
  import { get } from '$lib/api';
</script>

<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  let publisherId = $page.params.publisher;
  let publisher = {
    id: '',
  };

  onMount(async () => {
    publisher = (await get(`publisher/${publisherId}`, $session.user.token)).data;
    publisher.yearBegan = publisher.yearBegan || '';
    publisher.yearEnd = publisher.yearEnd || '';
  });
</script>

<svelte:head>
  <title>Publisher BATMAN • Kapowey!</title>
</svelte:head>

<nav class="breadcrumb my-2" aria-label="breadcrumbs">
  <ul>
    <li>
      <a href="/"
        ><span class="icon is-small">
          <i class="fas fa-home" aria-hidden="true" />
        </span>Dashboard</a
      >
    </li>
    <li><a href="/publishers"><span class="icon is-small"><i class="fas fa-building" /></span>Publishers</a></li>
    <li class="is-active"><a href={'javascript:void(0);'} aria-current="page">{publisher.name}</a></li>
  </ul>
</nav>

<div class="columns mt-1">
  <div class="column is-one-fifth">
    <figure class="image is-128x128">
      <img src={publisher.imageUrl} alt={publisher.shortName} />
    </figure>
  </div>
  <div class="column">
    <section class="hero">
      <div class="hero-body">
        <p class="title">{publisher.name}</p>
        <p class="subtitle">{publisher.shortName}</p>
      </div>
    </section>
  </div>
</div>

<div class="columns">
  <div class="column is-half content">
    <p>{publisher.description}</p>
  </div>
  <div class="column is-half">
    <div class="columns">
      <div class="column is-half">Year Started: <span class="is-pulled-right">{publisher.yearBegan}</span></div>
      <div class="column is-half">Year End: <span class="is-pulled-right">{publisher.yearEnd}</span></div>
    </div>
  </div>
</div>
