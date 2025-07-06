'use client'

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card"
import React, { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')

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

    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <div className="w-[400px] h-[400px] ">
                <Card>
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
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
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a
                                            href="#"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target?.value)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Button
                                        onClick={handleLogin}
                                        type="button"
                                        className="w-full cursor-pointer"
                                    >
                                        Login
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        Login with Google
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="#" className="underline underline-offset-4">
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
