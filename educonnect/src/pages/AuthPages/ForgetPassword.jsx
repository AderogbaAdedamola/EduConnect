import { useState, useEffect } from "react"
import { Eye, EyeOff, ChevronLeft, Mail, Lock, ShieldCheck } from 'lucide-react'
import logo from "../../assets/educonnect-logo.png"
import { Link, useNavigate } from "react-router-dom"
import InputField from "../../components/InputField"
import { api } from "../../api/port"
import Notification from "../../components/Notification"

export default function ForgotPassword() {
    const navigate = useNavigate()
    const [step, setStep] = useState(1) 
    const [loading, setLoading] = useState(false)
    const [resending, setResending] = useState(false) 
    const [showPassword, setShowPassword] = useState(false)
    const [notification, setNotification] = useState({ message: "", type: "" })

    const [timeLeft, setTimeLeft] = useState(60)

    const [formData, setFormData] = useState({
        email: "",
        otp: ["", "", "", "", "", ""], 
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }))
    }

    const handleResendOtp = async () => {
        if (timeLeft > 0 || resending) return;
        
        setResending(true);
        try {
            await api.post("/auth/resend-otp", { email: formData.email });
            setNotification({ message: "A new code has been sent!", type: "success" });
            setTimeLeft(60);
        } catch (err) {
            setNotification({ message: "Failed to resend code", type: "error" });
        } finally {
            setResending(false);
        }
    };

    const handleOtpChange = (value, index) => {
        if (value.length > 1) {
            const pastedData = value.split("").slice(0, 6);
            const newOtp = [...formData.otp];
            pastedData.forEach((char, i) => {
                if (!isNaN(char)) newOtp[i] = char;
            });
            setFormData(prev => ({ ...prev, otp: newOtp }));
            const nextIndex = Math.min(pastedData.length, 5);
            const nextEl = document.getElementById(`otp-${nextIndex}`);
            if (nextEl) nextEl.focus();
            return;
        }

        if (isNaN(value)) return;
        const newOtp = [...formData.otp];
        newOtp[index] = value;
        setFormData(prev => ({ ...prev, otp: newOtp }));

        if (value && index < 5) {
            const nextEl = document.getElementById(`otp-${index + 1}`);
            if (nextEl) nextEl.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
            const prevEl = document.getElementById(`otp-${index - 1}`);
            if (prevEl) prevEl.focus();
        }
    };

    const handleRequestReset = async (e) => {
        e.preventDefault();
        if (!formData.email) return setErrors({ email: "Email is required" });
        setLoading(true);
        try {
            await api.post("/auth/forgot-password", { email: formData.email });
            setNotification({ message: "Reset code sent!", type: "success" });
            setStep(2);
            setTimeLeft(60);
        } catch (err) {
            setNotification({ message: "Check email or server connection", type: "error" });
        } finally { setLoading(false); }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        const otpString = formData.otp.join("");
        if (otpString.length < 6) return setNotification({ message: "Enter full code", type: "warning" });

        setLoading(true);
        try {
            await api.post("/auth/verify-otp", { email: formData.email, otp: otpString });
            setNotification({ message: "Code verified!", type: "success" });
            setStep(3);
        } catch (err) {
            setNotification({ message: "Invalid OTP code", type: "error" });
        } finally { setLoading(false); }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (formData.password.length < 8) return setErrors({ password: "Must be 8+ characters" });
        if (formData.password !== formData.confirmPassword) {
            return setErrors({ confirmPassword: "Passwords do not match" });
        }

        setLoading(true);
        try {
            await api.post("/auth/reset-password", { 
                email: formData.email, 
                otp: formData.otp.join(""), 
                password: formData.password 
            });
            setNotification({ message: "Password updated! Redirecting...", type: "success" });
            setTimeout(() => navigate("/dashboard"), 1500);
        } catch (err) {
            setNotification({ message: "Failed to update password", type: "error" });
        } finally { setLoading(false); }
    };

    return (
        <>
            <Notification 
                message={notification.message} 
                type={notification.type} 
                onClose={() => setNotification({ message: "", type: "" })} 
            />

            <div className="absolute top-6 right-6 md:right-12">
                <p className="text-sm font-semibold text-gray-500">
                    New here? <Link to="/SignUp" className="text-sky-600 hover:text-sky-500 font-bold ml-1">Create an account</Link>
                </p>
            </div>

            <section className="flex w-full font-sans min-h-dvh flex-col justify-center items-center text-slate-800 dark:text-white px-4">
                <img src={logo} alt="Logo" className="w-40 mb-10" />

                <div className="w-full max-w-sm">
                    <div className="text-center mb-8">
                        <div className="bg-sky-50 dark:bg-sky-900/20 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-sky-100 dark:border-sky-800">
                            {step === 1 && <Mail className="text-sky-500" size={28} />}
                            {step === 2 && <ShieldCheck className="text-sky-500" size={28} />}
                            {step === 3 && <Lock className="text-sky-500" size={28} />}
                        </div>
                        <h1 className="text-3xl font-bold">
                            {step === 1 && "Forgot password?"}
                            {step === 2 && "Check your email"}
                            {step === 3 && "Set new password"}
                        </h1>
                        <p className="text-base text-gray-500 mt-2">
                            {step === 1 && "No worries, we'll send you reset instructions."}
                            {step === 2 && <>We sent a code to <span className="font-semibold text-slate-800 dark:text-white">{formData.email}</span></>}
                            {step === 3 && "Your new password must be different."}
                        </p>
                    </div>

                    <form onSubmit={step === 1 ? handleRequestReset : step === 2 ? handleVerifyOtp : handleResetPassword}>
                        {step === 1 && (
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                <InputField type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} error={errors.email} />
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-in fade-in zoom-in duration-300">
                                <div className="flex justify-between gap-2 mb-6">
                                    {formData.otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`otp-${index}`}
                                            type="text"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(e.target.value, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            className="w-full aspect-square text-center text-2xl font-bold bg-zinc-200 dark:bg-zinc-800 border-2 border-transparent focus:border-sky-500 rounded-xl outline-none transition-all"
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-center text-gray-500">
                                    Didn't receive the email?{" "}
                                    <button 
                                        type="button" 
                                        onClick={handleResendOtp}
                                        className={`font-bold transition-all ${timeLeft === 0 && !resending ? "text-sky-600 hover:underline" : "text-gray-400 cursor-not-allowed"}`}
                                    >
                                        {resending ? "Sending..." : "Click to resend"}
                                    </button>
                                    {timeLeft > 0 && <span className="ml-1.5 text-xs text-sky-500 font-mono">({timeLeft}s)</span>}
                                </p>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4">
                                <div className="relative">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                                    <InputField type={showPassword ? "text" : "password"} name="password" placeholder="********" value={formData.password} onChange={handleChange} error={errors.password} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-400">
                                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                    </button>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                                    <InputField type="password" name="confirmPassword" placeholder="********" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
                                </div>
                            </div>
                        )}

                        <button 
                            disabled={loading}
                            className="mt-8 w-full bg-sky-500 hover:bg-sky-400 disabled:bg-sky-300 text-white font-bold rounded-lg py-3 transition-all shadow-lg shadow-sky-500/25 active:scale-[0.98]"
                        >
                            {loading ? "Processing..." : step === 3 ? "Reset password" : "Continue"}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-sky-600 transition-colors">
                            <ChevronLeft size={18} />
                            Back to log in
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}