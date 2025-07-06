import mongoose from "mongoose"
import { IUser } from "@/interfaces/models/IUser"

const userSchema = new mongoose.Schema<IUser>(
    {
        image: { type: String },
        role: { type: String, },
        name: { type: String, required: true },
        email: { type: String},
        password: { type: String, required: true },
        isActive: { type: String, default: 'active' },
        allowedPaths: { type: [String], default: [] },
        defaultPath: { type: String,},
    },
    {
        timestamps: true
    }
)

export default mongoose.models.User || mongoose.model('User', userSchema)