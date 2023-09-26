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
            state.burgerComponents = state.burgerComponents.map((item) => {
                if (payload.type === "bun") {
                    if (item._id !== payload._id && item.type === "bun")
                        return { ...item, count: 0 };
                }
                return item._id === payload._id
                    ? { ...item, count: item.count + 1 }
                    : item;
            });
        },
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

export const { initIngredients, add, remove } = burgerComponentsSlice.actions;

export const burgerComponentsSelector = (state: RootState) =>
    state.burgerComponentsSlice.burgerComponents;

export default burgerComponentsSlice.reducer;
