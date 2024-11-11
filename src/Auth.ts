import NextAuth, { AuthError, NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { fetchQuery } from 'convex/nextjs';
import { api } from '../convex/_generated/api'
import bcrypt from 'bcrypt'



const baseUrl = process.env.NEXT_PUBLIC_URL as string

const AuthOptions: NextAuthConfig = {
    // basePath: baseUrl,
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials): Promise<any | null> => {

                try {
                    if (!credentials?.email || !credentials?.password) {
                        return null
                    }

                    const user = await fetchQuery(api.users.getUserByEmail, { email: credentials.email as string });
                    if (!user) {
                        return null
                    }

                    const passwordMatch = await bcrypt.compare(credentials.password as string, user.password);
                    if (!passwordMatch) {
                        return null
                    }

                    // remove password and _creationTime from user
                    const userWithoutPassword = { ...user, password: undefined };
                    return {
                        id: userWithoutPassword._id,
                        name: userWithoutPassword.name,
                        email: userWithoutPassword.email,
                        bio: userWithoutPassword.bio,
                        isAdmin: userWithoutPassword.isAdmin,
                        emailVerified: userWithoutPassword.isVerified
                    }
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

                }
            }
        })

    ],

    pages: {
        signIn: '/login',
        newUser: '/signup',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
                token.bio = user.bio
                token.isAdmin = user.isAdmin
                token.emailVerified = user.emailVerified as boolean
            }
            return token
        },

        async session({ session, token }) {
            if (session?.user) {
                session.user.email = token.email as string
                session.user.id = token.id as string
                session.user.name = token.name as string
                session.userId = token.id as string
                session.user.bio = token.bio as string
                session.user.isAdmin = token.isAdmin as boolean
            }
            return session
        },
    },
    session: {
        strategy: 'jwt'
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 15,
        // 15 days
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth(AuthOptions)