import NextAuth, { NextAuthConfig, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { fetchQuery } from 'convex/nextjs';
import {api} from '../convex/_generated/api'
 import bcrypt from 'bcrypt'


const AuthOptions: NextAuthConfig = {
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        Credentials({
          credentials: {
                email: {},
              password:{}
            },
            authorize: async (credentials) : Promise<User | null> => {

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
                const userWithoutPassword = { ...user, password: undefined, _creationTime: undefined };
                return userWithoutPassword
            }
        })

    ],
    
    pages: {
        signIn: '/login',
        signOut: '/login',
        newUser: '/signup',
    }, 
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
            }
            return token
        },

        async session({ session, token }) {
            if (session?.user) {
                session.user.email = token.email as string
                session.user.id = token.id as string
                session.user.name = token.name as string
            }
            return session
        },

        signIn: async ({ user }) => {
            if (user) {
                return true
            }
            return false
        },
        redirect: async ({ url, baseUrl }) => {
            if (url.startsWith('/')) return `${baseUrl}${url}`
            return baseUrl
        }
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