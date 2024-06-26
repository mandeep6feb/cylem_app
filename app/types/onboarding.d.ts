export interface Personal_details_Type {
    first_name: string,
    last_name: string,
    mobile: string,
    email: string,
    gender: string,
    father_name: string,
    referral: string,
    role?: number,
    referral?: string,
    user_code?: string,
    created_at?: string,
}

export interface Address_details_Type {
    adress_line_1: string,
    house_number: string,
    landmark: string,
    city: string,
    state: string,
    pincode: string | number,
    created_at?: string,
}

export interface Bank_details_Type {
    bank: string,
    account_type: number,
    branch: string,
    city: string,
    account_number: string,
    holder_name: string,
    ifsc_code: string,
    isdefault: number,
    status: number,
}
