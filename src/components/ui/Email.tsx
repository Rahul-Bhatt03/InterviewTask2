import { Mail } from "lucide-react"

interface Email {
    email: string
    label?: string
}

export const EmailUi = ({ email, label = "Email Address", onChange }: Email & { onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Mail size={18} className="text-gray-400" />
                </div>
                <input
                    value={email}
                    type="email"
                    placeholder="Enter your email"
                    onChange={onChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
            </div>
        </div>
    )
}