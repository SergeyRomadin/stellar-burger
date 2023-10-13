import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IIngidient {
    id: string;
    _id: string;
    name: string;
    type: "bun" | "main" | "sauce";
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export interface IIngredientsState {
    ingridients: IIngidient[];
}

const initialState: IIngredientsState = {
    ingridients: [],
};

export const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        initIngredients: (state, action: PayloadAction<IIngidient[]>) => {
            state.ingridients = action.payload;
        },
        // add: (state, action: PayloadAction<IIngidient>) => {
        //     const { payload } = action;
        //     state.ingridients = state.ingridients.map((item) => {
        //         if (payload.type === "bun") {
        //             if (item._id !== payload._id && item.type === "bun")
        //                 return { ...item, count: 0 };
        //         }
        //         return item._id === payload._id
        //             ? { ...item, count: item.count + 1 }
        //             : item;
        //     });
        // },
        // remove: (state, action: PayloadAction<IIngidient>) => {
        //     const { payload } = action;
        //     state.ingridients = state.ingridients.map((item) => {
        //         return item._id === payload._id
        //             ? { ...item, count: item.count - 1 }
        //             : item;
        //     });
        // },
    },
});

export const {
    initIngredients,
    //  add, remove
} = ingredientsSlice.actions;

export const ingredientsSelector = (state: RootState) =>
    state.ingredientsSlice.ingridients;

export default ingredientsSlice.reducer;
