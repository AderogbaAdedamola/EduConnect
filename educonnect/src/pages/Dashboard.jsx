import { useAuth } from "../context/AuthContext"
import useRefreshToken from "../hooks/useRefresh"
import { useEffect } from 'react';
import StatCard from '../components/Dashboard/StatCard';
import ResponseTrends from '../components/Dashboard/ResponseTrends';
import AssignmentCard from '../components/Dashboard/NeededAttention';
import Recents from '../components/Dashboard/Recents';
import Button from '../components/UI/Button';
import Icon from '../components/common/Icon';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import BottomNav from '../components/Layout/BottomNav';
import { Share2, MessageSquare, Sparkles, TrendingUp, Copy, ExternalLink, Users, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from "../api/port"
import RenderNeededAttention from "../components/Dashboard/RenderNeededAttention"


const DashboardBody = () => {
    const { user, accessToken, darkMode, setDarkMode } = useAuth()
    const refresh = useRefreshToken()
    useEffect(() =>{
        const getData = async () => {
           try{
                const response = await api.get("/auth/user",
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
    const assignments = [
        {
        title: 'Biology 101',
        subtitle: 'Cell Structure • Essay',
        icon: 'biotech',
        iconColor: 'indigo',
        status: { text: 'Urgent', color: 'red' },
        progress: 48,
        progressLabel: '12/25 Graded',
        buttonText: 'Grade Now',
        buttonVariant: 'primary',
        },
        {
        title: 'World History',
        subtitle: 'The Great Depression • Quiz',
        icon: 'public',
        iconColor: 'amber',
        status: { text: 'New', color: 'orange' },
        progress: 16,
        progressLabel: '5/30 Submissions',
        buttonText: 'Grade Now',
        buttonVariant: 'primary',
        },
        {
        title: 'Perspective Drawing',
        subtitle: 'Vanishing Points • Final',
        icon: 'architecture',
        iconColor: 'emerald',
        progress: 93,
        progressLabel: '28/30 Graded',
        buttonText: 'View Results',
        buttonVariant: 'secondary',
        },
    ]
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
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Stats Cards */}
            <div className="xl:col-span-5 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-4">
            {/* Stats */}
            {renderStats }
            
            </div>

            {/* Response Trend */}
            <div className="xl:col-span-7">
            <ResponseTrends />
            </div>
        </section>

        {/* Needs Attention Section */}
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <AlertCircle className="text-orange-500" />
                Questions Needing Your Attention
                </h2>
                <button className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                View All
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Needed Attention Question */}
                <RenderNeededAttention />
            </div>
      </div>

        {/* Recents Section */}
        <section>
            <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recents</h2>
            <div className="flex items-center gap-4">
                <button className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <Icon name="filter_list" className="text-slate-600 dark:text-slate-300" />
                </button>
            </div>
            </div>

            <Recents />
        </section>
        </div>
    );
    };



  function Dashboard() {
    const { user, darkMode, setDarkMode } = useAuth()

    return (
        <div className={`min-h-screen flex ${darkMode ? 'dark' : ''}`}>
        <div className="flex flex-col lg:flex-row w-full">
            <Sidebar />
            <main className="flex-1 lg:ms-64 mb-10  lg:mb-0 overflow-y-auto custom-scrollbar bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <DashboardBody />
            </main>
            <BottomNav />
        </div>
        </div>
    );
    }

    export default Dashboard;