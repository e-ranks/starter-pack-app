import bcrypt from "bcryptjs"
import User from "@/models/User"
import dbConnect from "@/lib/mongoose"
import { apiHandler } from "@/lib/apiHandler"
import { NextRequest, NextResponse } from "next/server"

const handler = apiHandler().post(async (req: NextRequest): Promise<Response> => {
    const body = await req.json()
    const { name, email, password, role, isActive, allowedPaths, image, defaultPath } = body

    if (!name || !email || !password || !role || !isActive || !defaultPath) return NextResponse.json({
        message: `${name || email || password || role || isActive} is required`,
        status: false
    })

    try {
        await dbConnect()

        const userExists = await User.findOne({ name }).sort({ createdAt: 1 })

        if (userExists) return NextResponse.json(
            {
                status: false,
                message: 'User already exists',
                data: userExists
            },
            { status: 409 }
        )

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            role,
            email,
            image,
            isActive,
            defaultPath: `/${defaultPath}`,
            allowedPaths,
            password: hashedPassword,
        })

        return NextResponse.json(
            {
                status: true,
                message: 'User created successfully',
                data: user,
            },
            { status: 201, }
        )
    } catch (error: unknown) {
        console.log(`[DEBUG] AUTH/REGISTER | POST | ERROR | ${error}`)
        return NextResponse.json(
            {
                message: 'Internal Server Error',
                status: false
            },
            { status: 500 }
        )
    }
})

export const POST = handler.handle