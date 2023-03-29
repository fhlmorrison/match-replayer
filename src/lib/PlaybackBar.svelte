<script lang="ts">
  import { currentTime, totalTime, paused } from "../stores";
  import MdPlayArrow from "svelte-icons/md/MdPlayArrow.svelte";
  import MdPause from "svelte-icons/md/MdPause.svelte";
  import MdFastForward from "svelte-icons/md/MdFastForward.svelte";
  import MdFastRewind from "svelte-icons/md/MdFastRewind.svelte";

  const FRAMERATE = 30;

  const togglePause = () => {
    paused.update((val) => !val);
  };

  const timeFormat = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes}:${seconds.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`;
  };
  let slider: Element;

  const jumpTo = (e: MouseEvent) => {
    const { clientX } = e;
    const { left, width } = slider.getBoundingClientRect();
    const percent = (clientX - left) / width;
    currentTime.set(percent * $totalTime);
  };

  const seek = (s: number) => () => {
    currentTime.update((n) => Math.max(n + s, $totalTime));
  };

  const keySeek = (e: KeyboardEvent) => {
    const { key } = e;
    switch (key) {
      case "ArrowLeft":
        seek(-1);
      case "ArrowRight":
        seek(1);
      case ",":
        seek(-1 / FRAMERATE);
      case ".":
        seek(1 / FRAMERATE);
    }
  };
</script>

<div class="playback-container">
  <input
    type="range"
    bind:value={$currentTime}
    min={0}
    max={$totalTime}
    step={1 / (10 * FRAMERATE)}
    style={`--input-value: ${($currentTime * 100) / $totalTime}%`}
  />
  <!-- Pause button -->
  <div class="button-bar">
    <div />
    <div class="button-bar_group">
      <button class="icon" on:click={seek(-5)}>
        <MdFastRewind />
      </button>
      <button class="icon" on:click={togglePause}>
        {#if $paused}
          <MdPlayArrow />
        {:else}
          <MdPause />
        {/if}
      </button>
      <button class="icon" on:click={seek(5)}>
        <MdFastForward />
      </button>
    </div>
    <div class="time">
      {timeFormat($currentTime)} / {timeFormat($totalTime)}
    </div>
  </div>
</div>

<!-- markup (zero or more items) goes here -->
<style>
  :root {
    --slider-primary-color: #bd0909;
    --slider-secondary-color: #000;
    --light-text-color: #fff;
  }
  /* Style input range with red and black */
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    box-shadow: none;
    cursor: pointer;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    margin: 0 10px;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    background: linear-gradient(
      to right,
      var(--slider-primary-color) 0%,
      var(--slider-primary-color) var(--input-value),
      var(--slider-secondary-color) var(--input-value),
      var(--slider-secondary-color) 100%
    );
    border-radius: 5px;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--slider-primary-color);
    cursor: pointer;
    margin-top: -5px;
  }

  .playback-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }

  .icon {
    width: 60px;
    height: 40px;
    cursor: pointer;
  }

  .button-bar {
    display: inline-grid;
    grid-template-columns: 1fr 2fr 1fr;
    width: 100%;
    height: 40px;
    border-radius: 10px;
  }

  .button-bar_group {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 100%;
  }

  .time {
    /* color: #000; */
    font-size: 1.2rem;
    justify-self: end;
  }
</style>
