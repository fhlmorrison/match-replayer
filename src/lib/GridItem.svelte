<script lang="ts">
    import MdVideocam from "svelte-icons/md/MdVideocam.svelte";
    import MdAssignment from "svelte-icons/md/MdAssignment.svelte";
    import Video from "./Video.svelte";
    import type { type } from "os";

    // your script goes here

    type Component = typeof MdVideocam;
    type ViewItemType = "video" | "dslog" | "robotlog";

    type ViewItem = {
        type: ViewItemType;
        description: string;
        icon: Component;
        component?: Component;
    };

    const items: ViewItem[] = [
        {
            type: "video",
            description: "Video",
            icon: MdVideocam,
            component: Video,
        },
        {
            type: "dslog",
            description: "Driver Station Log",
            icon: MdAssignment,
        },
        {
            type: "robotlog",
            description: "Robot Log",
            icon: MdVideocam,
        },
    ];

    let selectedItem: ViewItem | null = null;
</script>

{#if selectedItem}
    <svelte:component this={selectedItem.component} />
{:else}
    <div class="item-selector">
        {#each items as item}
            <div
                class="selection-item"
                aria-label={item.description}
                on:keypress={(e) => {
                    if (e.key === "Enter") {
                        selectedItem = item;
                    }
                }}
                on:click={() => (selectedItem = item)}
            >
                <span class="tooltip">{item.description}</span>
                <div class="icon">
                    <svelte:component this={item.icon} />
                </div>
            </div>
        {/each}
    </div>
{/if}

<style>
    .item-selector {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px;
        width: 300px;
        max-height: 100%;
        margin: 0 10px;
    }

    .selection-item {
        position: relative;
        display: flex;
        align-content: center;
        justify-content: center;
        background-color: #fff;
        padding: 10px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        aspect-ratio: 1/1;
        color: #556;
    }

    .selection-item:hover {
        color: #55f;
    }

    .icon {
        display: flex;
        align-self: center;
        justify-self: center;
        height: 100%;
        max-height: 100px;
    }

    .selection-item:hover .tooltip {
        visibility: visible;
        opacity: 1;
    }

    .tooltip {
        visibility: hidden;
        width: 120px;
        background-color: #555;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        bottom: 110%;
        left: 50%;
        margin-left: -60px;
        opacity: 0;
        transition: opacity 0.3s;
    }
</style>
