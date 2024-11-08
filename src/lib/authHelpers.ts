'use server'
import { signIn as NextAuthSignIn, signOut as NextAuthSignOut } from "@/Auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import { z } from "zod"

export async function SignInUser(email: string, password: string) {

   
    try {
        await NextAuthSignIn('credentials', { email, password })
        redirect('/')
        return { error: null }
    
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: error.message }
                case 'AccessDenied':
                    return { error: 'Access denied for this user' }
                case 'AccountNotLinked':
                    return { error: 'Account not linked' }
                case 'InvalidCheck':
                    return { error: 'Invalid check' }
                case 'MissingAdapter':
                    return { error: 'Missing adapter' }
            }
        }

        throw error
   
    }
}

export async function signOutUser() {
    await NextAuthSignOut().then(() => {
        
        redirect('/login')
    })
}

export const LoginUserByCredentials = async (data: { email: string, password: string }) => {
    
    // check if email and password are valid
    const emailAndPasswordSchema = z.object({
         email: z.string().email({ message: "Invalid email" }),
        password: z
            .string()
            .min(1, { message: "Password is required" })
            .min(6, { message: "Password must be at least 6 characters" }),
    })

    // validate inputs using schema
    const isValid = emailAndPasswordSchema.safeParse(data)
    // console.log(`isValid: ${isValid.success, isValid.error?.message}`)
    console.log(`isValid: ${isValid}`)

    if (!isValid.success) {
        //    loop through errors and return them with the first error and respective paths and messages
        // isValid.error.issues[0].message
        return { error: `  ${isValid.error.issues[0].path}: ${isValid.error.issues[0].message} ` }
    }
    
    try {
        console.log(data)
        await NextAuthSignIn('credentials', {
            email: data.email,
            password: data.password
        }).then(() => {
            redirect('/')
        })

        return { error: null }
    
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid email or password' }
                case 'AccessDenied':
                    return { error: 'Access denied for this user' }
                case 'AccountNotLinked':
                    return { error: 'Account not linked' }
                case 'InvalidCheck':
                    return { error: 'Invalid check' }
            }
        }

        throw error
    }
}
