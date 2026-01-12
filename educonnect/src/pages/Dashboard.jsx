import { useAuth } from "../context/AuthContext"
import useRefreshToken from "../hooks/useRefresh"
import React from 'react';
import StatCard from '../components/Dashboard/StatCard';
import ResponseAnalytics from '../components/Dashboard/ResponseAnalytics';
import AssignmentCard from '../components/Dashboard/AssignmentCard';
import Recents from '../components/Dashboard/Recents';
import Button from '../components/UI/Button';
import Icon from '../components/common/Icon';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import BottomNav from '../components/Layout/BottomNav';


const DashboardBody = () => {
    const { user, darkMode, setDarkMode } = useAuth()
    const refresh = useRefreshToken()
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
    ];
//     { title: "Active Questions", value: "12", icon: "question_answer" },
//   { title: "Total Responses", value: "156", icon: "reply" },
//   { title: "Response Rate", value: "78%", icon: "trending_up" },
//   { title: "AI Evaluations", value: "124", icon: "smart_toy" },
    const stats = [
    { 
        title: "My Questions", 
        value: "8", 
        icon: "help_outline",
        description: "Questions you've asked"
    },
    { 
        title: "My Answers", 
        value: "24", 
        icon: "reply",
        description: "Responses you've given"
    },
    { 
        title: "AI Evaluations", 
        value: "18", 
        icon: "smart_toy",
        description: "Answers reviewed by AI"
    },
    { 
        title: "Community Score", 
        value: "92%", 
        icon: "trending_up",
        description: "Your answer accuracy"
    },
    ];

    return (
        <div className="px-8 pb-12 space-y-8 max-w-7xl mx-auto">
        {/* Stats & Chart Section */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Stats Cards */}
            <div className="xl:col-span-5 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-4">
                {/* <button onClick={() => refresh()} className="bg-white text-slate-900 rounded-lg fixed top-1 z-222  border-slate-900 p-1 border"> 
//                 Refresh
//             </button> */}
            <StatCard
                title={stats[0].title}
                value={stats[0].value}
                icon={stats[0].icon}
                iconColor="blue"
                trend={stats[0].description}
                trendColor="green"
            />
            <StatCard
                title={stats[1].title}
                value={stats[1].value}
                icon={stats[1].icon}
                iconColor="orange"
                trend={stats[1].description}
                trendColor="orange"
            />
            <StatCard
                title={stats[2].title}
                value={stats[2].value}
                icon={stats[2].icon}
                iconColor="emerald"
                trend={stats[2].description}
                trendColor="blue"
            />
            <StatCard
                title={stats[3].title}
                value={stats[3].value}
                icon={stats[3].icon}
                iconColor="purple"
                trend={stats[3].description}
                trendColor="purple"
            />
            </div>

            {/* Response Trend */}
            <div className="xl:col-span-7">
            <ResponseAnalytics />
            </div>
        </section>

        {/* Needs Attention Section */}
        <section>
            <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Needs Attention</h2>
            <button className="text-primary font-bold text-sm hover:underline">
                See All
            </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((assignment, index) => (
                <AssignmentCard key={index} {...assignment} />
            ))}
            </div>
        </section>

        {/* Recent Assignments Section */}
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
            <main className="flex-1 lg:ms-64 mb-10  lg:mb-0 overflow-y-auto custom-scrollbar bg-slate-50 dark:bg-[#0b0f19]">
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <DashboardBody />
            </main>
            <BottomNav />
        </div>
        </div>
    );
    }

    export default Dashboard;