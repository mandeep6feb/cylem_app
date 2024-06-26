import { PayloadAction, createSlice } from '@reduxjs/toolkit'


export type intialStateType = {
    user: null | any;
    ispersonaldetails: number;
    isbank: number;
    isaddress: number;
    isLoading: boolean;
    isError: string;
}


const initialState: intialStateType = {
    user: null,
    ispersonaldetails: 0,
    isbank: 0,
    isaddress: 0,
    isLoading: false,
    isError: ""
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserDetails: (state, action) => {
            state.user = action.payload;
            state.ispersonaldetails = 1;

            if (action.payload['isbank'] === 1) {
                state.isbank = 1;
            }

            if (action.payload['isaddress'] === 1) {
                state.isaddress = 1;
            }
        },
        clearUserState: (state, action) => {
            state.isaddress = 0;
            state.isbank = 0;
            state.ispersonaldetails = 0;
            state.user = null;
        },

        updatePersonalDetailsState: (state, action: PayloadAction<number>) => {
            state.ispersonaldetails = action.payload;
        },

        updateAddressDetailsState: (state, action: PayloadAction<number>) => {
            state.isaddress = action.payload;
        },

        updateBankDetailsState: (state, action: PayloadAction<number>) => {
            state.isbank = action.payload;
        },
    },
})

export const {
    addUserDetails,
    clearUserState,
    updatePersonalDetailsState,
    updateAddressDetailsState,
    updateBankDetailsState
} = userSlice.actions

export default userSlice.reducer