import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IIngidient } from "../igredientsSlice/ingredientsSlice";

export interface IIngredientsState {
    burgerComponents: IIngidient[];
}

const initialState: IIngredientsState = {
    burgerComponents: [],
};

export const burgerComponentsSlice = createSlice({
    name: "burgerComponents",
    initialState,
    reducers: {
        initIngredients: (state, action: PayloadAction<IIngidient[]>) => {
            state.burgerComponents = action.payload;
        },

        add: (state, action: PayloadAction<IIngidient>) => {
            const { payload } = action;
            const hasBun = state.burgerComponents.find(
                (el) => el.type === "bun"
            );
            console.log(hasBun);
            if (payload.type === "bun" && hasBun) {
                state.burgerComponents = state.burgerComponents.map((item) => {
                    if (item._id !== payload._id && item.type === "bun")
                        return payload;
                    return item;
                });
            }
            if (payload.type !== "bun" || !hasBun) {
                state.burgerComponents = [...state.burgerComponents, payload];
            }

            console.log(state.burgerComponents);
        },

        // moveCards: (
        //     state,
        //     action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
        // ) => {
        //     const { dragIndex, hoverIndex } = action.payload;
        //     const dragCard = state.burgerComponents[dragIndex];
        //     const newCards = [...state.burgerComponents];
        //     newCards.splice(dragIndex, 1);
        //     newCards.splice(hoverIndex, 0, dragCard);
        //     state.burgerComponents = newCards;
        // },

        remove: (state, action: PayloadAction<IIngidient>) => {
            const { payload } = action;
            state.burgerComponents = state.burgerComponents.map((item) => {
                return item._id === payload._id
                    ? { ...item, count: item.count - 1 }
                    : item;
            });
        },
    },
});

export const {
    initIngredients,
    add,
    // moveCards,
    remove,
} = burgerComponentsSlice.actions;

export const burgerComponentsSelector = (state: RootState) =>
    state.burgerComponentsSlice.burgerComponents;

export default burgerComponentsSlice.reducer;
