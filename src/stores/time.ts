import { writable } from "svelte/store";

export const totalTime = writable<number>(0);
export const currentTime = writable<number>(0);
export const paused = writable<boolean>(true);