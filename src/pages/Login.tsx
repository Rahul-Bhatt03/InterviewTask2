import { useState } from "react"
import { Mail, Lock, LogIn, Github, Twitter } from "lucide-react"
import { PasswordUi } from "../components/ui/Password"
import { EmailUi } from "../components/ui/Email"

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [hidePass, setHidePass] = useState(true)
    const [rememberMe, setRememberMe] = useState(false)

    const togglePass = () => {
        setHidePass(!hidePass)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Login logic here
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
                        <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
                            <LogIn size={32} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                        <p className="text-blue-100 mt-2">Sign in to your account</p>
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <EmailUi email={email} />
                            
                            <PasswordUi 
                                password={password} 
                                showPass={hidePass} 
                                onToggle={togglePass}
                            />

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Sign In
                            </button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            {/* Social login */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 px-4 rounded-lg border border-gray-300 transition-colors"
                                >
                                    <Github size={20} />
                                    <span>GitHub</span>
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 px-4 rounded-lg border border-blue-300 transition-colors"
                                >
                                    <Twitter size={20} />
                                    <span>Twitter</span>
                                </button>
                            </div>

                            <div className="text-center text-sm text-gray-600">
                                Don't have an account?{" "}
                                <a href="/signup" className="font-semibold text-blue-600 hover:text-blue-800">
                                    Sign up
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}