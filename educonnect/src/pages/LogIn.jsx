import { useState } from "react"
import { Eye, EyeOff } from 'lucide-react'
import logo from "../assets/educonnect-logo.png"
import { Routes, Route, Link, BrowserRouter } from "react-router-dom"
import InputField from "../components/InputField"
import googleIcon from "../assets/google-icon.png"
import appleIcon from "../assets/apple-icon.png"


export default function LogIn(){
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
            email: "",
            password: "",
        })
        const [errors, setErrors] = useState({})
        const [loading, setLoading] = useState(false)

    const getFieldError = (name, value) =>{
        let error = "" ;
        if (name === "email"){
            if (!value.trim()) error = "This field is required.";
        }
        if (name === "password"){
            if (!value) error = "This field is required." 
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
   
    const getFormData =(event)=>{
        event.preventDefault()
        // const formData = new FormData(event.target)
        // const email = formData.get("email")
        // const password = formData.get("password")

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
        console.log("passed local errors")
        setLoading(true)
        logInUser(formData)
    }

    const API_URL = "http://localhost:5500/auth/user";

    async function logInUser(logInInfo) {
        try {
            const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(logInInfo),
            });

            // Check if the response is OK
            if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
            }

            // Parse the response JSON
            const result = await response.json();

            console.log("Signup successful:", result);
            setLoading(false)
            // You can display a success message or redirect the user
            alert("Account created successfully!");

            return result;
        } catch (error) {
            setLoading(false)
            console.error("Signup failed:", error.message);
            alert("Signup failed. Please try again.");
        }
    }
    return(
        <section className="flex w-full font-sans min-h-dvh flex-col justify-center items-center text-white">
            <span></span>
           <span>
            <img src={logo} alt="Logo" className="w-40" />
            {/* <span className="text-3xl my-2 text-blue-500 font-bold glow-text">Edu</span>
            <span className="text-3xl my-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-blue-500 to-cyan-400 glow-text">Connect</span> */}
          </span> 
            <h1 className="text-2xl/8 m-5">Welcome Back!</h1>
            <form 
                onSubmit={getFormData}
                className="flex flex-col justify-center w-full max-w-sm mx-auto p-4 relative">
                <label htmlFor="email" className="text-sm text-left text-gray-300">Email or Username</label>                
                <InputField 
                    type="text" 
                    id="email" 
                    placeholder="johndoe@educon.com"
                    name="email"
                    error={errors.email}
                    onChange={handleChange}
                    // className="bg-gray-900 placeholder:text-sm text-sm mb-7 mt-1 w-full border-gray-700 border-2 rounded-lg h-11 outline-0 p-2 "
                     />
                <label htmlFor="password" className="text-sm mt-7 text-left text-gray-300">Password</label>
                <span className=" relative">
                    <InputField 
                        type={showPassword ? "text" : "password"} 
                        id="password" 
                        placeholder="*******" 
                        name="password"
                        error={errors.password}
                        onChange={handleChange}
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
                <a href="#" className="text-sm text-sky-700 text-right hover:underline hover:text-sky-500 ">Forgotten Password</a>
                <button className="mt-5 w-full text-center bg-sky-700 hover:bg-sky-600 shadow-md/10 shadow-sky-500 rounded-lg p-2 cursor-pointer">
                {loading ? "Logging In. . ." : "Log In"}
                </button>
                <p className="text-sm text-gray-500 text-right font-bold pt-1 account-text ">Don't have an account?{" "} 
                    <Link to="/SignUp" className="text-sm text-sky-700 text-right hover:underline hover:text-sky-500 ">Sign Up</Link></p>
            </form>
            <p className="bg-gray-950 text-gray-600 text-[0.8em]/7 translate-y-3.5 px-1">OR LOGIN WITH</p>
            <hr className="text-slate-600 min-w-70"/>
            <div className="flex gap-1 mt-6 justify-center min-w-70">
                <button className="flex justify-center gap-2 mx-1 grow bg-gray-700 hover:bg-gray-600 shadow-md/10 rounded-lg p-1.5 cursor-pointer">
                    <img src={googleIcon} alt="" className="size-6 "/>
                    <span>Google</span>
                </button>
                <button className="flex justify-center gap-2 mx-1 grow bg-gray-700 hover:bg-gray-600 shadow-md/10 rounded-lg p-1.5 cursor-pointer">
                    <img src={appleIcon} alt="" className="size-6 "/>
                    <span>Apple</span>
                </button>
            </div>
        </section>
    )
}