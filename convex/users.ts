import {  query,mutation } from "./_generated/server";
import { v } from "convex/values"


// get all users

export const getAllUsers = query(async (ctx) => { 

    const users = await ctx.db.query("usersTable").collect()

    return users
});


// create new User

export const AddNewUser = mutation({
    args: {
        // user schema here
        name: v.string(),
        email: v.string(),
        password: v.string(),
        bio: v.string(),
    },

    handler: async (ctx, args) => { 

        const user = await ctx.db.insert("usersTable", {
            name: args.name,
            email: args.email,
            password: args.password,
            bio: args.bio,
            isAdmin: false,
            isVerified: false,
        });

        return user
    }
})


// get user by id
export const getUserById = query({
    args: { id: v.id("usersTable") },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.id);
        return user;
    },
})