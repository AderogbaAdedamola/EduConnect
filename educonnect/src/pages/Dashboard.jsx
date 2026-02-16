import { useAuth } from "../context/AuthContext"
import useRefreshToken from "../hooks/useRefreshToken"
import { useEffect } from 'react';
import StatCard from '../components/Dashboard/StatCard';
import ResponseTrends from '../components/Dashboard/ResponseTrends';
import RenderRecents from '../components/Dashboard/RenderRecents';
import Button from '../components/UI/Button';
import Icon from '../components/common/Icon';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import BottomNav from '../components/Layout/BottomNav';
import { Share2, MessageSquare, Sparkles, TrendingUp, Copy, ExternalLink, Users, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from "../api/port"
import RenderNeededAttention from "../components/Dashboard/RenderNeededAttention"


const DashboardBody = () => {
    const { user, accessToked} = useAuth()
    const { refresh } = useRefreshToken()
    useEffect(() =>{
        const getData = async () => {
           try{
                const response = await api.get("/profile",
                {
                    headers:{
                        Authorization: `Bearer ${accessToken}`
                    }
                })

                console.log("successful")
                console.log(response.data)
            }catch(error){
              console.error("Error :", error.response?.data || error.message )
            }
        }
        getData()
    }, [])
    
    const stats = [
    { 
      title: "Questions Created", 
      value: "12", 
      icon: MessageSquare,
      trend: "+3 this week",
      color: "bg-blue-500"
    },
    { 
      title: "Answers Given", 
      value: "47", 
      icon: CheckCircle2,
      trend: "8 pending review",
      color: "bg-green-500"
    },
    { 
      title: "AI Responses", 
      value: "89", 
      icon: Sparkles,
      trend: "AI helping you",
      color: "bg-purple-500"
    },
    { 
      title: "Engagement", 
      value: "94%", 
      icon: TrendingUp,
      trend: "Great activity!",
      color: "bg-orange-500"
    },
  ]
  const renderStats = stats.map((stat, index) =>{
    return(
        <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            // iconColor="blue"
            trend={stat.trend}
        />
    )
  })

    return (
        <div className="px-8 font-sans pb-12 space-y-8 max-w-7xl mx-auto">
            {/* Stats & Chart Section */}
            <section className="grid grid-cols-1 gap-6">
                {/* Stats Cards */}
                <div className="xl:col-span-5 w-full grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                    {/* Stats */}
                    {renderStats }
                </div>

                {/* Response Trend */}
                {/* <div className="xl:col-span-7">
                <ResponseTrends />
                </div> */}
            </section>

            {/* Needs Attention Section */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <AlertCircle className="text-orange-500" />
                        Questions Needing Your Attention
                    </h2>
                    <button className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                            onClick={() => refresh()}>
                    View All
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Needed Attention Question */}
                    <RenderNeededAttention />
                </div>
        </section>

            {/* Recents Section */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Clock className="text-blue-500" />
                    Recent Activity
                </h2>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                    {/* Recents Activities */}
                    <RenderRecents />
                </div>
            </section>
            {/* Quick Actions */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-linear-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl">
                <Share2 size={32} className="mb-4" />
                <h3 className="text-xl font-bold mb-2">Share a Question</h3>
                <p className="text-blue-100 mb-4">Create and share questions with your study group or audience</p>
                <button className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                    Get Started
                </button>
                </div>

                <div className="bg-linear-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl">
                <MessageSquare size={32} className="mb-4" />
                <h3 className="text-xl font-bold mb-2">Answer Questions</h3>
                <p className="text-purple-100 mb-4">Help others by answering questions in your expertise area</p>
                <button className="bg-white text-purple-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
                    Browse Questions
                </button>
                </div>
            </section>
        </div>
    );
    };



  function Dashboard() {
    const { user, theme} = useAuth()

    return (
        <div className={`min-h-screen flex ${theme === "dark" ? 'dark' : ''}`}>
        <div className="flex flex-col lg:flex-row w-full">
            <Sidebar />
            <main className="flex-1 lg:ms-64 mb-10  lg:mb-0 overflow-y-auto custom-scrollbar bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
            <Header />
            <DashboardBody />
            </main>
            <BottomNav />
        </div>
        </div>
    );
    }

    export default Dashboard;