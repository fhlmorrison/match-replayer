<script>
    import { items } from "../stores";
</script>

<div class="toolbar">
    <button on:click={items.add}>Add</button>
    <!-- TODO: add confirmation dialog to clear button -->
    <button on:click={() => items.set([])}>Clear</button>
</div>

<!-- <label>
    <input type="checkbox" bind:checked={adjustAfterRemove} />
    Adjust elements after removing an item
</label> -->
<style>
    .toolbar {
        display: flex;
        gap: 10px;
        justify-content: flex-start;
        padding: 5px;
    }
</style>
