import { useEffect } from "react";
import { Routes, Route, Link, BrowserRouter, useLocation } from "react-router-dom"
import logo from "../assets/educon-logo.png"
import heroBg from "../assets/hero-bg.png"
import AOS from "aos"
import 'aos/dist/aos.css'
import BrainIcon from "../assets/head-brain.svg?react"

function LandingPage() {

  const location = useLocation()
  
  useEffect(() => {
    AOS.init({ 
      duration: 1000,
      once: true,
     });
  }, [])
  useEffect(() => {
    AOS.refresh();
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans text-white font-inter">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="size-7"/>
          <h1 className="text-lg font-semibold">EduConnect</h1>
        </div>
        <Link to="/LogIn">
          <button className="text-sm text-gray-300 hover:text-white transition">Log In</button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-12 space-y-10 lg:space-y-0">
        <div className="max-w-xl text-center lg:text-left space-y-4" 
            data-aos="fade-right">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Learn Together.{" "}
            <span className="text-blue-400">Grow Faster.</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Share questions with your study group, get instant AI-powered grading,
            and master concepts with collaborative explanations.
          </p>
          <div className="flex justify-center lg:justify-start space-x-4 pt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition">
                Get Started
              </button>
              {/* <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition">
                Create
              </button>
            <button className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500 text-blue-300 font-medium px-5 py-2 rounded-lg transition">
              Join a Group
            </button> */}
          </div>
        </div>
        <img
          data-aos="fade-left"
          src={heroBg}
          alt="study"
          className="w-64 md:w-80 rounded-xl lg:w-96 mx-auto"
        />
      </section>

      {/* Features Section */}
      <section className="px-6 lg:px-20 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            icon: <span className="material-symbols-outlined text-sm text-blue-500 font-bold">auto_awesome</span>,
            color: "bg-blue-500/70",
            title: "AI Grading & Explanations",
            text: "Get instant feedback on open-ended answers. Our AI breaks complex topics into simple explanations.",
          },
          {
            icon: <BrainIcon className="w-10 h-10 text-blue-500"/>,
            color: "bg-blue-500/70",
            title: "Peer Feedback",
            text: "Allow peers to comment on submissions. Learn from different perspectives and approaches.",
          },
          {
            icon: "🧾",
            color: "bg-blue-500/10",
            title: "Submission Collection",
            text: "Easily collect answers from a wide audience. Perfect for teachers, tutors, or curious minds.",
          },
          {
            icon: "📘",
            color: "bg-blue-500/70",
            title: "Study Group Collaboration",
            text: "Create question sets and share them instantly with your study group using simple links or QR codes.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            data-aos="fade-up"
            className="bg-gray-900/60 border-2 border-gray-800 p-6 rounded-2xl hover:border-blue-500 hover:scale-[1.02] transition duration-1000 ease-in-out"
          >
            <div className="text-3xl " >
              <span className={`p-1 rounded-full ${feature.color}`}>
                {feature.icon}
              </span>
              </div>
            <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-gray-400 text-sm">{feature.text}</p>
          </div>
        ))}
      </section>

      {/* Community Buzz */}
      {/* <section className="px-6 lg:px-20 py-10">
        <h2 className="text-2xl font-bold mb-6">Community Buzz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah J.",
              role: "Medical Student",
              time: "2 hours ago",
              review:
                "My study group uses this for anatomy quizzes. The AI explanations for why an answer is wrong are incredible!",
            },
            {
              name: "David M.",
              role: "Engineering Student",
              time: "4 hours ago",
              review:
                "It’s like having a tutor 24/7. Peer discussions really help solidify my understanding.",
            },
            {
              name: "Jane L.",
              role: "Tutor",
              time: "1 day ago",
              review:
                "Collecting and grading assignments is now effortless. EduConnect saves me hours every week.",
            },
          ].map((user, i) => (
            <div
              key={i}
              className="bg-gray-900/60 border border-gray-800 p-6 rounded-2xl hover:border-blue-500/40 transition"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-lg font-bold text-white">
                  {user.name[0]}
                </div>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-400">
                    {user.role} • {user.time}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">“{user.review}”</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="px-6 lg:px-20 py-14 text-center">
        <div 
          data-aos="fade-down"
          className="bg-gray-900/60 border-2 border-gray-800 p-10 rounded-2xl max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ready to ace your next exam?
          </h2>
          <p className="text-gray-400 mb-6" >
            Join students and tutors sharing knowledge on EduConnect.
          </p>
          <Link to="/signup">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-all">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 border-t border-gray-800">
        © {new Date().getFullYear()} EduConnect. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
