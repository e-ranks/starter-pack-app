'use client'

import { Lock, ShieldOff } from 'lucide-react'

const Forbidden: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="text-center space-y-4 animate-fade-in">
                <div className="flex justify-center animate-shake">
                    <Lock className="w-16 h-16 text-red-500" />
                </div>
                <h1 className="text-3xl font-bold text-foreground">403 - Forbidden</h1>
                <p className="text-muted-foreground">
                    You do not have permission to access this page.
                </p>
            </div>
        </div>
    )
}

export default Forbidden
