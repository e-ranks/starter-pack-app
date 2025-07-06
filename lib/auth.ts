import { compare } from "bcryptjs"
import NextAuth, { AuthOptions } from "next-auth"

import User from "@/models/User"
import dbConnect from "./mongoose"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                name: { label: 'Name', type: 'name' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                await dbConnect()

                const user = await User.findOne({ name: credentials?.name })

                if (!user) throw new Error('User not found')
                if (!user.password) throw new Error('User has no password')

                const isPasswordValid = await compare(credentials!.password, user.password)
                if (!isPasswordValid) throw new Error('Invalid password')

                return {
                    id: user._id,
                    name: user.name,
                    role: user.role,
                    email: user.email,
                    image: user?.image,
                    defaultPath: user?.defaultPath,
                    allowedPaths: user?.allowedPaths
                }
            }
        })
    ],

    session: {
        strategy: 'jwt',
        maxAge: 3 * 60 * 60
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
                token.allowedPaths = user.allowedPaths
                token.defaultPath = user.defaultPath
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string
                session.user.defaultPath = token.defaultPath as string
                session.user.allowedPaths = token.allowedPaths as string[]
            }
            
            return session
        },
    },

    pages: {
        signIn: '/',
        error: '/auth/login'
    },

    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)