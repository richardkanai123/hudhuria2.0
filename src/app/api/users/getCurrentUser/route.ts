import { auth } from "@/Auth"
import { NextResponse } from "next/server"

export const GET = auth(async ({ auth }) => {
    const user = auth?.user

    if (!user) {
        return NextResponse.json({user: null}, {status:404})
    }
    return NextResponse.json({ user }, { status: 200 })
})