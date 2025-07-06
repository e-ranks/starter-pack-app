'use client'

import { Lock, ShieldOff } from 'lucide-react'

const Notfound: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="text-center space-y-4 animate-fade-in">
                <div className="flex justify-center animate-shake">
                    <ShieldOff className="w-16 h-16 text-red-500" />
                </div>
                <h1 className="text-3xl font-bold text-foreground">404 - Not Found</h1>
                <p className="text-muted-foreground">The page you are looking for does not exist.</p>
            </div>
        </div>
    )
}

export default Notfound