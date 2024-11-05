// get user
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { NextRequest, NextResponse } from "next/server";
import { Id } from "../../../../../convex/_generated/dataModel";
import { z } from "zod";
// import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {

    // get userid from request body
    const { searchParams } = new URL(request.url);

    try {
        const userid = searchParams.get("userid") as Id<"usersTable">;
        if (!userid) {
            return NextResponse.json({ message: "Missing userid" }, { status: 400 });
        }
        // get user by id
        const user = await fetchQuery(api.users.getUserById, { id: userid });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        // remove password
        const foundUser = user;
        const userWithoutPassword = { ...foundUser, password: undefined };
        return NextResponse.json(userWithoutPassword, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: "Unknown error has occured" }, { status: 500 });
        }
    }
}
 


const UpdateUserSchemaValidation  = (bodyData: unknown) =>{
    const schema = z.object({
        id: z.string(),
        name: z.string().min(5, { message: "Too short, minimum is 5 characters" }),
        email: z.string().email({ message: "Invalid email" }),
        bio: z.string().min(10, { message: "Bio is required, at least 10 characters" }),
        
    })
    const result = schema.safeParse(bodyData)
    if (result.success) {
        return { valid: true, error: null }
    } else {
        return { valid: false, error: result.error.issues[0].message }
    }
}


// update an existing user 
export async function PATCH(request: NextRequest) {
    try {
        const bodyData = await request.json();
        // validate body
        const { valid, error } = UpdateUserSchemaValidation(bodyData);
        if (!valid) {
            return NextResponse.json({ message: error }, { status: 400 })
        }
        // TODO: Check if this user is the logged in user 


        const updatedUser = await fetchMutation(api.users.updateUser, bodyData);
        if (!updatedUser) {
            return NextResponse.json({ message: `Failed to update user` }, { status: 400 })
        }
        return NextResponse.json({ message: `Updated user!` }, { status: 201 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ message: "Unknown error has occured" }, { status: 500 })
        }
    }
}