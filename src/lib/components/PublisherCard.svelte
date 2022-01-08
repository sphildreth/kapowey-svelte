<script>
  export let publisher;
</script>

<div class="card is-clickable" data-publisher-id={publisher.id}>
  <div class="card-image">
    <figure class="image is-4by3">
      <img src="{publisher.imageUrl}}" alt={publisher.shortName} />
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">{publisher.shortName}</p>
        <p class="subtitle is-6">{publisher.name}</p>
      </div>
    </div>
    <div class="content">
      {publisher.description}
      {#each publisher.tags as ptag}
        <a href="#">#{ptag}</a>
      {/each}
    </div>
  </div>
</div>
