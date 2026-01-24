import { useState } from "react"
import { Eye, EyeOff } from 'lucide-react'
import logo from "../assets/educonnect-logo.png"
import { Routes, Route, Link, BrowserRouter, useNavigate, useLocation } from "react-router-dom"
import InputField from "../components/InputField"
import googleIcon from "../assets/google-icon.png"
import appleIcon from "../assets/apple-icon.png"
import { api } from "../api/port"
import { useAuth } from "../context/AuthContext"
import Notification from "../components/Notification"


export default function LogIn(){
    const { setUser, setAccessToken } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
            email: "",
            password: "",
        })
    const [notification, setNotification] = useState({
                message: "",
                type : "",
            })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/dashboard"

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

    async function logInUser(logInInfo) {
        try {
            const response = await api.post("/auth/user", logInInfo,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
            );

            // console.log("Signup successful:", response.data);
            setNotification({
                message: "Log In Successful!",
                type: "success"
            })
            setFormData({
                email: "",
                password: "",
            })
            setUser(response.data.user)
            setAccessToken(response.data.accessToken)
            localStorage.setItem("user", JSON.stringify(response.data.user))
            console.log(response.data.accessToken)
            setTimeout(() => navigate(from, { replace:true }),2000)
        } catch (error) {
            console.error("Login Error:", error);

            if (error.response) {
                const status = error.response.status;
                const messageFromServer = error.response.data?.message;

                console.error("Server Error:", status, messageFromServer);
                setNotification({
                    message: `${"Server Error:", status, messageFromServer}`,
                    type: "error"
                })

                if (status === 400) {
                setNotification({
                    message: `${messageFromServer || "Please check your credentials."}`,
                    type: "error"
                })
                } else if (status === 401) {
                setNotification({
                    message: `${messageFromServer || "Incorrect email or password."}`,
                    type: "error"
                })
                } else if (status === 403) {
                setNotification({
                    message: `${messageFromServer || "Access denied."}`,
                    type: "error"
                })
                } else if (status === 404) {
                setNotification({
                    message: `${messageFromServer || "Not found. Please try again later."}`,
                    type: "error"
                })
                } else if (status >= 500) {
                setNotification({
                    message: "Please Check your internet connection or try again later.",
                    type: "warning"
                })
                } else {
                setNotification({
                    message: `${messageFromServer || "An unexpected error try again later."}`,
                    type: "error"
                })
                }
            }

            else if (error.request) {
                console.error("No Response:", error.request)
                setNotification({
                    message: "Check your internet connection or try again.",
                    type: "error"
                })
            }

            else {
                console.error("Unexpected Error:", error.message)
                setNotification({
                    message: "Something went wrong while processing your login. Please try again.",
                    type: "error"
                })
            }

        } finally {
        setLoading(false);
        }

    }
    return(
        <>
             <Notification 
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification({message : "", type: ""})}/>

            <section className="flex w-full font-sans min-h-dvh flex-col justify-center items-center text-slate-800 dark:text-white">
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
                    <label htmlFor="email" className="text-sm text-left text-gray-500 dark:text-gray-300">Email or Username</label>                
                    <InputField 
                        type="text" 
                        id="email" 
                        placeholder="Email e.g johndoe@educon.com"
                        name="email"
                        error={errors.email}
                        onChange={handleChange}
                        value={formData.email}
                        // className="bg-gray-900 placeholder:text-sm text-sm mb-7 mt-1 w-full border-gray-700 border-2 rounded-lg h-11 outline-0 p-2 "
                        />
                    <label htmlFor="password" className="text-sm mt-7 text-left text-gray-500 dark:text-gray-300">Password</label>
                    <span className=" relative">
                        <InputField 
                            type={showPassword ? "text" : "password"} 
                            id="password" 
                            placeholder="*******" 
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
                    <Link to="/forget-password" className="text-sm text-sky-700 text-right hover:underline hover:text-sky-500 ">Forgotten Password</Link>
                    <button className="mt-5 w-full text-center bg-sky-500 dark:bg-sky-700 hover:bg-sky-400 dark:hover:bg-sky-600 shadow-md/10 shadow-sky-500 rounded-lg p-2 cursor-pointer">
                    {loading ? "Logging In. . ." : "Log In"}
                    </button>
                    <p className="text-sm text-gray-800 dark:text-gray-500 text-right font-bold pt-1 account-text ">Don't have an account?{" "} 
                        <Link to="/SignUp" className="text-sm text-sky-700 text-right hover:underline hover:text-sky-500 ">Sign Up</Link></p>
                </form>
                <p className="bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 text-slate-600 dark:text-slate-100 text-[0.8em]/7 translate-y-3.5 px-1">OR LOGIN WITH</p>
                <hr className="text-slate-600 dark:text-slate-100 min-w-70"/>
                <div className="flex gap-1 mt-6 justify-center min-w-70">
                    <button className="flex justify-center gap-2 mx-1 grow bg-gray-200 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-md/10 rounded-lg p-1.5 cursor-pointer">
                        <img src={googleIcon} alt="" className="size-6 "/>
                        <span>Google</span>
                    </button>
                    <button className="flex justify-center gap-2 mx-1 grow bg-gray-200 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-md/10 rounded-lg p-1.5 cursor-pointer">
                        <img src={appleIcon} alt="" className="size-6 "/>
                        <span>Apple</span>
                    </button>
                </div>
            </section>
        </>
    )
}