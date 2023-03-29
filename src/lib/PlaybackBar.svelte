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
    currentTime.update((n) => n + s);
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
  <!-- Playback slider -->
  <div class="playback-bar">
    <div
      class="playback-bar__slider"
      on:click={jumpTo}
      bind:this={slider}
      on:keydown={keySeek}
    >
      <div
        class="playback-bar__slider__progress"
        style={`width: ${($currentTime * 100) / $totalTime}%`}
      />
    </div>
    <div class="playback-bar__time">
      <span class="playback-bar__time__current">{timeFormat($currentTime)}</span
      >
      <span>/</span>
      <span class="playback-bar__time__total">{timeFormat($totalTime)}</span>
    </div>
  </div>
  <!-- Pause button -->
  <div class="button-bar">
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
  </div>
</div>

<!-- markup (zero or more items) goes here -->
<style>
  :root {
    --slider-primary-color: #f00;
    --slider-secondary-color: #000;
    --light-text-color: #fff;
  }
  /* Style input range with red and black */
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
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
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 40px;
    border-radius: 10px;
  }

  .button-bar_group {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 25%;
    height: 100%;
  }

  .playback-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f00;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .playback-bar__slider {
    position: relative;
    width: 100%;
    height: 10px;
    background-color: #fff;
    border-radius: 5px;
    margin: 0 10px;
  }

  .playback-bar__slider__progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: #000;
    border-radius: 5px;
  }
  /* 
  .playback-bar__slider__progress::after {
    content: "";
    position: absolute;
    top: -5px;
    right: -5px;
    width: 20px;
    height: 20px;
    background-color: #000;
    border-radius: 50%;
  } */

  .playback-bar__time {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100px;
    height: 100%;
    color: #fff;
  }

  .playback-bar__time__current {
    font-size: 0.8rem;
    color: #fff;
  }

  .playback-bar__time__total {
    font-size: 0.8rem;
    color: #fff;
  }
</style>
