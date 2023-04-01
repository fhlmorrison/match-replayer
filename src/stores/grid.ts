import gridHelp from "svelte-grid/build/helper/index.mjs";
import { writable } from "svelte/store";

type GridItem = {
    [COLUMNS: number]: {
        x: number;
        y: number;
        w: number;
        h: number;
        customDragger: boolean;
    };
    id: string;
}

const COLUMNS = 6;
const id = () => "_" + Math.random().toString(36).substr(2, 9);

let testitem: GridItem = {
    [COLUMNS]: gridHelp.item({
        x: 0,
        y: 0,
        w: 2,
        h: 3,
        customDragger: false
    }),
    id: id()
};

const itemsState = writable<GridItem[]>([]);
const adjustAfterRemove = false;



function add(items: GridItem[]): GridItem[] {
    let newItem = {
        [COLUMNS]: gridHelp.item({
            x: 0,
            y: 0,
            w: 2,
            h: 2,
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

    return [...items, ...[newItem]];
}

const remove = (item: GridItem, items: GridItem[]) => {
    let newItems = items.filter((value) => value.id !== item.id);

    if (adjustAfterRemove) {
        newItems = gridHelp.adjust(items, COLUMNS);
    }

    return newItems;
};



export const items = {
    /** */
    subscribe: itemsState.subscribe,
    set: itemsState.set,
    update: itemsState.update,
    /**Adds a grid item to the grid */
    add: () => itemsState.update(add),
    /**Removes a given grid item from the grid*/
    remove: (item: GridItem) => itemsState.update((items) => remove(item, items)),
    cols: [[1200, COLUMNS]]
};