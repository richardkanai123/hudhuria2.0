// create or edit a user
import { fetchMutation } from 'convex/nextjs';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { api } from '../../../../convex/_generated/api';

const validateUserSchema = (bodyData: unknown) => {
    const schema = z.object({
        name: z.string().min(5, { message: "Too short, minimum is 5 characters" }),
        email: z.string().email({ message: "Invalid email" }),
        password: z
            .string()
            .min(1, { message: "Password is required" })
            .min(6, { message: "Password must be at least 6 characters" }),
        bio: z.string().min(10, { message: "Bio is required, at least 10 characters" }),
        confirmPassword: z
            .string()
            .min(1, { message: "Confirm password is required" })
            .min(6, { message: "Confirm password must be at least 8 characters" }),
        
    })

    const result = schema.safeParse(bodyData)
    if (result.success) {
        return { valid: true, error: null }
    } else {
        return { valid: false, error: result.error.issues[0].message }
    }

}

export async function POST(request: NextRequest) { 
    // add new user
    const bodyData = await request.json();
    // validate body
    const { valid, error } = validateUserSchema(bodyData);
    if (!valid) {
        return NextResponse.json({ message: error }, { status: 400 })
    }
    // add new user
    const NewUser = await fetchMutation(api.users.AddNewUser, bodyData);
    if (!NewUser) {
        return NextResponse.json({ message: `Failed to add new user` }, { status: 400 })
    }
    revalidatePath('/')
    return NextResponse.json({ message: `Added new user!` }, { status: 201 })
}