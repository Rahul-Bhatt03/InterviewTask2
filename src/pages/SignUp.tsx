import { useState } from "react"
import { UserPlus, Check, Github, Twitter } from "lucide-react"
import { NameUi } from "../components/ui/Name"
import { EmailUi } from "../components/ui/Email"
import { PasswordUi } from "../components/ui/Password"
import { signupSchema, validateField } from "../validation/schemas"
import { useRegisterUserMutation } from "../hooks/Auth.hooks"

export const SignUp = () => {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [hidePass, setHidePass] = useState(true)
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [register] = useRegisterUserMutation()

    const togglePass = () => {
        setHidePass(!hidePass)
    }

    const validateFieldHandler = async (field: string, value: any) => {
        const error = await validateField(signupSchema, field, value)
        setErrors(prev => ({ ...prev, [field]: error || '' }))
    }
    const resetForm = () => {
        setEmail("")
        setFullName("")
        setPassword("")
        setAgreeTerms(false)
        setErrors({})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await register({ name:fullName, email, password })
        resetForm()
        alert("User Registered Successfully");
    }

    const passwordRequirements = [
        { text: "At least 8 characters", met: password.length >= 8 },
        { text: "Contains uppercase letter", met: /[A-Z]/.test(password) },
        { text: "Contains lowercase letter", met: /[a-z]/.test(password) },
        { text: "Contains number", met: /\d/.test(password) },
        { text: "Contains special character", met: /[@$!%*?&]/.test(password) },
    ]

    return (
        <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-linear-to-r from-emerald-600 to-teal-600 p-8 text-center">
                        <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6">
                            <UserPlus size={40} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">Create Account</h1>
                        <p className="text-emerald-100 mt-2">Join our community today</p>
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <NameUi
                                        name={fullName}
                                        label="Full Name"
                                        onChange={(e) => {
                                            setFullName(e.target.value)
                                            validateFieldHandler('fullName', e.target.value)
                                        }}
                                    />
                                    {errors.fullName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                                    )}
                                </div>
                                <div>
                                    <EmailUi
                                        email={email}
                                        label="Email Address"
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                            validateFieldHandler('email', e.target.value)
                                        }}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <PasswordUi
                                        password={password}
                                        showPass={hidePass}
                                        onToggle={togglePass}
                                        label="Password"
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                            validateFieldHandler('password', e.target.value)
                                        }}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                    )}

                                    <div className="mt-4 space-y-2">
                                        {passwordRequirements.map((req, index) => (
                                            <div key={index} className="flex items-center text-sm">
                                                <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${req.met ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                                                    {req.met && <Check size={10} className="text-white" />}
                                                </div>
                                                <span className={req.met ? 'text-emerald-600' : 'text-gray-500'}>
                                                    {req.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                    className="h-4 w-4 text-emerald-600 rounded focus:ring-emerald-500 mt-1"
                                />
                                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                    I agree to the{" "}
                                    <a href="#" className="text-emerald-600 hover:text-emerald-800 font-medium">
                                        Terms & Conditions
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="text-emerald-600 hover:text-emerald-800 font-medium">
                                        Privacy Policy
                                    </a>
                                </label>
                                {errors.agreeTerms && (
                                    <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={!agreeTerms}
                                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                            >
                                Create Account
                            </button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">Or sign up with</span>
                                </div>
                            </div>

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
                                Already have an account?{" "}
                                <a href="/login" className="font-semibold text-emerald-600 hover:text-emerald-800">
                                    Sign in
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}