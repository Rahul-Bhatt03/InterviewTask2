import { Eye, EyeClosed, Lock } from "lucide-react"

interface Pass {
    password: string
    showPass: boolean
    onToggle?: () => void
    label?: string
}

export const PasswordUi = ({ password, showPass, onToggle, label = "Password" }: Pass) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Lock size={18} className="text-gray-400" />
                </div>
                <input 
                    value={password}
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <button
                    type="button"
                    onClick={onToggle}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    {showPass ? <EyeClosed size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
    )
}