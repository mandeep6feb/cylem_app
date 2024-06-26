import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commonService } from "@app/services/commonService";
import { initialStateType } from "@app/types/dashboard";

// get leaderboard
export const getLeaderboardDetails: any = createAsyncThunk(
    "user/leaderboard",
    async (series_number: number) => {
        const leaderboard_winners = await commonService(
            "POST",
            "api/user/get_winner_list",
            { series_number }
        )

        if (!leaderboard_winners || !leaderboard_winners?.status) {
            throw new Error(leaderboard_winners?.message ?? "No winners found");
        }

        return leaderboard_winners;
    }
)

// get payment or subscription details
export const getPaymentDetails: any = createAsyncThunk(
    'user/payment_details',
    async () => {

        const payment_and_bucket_data = await commonService(
            "GET",
            "api/payment/get-user-payments"
        );

        if (!payment_and_bucket_data || !payment_and_bucket_data?.status) {
            throw new Error(payment_and_bucket_data.message ?? "failed to get subscription details !");
        }

        return payment_and_bucket_data;
    }
)

// get user collection details
export const getCollectionDetails: any = createAsyncThunk(
    'user/collection_details',
    async () => {
        const data = await commonService(
            "GET",
            "api/user/get_user_collection",
        )

        if (!data?.status || !data) {
            console.log("I am here in collections")
            throw new Error(data?.message ?? "unkown error");
        }

        return data;
    }
)

// get user books
export const getBooksData: any = createAsyncThunk(
    'user/get_books',
    async () => {
        const data = await commonService(
            "GET",
            "api/user/get-user-books",
        )

        if (!data?.status || !data) {
            console.log("I am here in books")
            throw new Error(data?.message ?? "books not found !");
        }

        return data.res;
    }
)

const initialState: initialStateType = {
    leaderboard_details: {
        jackpot_winner: null,
        mega_winner: null,
        mini_winner: null,
    },
    payment_details: {
        bucket_details: null,
        payment_details: null,
    },
    books: null,
    user_collection_details: null,
    IsLoading: false,
    error: null
}

export const dashboardSlice = createSlice({
    name: 'dashboard_slice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getLeaderboardDetails.fulfilled, (state, action) => {
                state.IsLoading = false;
                state.leaderboard_details.jackpot_winner = action.payload.res.jackpot_winner;
                state.leaderboard_details.mega_winner = action.payload.res.megawinner;
                state.leaderboard_details.mini_winner = action.payload.res.miniwinner;
            })
            .addCase(getLeaderboardDetails.pending, (state, action) => {
                state.IsLoading = true;
            })
            .addCase(getLeaderboardDetails.rejected, (state, action) => {
                state.IsLoading = false;
                if (action.error.message !== "No winners found") {
                    state.error = action.error.message;
                }
            })
        builder
            .addCase(getPaymentDetails.fulfilled, (state, action) => {
                state.IsLoading = false;
                state.payment_details.bucket_details = action.payload.user_details.bucket_details[0];
                state.payment_details.payment_details = action.payload.user_details.payment_details;
            })
            .addCase(getPaymentDetails.pending, (state, action) => {
                state.IsLoading = true;
            })
            .addCase(getPaymentDetails.rejected, (state, action) => {
                state.IsLoading = false;
                state.error = action.error.message;
            })

        builder
            .addCase(getCollectionDetails.fulfilled, (state, action) => {
                state.IsLoading = false;
                state.user_collection_details = action.payload[0];
            })
            .addCase(getCollectionDetails.pending, (state) => {
                state.IsLoading = true;
            })
            .addCase(getCollectionDetails.rejected, (state, action) => {
                state.IsLoading = false;
                state.error = action.error.message;
            })

        builder
            .addCase(getBooksData.fulfilled, (state, action) => {
                state.IsLoading = false;
                state.books = action.payload;
            })
            .addCase(getBooksData.pending, (state, action) => {
                state.IsLoading = true;
            })
            .addCase(getBooksData.rejected, (state, action) => {
                state.IsLoading = false;
                state.error = action.error.message;
            })
    },
    reducers: {
        clearDashboardState: (state, action) => {
            state.leaderboard_details.jackpot_winner = null;
            state.leaderboard_details.mega_winner = null;
            state.leaderboard_details.mini_winner = null;
            state.payment_details.bucket_details = null;
            state.payment_details.payment_details = null;
            state.user_collection_details = null;
        },
    },
})
export const { clearDashboardState } = dashboardSlice.actions;
export default dashboardSlice.reducer