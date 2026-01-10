import { useAuth } from "../context/AuthContext"
import useRefreshToken from "../hooks/useRefresh"

function Dashboard(){
    const { user } = useAuth()
    const refresh = useRefreshToken()
    return(
        <>
           <h1>Hi {user.firstname} the time is {new Date().getHours()}</h1> 
           <p>Your email is {user.email}.</p>
           <button onClick={() => refresh()} className="bg-white text-slate-900 rounded-lg border-slate-900 p-4 border"> 
                Refresh
            </button>
        </>
    )
}

export default Dashboard