<script lang="ts">
  import { currentTime, totalTime } from "../stores";

  let paused = false;
  const FRAMERATE = 30;

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
    <span class="playback-bar__time__current">{timeFormat($currentTime)}</span>
    <span>/</span>
    <span class="playback-bar__time__total">{timeFormat($totalTime)}</span>
  </div>
</div>

<!-- markup (zero or more items) goes here -->
<style>
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
