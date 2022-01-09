<script>
  export let publisher;
</script>

<div class="card is-clickable" data-publisher-id={publisher.id}>
  <div class="card-image" />
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img src={publisher.imageUrl} alt={publisher.shortName} />
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-5">{publisher.shortName}</p>
        <p class="subtitle is-6">{publisher.name}</p>
      </div>
    </div>
    <div class="content mb-0">
      <p>{publisher.description}</p>
    </div>
    <footer class="card-footer">
      {#each publisher.tags as ptag}
        <p class="card-footer-item">
          <a href="#">#{ptag}</a>
        </p>
      {/each}
    </footer>
  </div>
</div>

<style>
  .card {
    min-height: 235px;
  }
  .subtitle {
    min-height: 40px;
  }
  .content p {
    min-height: 45px;
  }
</style>
