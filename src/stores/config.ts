import { writable } from "svelte/store";

type config = {
    
}

const DEFAULT_CONFIG: config = {

}

export const config = writable<config>({});