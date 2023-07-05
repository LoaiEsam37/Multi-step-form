import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { useAppSelector, useAppDispatch } from '../../app/hooks'

interface Item {
    name: string;
    email: string;
    phone: string;
    plan: string;
    paymentOption: string;
    services: string[];
}

interface ObjectState {
    items: Item;
}

const initialState: ObjectState = {
    items: {
        name: "",
        email: "",
        phone: "",
        plan: "",
        paymentOption: "",
        services: [],
    },
};

export const objectSlice = createSlice({
    name: 'object',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.items.name = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.items.email = action.payload;
        },
        setPhone: (state, action: PayloadAction<string>) => {
            state.items.phone = action.payload;
        },
        setPlan: (state, action: PayloadAction<string>) => {
            state.items.plan = action.payload;
        },
        setPaymentOption: (state, action: PayloadAction<string>) => {
            state.items.paymentOption = action.payload;
        },
        setServices: (state, action: PayloadAction<string[]>) => {
            state.items.services = action.payload;
        },
    },
});

export const { setName, setEmail, setPhone, setPlan, setPaymentOption, setServices } = objectSlice.actions;

export const selectItems = (state: RootState) => state.object.items;

export const useObjectSelector = <TSelected>(
    selector: (state: ObjectState) => TSelected
) => useAppSelector((state: RootState) => selector(state.object));

export const useObjectDispatch = () => useAppDispatch();

export default objectSlice.reducer;