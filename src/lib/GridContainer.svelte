<script lang="ts">
    import Grid from "svelte-grid";
    import gridHelp from "svelte-grid/build/helper/index.mjs";
    import MdDragHandle from "svelte-icons/md/MdDragHandle.svelte";
    import MdClose from "svelte-icons/md/MdClose.svelte";
    import GridItem from "./GridItem.svelte";

    const COLUMNS = 6;
    let fillSpace = false;

    const id = () => "_" + Math.random().toString(36).substr(2, 9);

    let items = [
        {
            [COLUMNS]: gridHelp.item({
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                customDragger: true,
            }),
            id: id(),
        },

        {
            [COLUMNS]: gridHelp.item({
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                customDragger: true,
            }),
            id: id(),
        },
    ];

    const cols = [[1200, 6]];

    function add() {
        let newItem = {
            6: gridHelp.item({
                w: 2,
                h: 2,
                x: 0,
                y: 0,
                customDragger: true,
            }),
            id: id(),
        };

        let findOutPosition = gridHelp.findSpace(newItem, items, COLUMNS);

        newItem = {
            ...newItem,
            [COLUMNS]: {
                ...newItem[COLUMNS],
                ...findOutPosition,
            },
        };

        items = [...items, ...[newItem]];
    }

    const remove = (item) => {
        items = items.filter((value) => value.id !== item.id);

        if (adjustAfterRemove) {
            items = gridHelp.adjust(items, COLUMNS);
        }
    };

    let adjustAfterRemove = false;
</script>

<button on:click={add}>Add</button>
<label>
    <input type="checkbox" bind:checked={adjustAfterRemove} />
    Adjust elements after removing an item
</label>

<div class="demo-container">
    <Grid
        {fillSpace}
        bind:items
        rowHeight={100}
        let:item
        let:dataItem
        {cols}
        let:movePointerDown
    >
        <div class="demo-widget">
            <div
                on:pointerdown={(e) => e.stopPropagation()}
                on:click={() => remove(dataItem)}
                on:keypress={(e) => {
                    if (e.key === "Enter") {
                        remove(dataItem);
                    }
                }}
                class="remove icon"
            >
                <MdClose />
            </div>
            <div on:pointerdown={movePointerDown} class="drag icon">
                <MdDragHandle />
            </div>
            <GridItem />
        </div>
    </Grid>
</div>

<style>
    .demo-widget {
        background: #f1f1f1;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .demo-container {
        width: 100%;
        /* background: linear-gradient(45deg, #705252, #e1e1e1); */
    }

    .remove {
        z-index: 1;
        cursor: pointer;
        position: absolute;
        right: 5px;
        top: 3px;
        user-select: none;
    }

    .drag {
        z-index: 1;
        cursor: grab;
        position: absolute;
        left: 5px;
        top: 3px;
        user-select: none;
    }
    .icon {
        width: 20px;
    }

    /* change pointer when mousedown on drag */
    .drag:active {
        cursor: grabbing;
    }
</style>
