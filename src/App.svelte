<script lang="ts">
  import GridContainer from "./lib/GridContainer.svelte";
  import PlaybackBar from "./lib/PlaybackBar.svelte";
  import Video from "./lib/Video.svelte";
</script>

<main class="container">
  <div class="row">
    <Video />
  </div>
  <GridContainer />
</main>
<footer class="footer">
  <PlaybackBar />
</footer>
