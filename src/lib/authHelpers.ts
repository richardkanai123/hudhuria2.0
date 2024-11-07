'use server'
import { signIn as NextAuthSignIn, signOut as NextAuthSignOut } from "@/Auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

export async function SignInUser(formdata: FormData) {
    const email = formdata.get('email') as string
    const password = formdata.get('password') as string
    const credentials = { email, password }

    // check if email and password are not empty
    try {
        await NextAuthSignIn('credentials', credentials)
    
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

export async function signOutUser() {
    await NextAuthSignOut()
    redirect('/')
}


