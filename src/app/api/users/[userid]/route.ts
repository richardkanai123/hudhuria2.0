// get user
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { NextRequest, NextResponse } from "next/server";
import { Id } from "../../../../../convex/_generated/dataModel";
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
 



// update an existing user 
// export async function PUT(request: NextRequest) {
//     try {
//         const bodyData = await request.json();
//         // validate body
//         const { valid, error } = validateUserSchema(bodyData);
//         if (!valid) {
//             return NextResponse.json({ message: error }, { status: 400 })
//         }
//         // update user
//         const updatedUser = await fetchMutation(api.users.updateUser, bodyData);
//         if (!updatedUser) {
//             return NextResponse.json({ message: `Failed to update user` }, { status: 400 })
//         }
//         revalidatePath('/')
//         return NextResponse.json({ message: `Updated user!` }, { status: 201 })
//     } catch (error) {
//         if (error instanceof Error) {
//             return NextResponse.json({ message: error.message }, { status: 500 })
//         } else {
//             return NextResponse.json({ message: "Unknown error has occured" }, { status: 500 })
//         }
//     }
// }