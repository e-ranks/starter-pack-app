import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Select from "@/components/select";
import { Button } from "@/components/ui/button";

export function Register({
    className,
    ...props
}: React.ComponentProps<'div'>) {

    return (
        <div className="flex flex-col flex-1  items-center justify-center">
            <div className="w-[400px] h-[400px]">
                <Card>
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>
                            Create an account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        placeholder="James"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Password</Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        placeholder="********"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Password</Label>
                                    <Select
                                        options={
                                            [
                                                { label: 'Admin', value: 'admin' },
                                                { label: 'Operator', value: 'operator' },
                                                { label: 'Guest', value: 'guest' }
                                            ]
                                        }
                                        placeholder="Select role"
                                    // onChange={(e) => console.log(e)}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Is Active</Label>
                                    <Select
                                        options={
                                            [
                                                { label: 'Active', value: 'active' },
                                                { label: 'Inactive', value: 'inactive' }
                                            ]
                                        }
                                        placeholder="Select status"
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Button
                                        type="submit"
                                        className="w-full"
                                    >
                                        Register
                                    </Button>
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Already have an account?
                                    <a href="/auth/login" className=" font-medium ml-2">
                                        Login
                                    </a>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}