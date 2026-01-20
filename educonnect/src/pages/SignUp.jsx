import { useState } from "react"
import { Eye, EyeOff, Key } from 'lucide-react'
import logo from "../assets/educonnect-logo.png"
import { Link } from "react-router-dom"
import InputField from "../components/InputField"
import googleIcon from "../assets/google-icon.png"
import appleIcon from "../assets/apple-icon.png"
import { api } from "../api/port"
import { useNavigate } from "react-router-dom"

export default function SignUp(){
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const getFieldError = (name, value) =>{
        let error = "" ;
        if (name === "fullName") {
            if (!value.trim()) error = "Email is required."
            else if(value.trim().length < 5) error = "min. of 5 characters"
            else if(value.length > 100) error = "max. of 40 characters"
        }
        if (name === "email"){
            if (!value.trim()) error = "Email is required.";
            else if (!/\S+@\S+\.\S+/.test(value)) error = "Enter a valid email address."
        }
        if (name === "password"){
            if (!value) error = "password is required."
            else if(value.length < 8) error = "Password must be at least 8 characters." 
        }
        if (name === "confirmPassword" && formData.password && formData.password.length > 8 ){
            if(!value) error = "confirm your password"
            else if (value !== formData.password) error = "password do not match"
        }
        return error
    }
    const handleChange = (e)=>{
         const {name, value} = e.target
         setFormData(prev => {
            return ({...prev, [name]: value})
         })

         //clear error of that field when typing
         if(errors[name]){
            setErrors(prev => ({...prev, [name]:""}))
         }

    }
    const handleSubmit = (e)=>{
        e.preventDefault()

        const newErrors = {}
        Object.keys(formData).forEach((field) => {
            const err = getFieldError(field, formData[field]);
            if(err) newErrors[field] = err;
        })
        setErrors(newErrors)

        const hasLocalError = Object.values(newErrors).some((msg) => msg);
        if (hasLocalError) {
        return;
        }

        console.log("now ready to connect to API")

       const parts = formData.fullName.split(" ")
        const newUser={
            firstname: parts[0],
            lastname: parts.splice(1).join(" ") || "",
            email: formData.email,
            password: formData.password,
        }
        console.log(newUser)
        // Send sign-up data to the backend
        setLoading(true)
        signupUser(newUser)
        
        
    }

    // const API_URL = import.meta.env.VITE_API_URL 

    async function signupUser(newUser) {
        try {
            // POST request to /signup (baseURL is handled in axiosInstance)
            const response = await api.post("/auth", newUser);

            console.log("Signup successful:", response.data);
            alert("Account created successfully!");
            setFormData({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
            })
            
            navigate("/login")
            // return response.data;
        } catch (error) {
            console.error("Signup failed:", error);

            if (error.response) {
            // Server responded with a status outside 2xx
            console.error("Server error:", error.response.status, error.response.data);
            alert(error.response.data?.message || "Signup failed. Please try again.");
            } else if (error.request) {
            // No response received
            alert("Check your connection.");
            } else {
            // Something else went wrong
            alert("Unexpected error. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }
    return(
        <section className="flex font-sans min-h-dvh flex-col items-center">
            <h1 className="text-2xl/8 m-5">Create your account</h1>
            <p className="text-sm text-gray-800 dark:text-gray-500">Sign Up to get started</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-sm mx-auto p-4 ">
                 <InputField
                    type="text" 
                    placeholder="Full Name"
                    name="fullName"
                    error={errors.fullName}
                    onChange={handleChange}
                    value={formData.fullName}
                    />
                <InputField
                    type="Email" 
                    placeholder="Email e.g johndoe@educon.com"
                    name="email"
                    error={errors.email}
                    onChange={handleChange}
                    value={formData.email}
                    />
                <span className=" relative">
                    <InputField 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Password(min.8 chars)" 
                        name="password"
                        error={errors.password}
                        onChange={handleChange}
                        value={formData.password}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 rounded-full dark:hover:text-gray-300 transition-colors"
                            >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                    </button>
                </span>
                
                <InputField 
                    type="password"
                    placeholder="Confirm Password" 
                    name="confirmPassword"
                    error={errors.confirmPassword}
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    />
                <button className="my-5 w-full text-center bg-sky-500 dark:bg-sky-700 hover:bg-sky-400 dark:hover:bg-sky-600 shadow-md/10 shadow-sky-500 rounded-lg p-2 cursor-pointer">
                 {loading ? "Creating Account..." : "Create Account"}
                </button>
            </form>
            <p className="bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 dark:text-slate-100 text-slate-600 text-[0.8em]/7 translate-y-3.5 px-1">OR CONTINUE WITH</p>
            <hr className="dark:text-slate-100 text-slate-600 min-w-70"/>
            <div className="flex gap-1 mt-6 justify-center min-w-70">
                <button className="flex justify-center gap-2 mx-1 grow  text-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-md/10 rounded-lg p-1.5 cursor-pointer">
                    <img src={googleIcon} alt="" className="size-6 "/>
                    <span>Google</span>
                </button>
                <button className="flex justify-center gap-2 mx-1 grow text-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-md/10 rounded-lg p-1.5 cursor-pointer">
                    <img src={appleIcon} alt="" className="size-6 "/>
                    <span>Apple</span>
                </button>
            </div>
            <p className="text-sm w-70 mt-3 text-gray-800 dark:text-gray-500 text-right font-bold pt-1 account-text">Already a member? <Link to="/LogIn" className="text-sm text-sky-700 text-right hover:underline hover:text-sky-500 ">Sign In</Link></p>
        </section>
    )
}