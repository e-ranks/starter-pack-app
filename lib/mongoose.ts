/* eslint-disable */
import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) throw new Error("Missing MONGODB_URI environment variable")

let cached = (global as any).mongoose

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        console.log("[DEBUG] Using cached MongoDB connection")
        return cached.conn
    }

    if (!cached.promise) {
        console.log("[DEBUG] Connecting to MongoDB...")
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        })
    }

    try {
        cached.conn = await cached.promise
        console.log("[DEBUG]  MongoDB connected successfully")
    } catch (error) {
        console.error("[ERROR]  MongoDB connection failed:", error)
        cached.promise = null
        throw error
    }

    return cached.conn
}

export default dbConnect
