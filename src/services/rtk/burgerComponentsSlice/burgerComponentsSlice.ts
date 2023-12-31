import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IIngidient } from "../rtkQuerry/stellarApi";

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
        },

        remove: (state, action: PayloadAction<IIngidient>) => {
            const { payload } = action;
            state.burgerComponents = state.burgerComponents.filter((item) => {
                return item.id !== payload.id;
            });
        },
    },
});

export const { initIngredients, add, remove } = burgerComponentsSlice.actions;

export const burgerComponentsSelector = (state: RootState) =>
    state.burgerComponentsSlice.burgerComponents;

export default burgerComponentsSlice.reducer;
