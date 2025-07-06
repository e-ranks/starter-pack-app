'use client'

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card"
import { redirect } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import { signIn, getSession } from "next-auth/react"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [checkingSession, setCheckingSession] = useState<boolean>(true)

    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession()

            if (session) {
                const path = session.user.defaultPath || '/'
                return redirect(path)
            }

            return setCheckingSession(false)
        }

        checkSession()
    }, [])

    const handleLogin = async () => {
        const res = await signIn('credentials', {
            redirect: false,
            name,
            password
        })

        if (res?.ok) {
            const session = await getSession()
            const defaultPath = session?.user?.defaultPath
            return redirect(defaultPath || '/')
        }
        alert(res?.error)
    }

    if (checkingSession) return null

    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <div className="w-[400px] h-[400px] ">
                <Card>
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>
                            Enter your name below to login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Name</Label>
                                    <Input

                                        id="name"
                                        type="text"
                                        placeholder="William James Morriarty"
                                        onChange={(e) => setName(e.target?.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="*******"
                                        onChange={(e) => setPassword(e.target?.value)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-3 mt-4">
                                    <Button
                                        onClick={handleLogin}
                                        type="button"
                                        className="w-full cursor-pointer"
                                    >
                                        Login
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="/auth/register" className="ml-2 font-medium">
                                    Sign up
                                </a>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
