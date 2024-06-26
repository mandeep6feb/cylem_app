import { z } from 'zod'

const noSpecialCharRegex = /^[a-zA-Z0-9 ]*$/;
const passwordRegex = /^(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[0-9])/;

export const LoginSchema = z.object({
    mobile: z.string()
        .nonempty('Mobile number is required')
        .trim()
        .regex(noSpecialCharRegex, 'No special characters allowed')
        .regex(/^[6-9]/, 'Invalid mobile number')
        .length(10, 'Invalid mobile number')
        .refine((val) => !val.trim().includes(' '), 'Remove extra spaces'),

    password: z.string()
        .regex(passwordRegex, "Password not strong")
        .refine(value => value.toString().trim().length >= 6 && value.toString().trim().length <= 15, 'Password must be between 6 and 15 characters')
})



export type mobileFieldFormType = z.infer<typeof LoginSchema>;

export const bankDetailSchema = z.object({
    bank: z.string()
        .nonempty("Bank name is required")
        .regex(noSpecialCharRegex, "Special characters not allowed")
        .refine((val) => val.trim().length !== 0, 'Bank name is required'),

    account_number: z.string()
        .nonempty("Account number is required")
        .min(9, 'Account number is minimum 9 character')
        .max(18, 'Account number not be maximum 18 character')
        .refine((val) => !val.includes(' '), 'Spaces are not allowed'),

    holder_name: z.string()
        .nonempty("Holder name is required")
        .regex(noSpecialCharRegex, 'special characters not allowed')
        .refine((val) => val.trim().length !== 0, 'Holder name is required'),

    ifsc_code: z.string()
        .nonempty("IFSC code is required")
        .min(11, 'Ifsc code is must be 11 character')
        .max(11, 'Ifsc code is must be 11 character')
        .refine((val) => !val.includes(' '), 'Spaces are not allowed'),

    city: z.string(),
    isdefault: z.number().int(),
    status: z.number().int(),
    branch: z.string(),
    account_type: z.number().int(),
})

export type BankDetailsFormType = z.infer<typeof bankDetailSchema>;


export const addressDetailSchema = z.object({
    adress_line_1: z.string()
        .nonempty('Address is required')
        .refine((val) => val.trim().length !== 0, 'Address is required'),

    state: z.string()
        .nonempty('State is required')
        .regex(noSpecialCharRegex, 'No special characters allowed')
        .refine((val) => val.trim().length !== 0, 'State is required'),

    house_number: z.string()
        .nonempty('House number is required')
        .refine((val) => val.trim().length !== 0, 'House_number is required'),

    landmark: z.string(),

    city: z.string()
        .nonempty('City is required')
        .regex(noSpecialCharRegex, 'No special characters allowed')
        .refine((val) => val.trim().length !== 0, 'City is required'),

    pincode: z.string()
        .nonempty('Pincode is required')
        .length(6, 'Invalid pincode')
        .refine((val) => !val.includes(' '), 'Spaces are not allowed')
})

export type AddressDetailsFormType = z.infer<typeof addressDetailSchema>

export const personalDetailSchema = z.object({
    first_name: z.string()
        .nonempty('First name is required')
        .regex(noSpecialCharRegex, 'No special characters allowed')
        .refine((val) => val.trim().length !== 0, 'Firstname is required'),

    last_name: z.string()
        .nonempty('Last name is required')
        .regex(noSpecialCharRegex, 'No special characters allowed')
        .refine((val) => val.trim().length !== 0, 'Lastname is required'),

    mobile: z.string()
        .nonempty('Mobile number is required')
        .regex(/^[6-9]/, 'Invalid mobile number')
        .length(10, 'Invalid mobile number')
        .refine((val) => !val.includes(' '), 'Spaces are not allowed'),

    email: z.string()
        .nonempty('Email is required')
        .max(35, 'Email not be greate than 35 chars')
        .refine(email => email.endsWith('@gmail.com'), 'Invalid email address'),

    gender: z.string()
        .nonempty('Gender is required')
        .refine((val) => !val.includes(' '), 'Spaces are not allowed'),

    father_name: z.string()
        .nonempty("Father's name is required")
        .regex(noSpecialCharRegex, 'No special characters allowed')
        .refine((val) => val.trim().length !== 0, "Father's name is required"),

    referral: z.string(),

    password: z.string()
        .nonempty('Password is required')
        .regex(passwordRegex, "Password not strong")
        .trim()
        .refine(value => value.toString().trim().length >= 6 && value.toString().trim().length <= 15, 'Password must be between 6 and 15 characters'),

    confirm_password: z.string()
        .nonempty('CPassword is required')
        .refine(value => value.toString().trim().length >= 6 && value.toString().trim().length <= 15, 'Password must be between 6 and 15 characters')
}).refine(
    (values) => {
        return values.password === values.confirm_password;
    },
    {
        message: "Password not match!",
        path: ["confirm_password"],
    }
);

export type PersonalDetailsFormType = z.infer<typeof personalDetailSchema>

export const WithdrawalSchema = z.object({
    withdrawal_amount: z.string()
        .nonempty('Please provide amount for Withdraw')
        .max(10, "Check withdrawal amount")
        .regex(noSpecialCharRegex, 'Invalid Amount')
        .refine((val) => !val.includes(' '), 'Invalid Amount')
})

export type WithdrawalFormType = z.infer<typeof WithdrawalSchema>