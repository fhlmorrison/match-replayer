<script lang="ts">
    import MdVideocam from "svelte-icons/md/MdVideocam.svelte";
    import MdAssignment from "svelte-icons/md/MdAssignment.svelte";
    import type { type } from "os";

    // your script goes here

    type ViewItemIcon = typeof MdVideocam;
    type ViewItemType = "video" | "dslog" | "robotlog";

    type ViewItem = {
        type: ViewItemType;
        description: string;
        icon: ViewItemIcon;
    };

    const items: ViewItem[] = [
        {
            type: "video",
            description: "Video",
            icon: MdVideocam,
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

    import Video from "./Video.svelte";
</script>

<div class="item-selector">
    {#each items as item}
        <div class="selection-item" aria-label={item.description} style="aria-">
            <span class="tooltip">{item.description}</span>
            <div class="icon">
                <svelte:component this={item.icon} />
            </div>
        </div>
    {/each}
</div>

<style>
    .item-selector {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px;
        max-width: 90%;
    }

    .selection-item {
        position: relative;
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
        height: 100%;
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
