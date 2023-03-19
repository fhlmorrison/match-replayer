<script>
  import { openVideo } from "./loadAssets";
  import { currentTime } from "../stores";
  import MdVolumeUp from "svelte-icons/md/MdVolumeUp.svelte";
  import MdVolumeOff from "svelte-icons/md/MdVolumeOff.svelte";

  let src = "";
  let muted = false;
  let paused = true;
  let hovered = false;
  let duration;
  const getVideo = async () => {
    src = await openVideo();
  };
</script>

<div
  on:mouseenter={() => (hovered = true)}
  on:mouseleave={() => (hovered = false)}
>
  {#if src}
    <!-- svelte-ignore a11y-media-has-caption -->
    <video
      bind:currentTime={$currentTime}
      on:click={() => (paused = !paused)}
      bind:duration
      bind:paused
      bind:muted
    >
      <source type="video/mp4" {src} />
    </video>
    {#if hovered}
      <!-- content here -->
      <div class="controls">
        <div class="buttons">
          <div
            class="icon"
            on:click={() => (muted = !muted)}
            on:keydown={(e) => {
              console.log(e.key);
              ["enter", "space"].includes(e.key) && (muted = !muted);
            }}
          >
            {#if muted}
              <MdVolumeOff />
            {:else}
              <MdVolumeUp />
            {/if}
          </div>
        </div>
        <progress value={$currentTime / duration || 0} />
      </div>
    {/if}
  {:else}
    <button on:click={getVideo}>Open Video</button>
  {/if}
</div>

<style>
  div {
    position: relative;
  }
  .controls {
    position: absolute;
    bottom: 0;
    width: 100%;
    opacity: 80%;
  }

  .buttons {
    display: flex;
    /* justify-content: space-between; */
    justify-content: end;
    width: 100%;
  }

  .icon {
    width: 128px;
  }

  progress {
    margin: 0;
    display: block;
    width: 100%;
    height: 10px;
    appearance: none;
  }

  * {
    margin: 0;
    /* border: 1px black solid; */
  }
</style>
