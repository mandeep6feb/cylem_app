export interface leaderboardWinnerType {
    id: string,
    user_id: number,
    active_users_for_months: number,
    subscription_id: number,
    amount: number,
    cashback_date: string,
    status: number,
    created_at: string,
    full_name: string,
    user_code: string
}

export interface bucketType {
    id: string,
    user_id: number,
    subscription_id: number,
    start_date: string,
    end_date: string,
    last_subs_paid_date: string,
    sub_pay_date: string,
    is_user_active: number,
    pay_amount: number,
    duration: number,
    total_paid_subs: number,
    status: number,
}

interface Book {
    pdf_image: string;
    pdf_link: string;
    title: string;
}

export interface BooksCollection {
    [category: string]: Book[];
}


export interface paymentType {
    id: string,
    order_id: number,
    user_id: number,
    payment_id: number,
    subscription_id: number,
    transaction_status: number,
    amount: number,
    subscription_date: string,
    created_at: string,
}

export interface collectionType {
    id: string,
    user_id: number,
    collection_in: number,
    collection_out: number,
    is_active: number
}

export interface initialStateType {
    leaderboard_details: {
        jackpot_winner: null | leaderboardWinnerType,
        mega_winner: null | Array<leaderboardWinnerType>,
        mini_winner: null | Array<leaderboardWinnerType>,
    },
    payment_details: {
        bucket_details: null | bucketType,
        payment_details: null | Array<paymentType>,
    },
    books: null | BooksCollection,
    user_collection_details: null | collectionType
    IsLoading: boolean,
    error: null | any
}
