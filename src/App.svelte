<script lang="ts">
  import GridContainer from "./lib/GridContainer.svelte";
  import PlaybackBar from "./lib/PlaybackBar.svelte";
  import ToolBar from "./lib/ToolBar.svelte";
</script>

<header>
  <ToolBar />
</header>
<main class="container">
  <GridContainer />
</main>
<footer>
  <PlaybackBar />
</footer>
