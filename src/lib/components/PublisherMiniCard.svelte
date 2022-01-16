<script>
  export let publisher;

  function gotoPublisher() {
    window.location = `/publisher/${publisher.id}`;
  }
</script>

<div class="card is-clickable" data-publisher-id={publisher.id} on:click={gotoPublisher}>
  <div class="card-image" />
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-32x32">
          <img src={publisher.imageUrl} alt={publisher.shortName} />
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-6 mb-2">{publisher.shortName}</p>
        <div class="title-data-container">
          <div>
            <span class="is-size-7">Series {publisher.seriesCount || 0}</span>
          </div>
          <div>
            <span class="is-size-7">Franchises {publisher.franchisesCount || 0}</span>
          </div>
          <div>
            <span class="is-size-7">Issues: {publisher.issuesCount || 0}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .title-data-container {
    font-size: smaller;
  }
</style>
