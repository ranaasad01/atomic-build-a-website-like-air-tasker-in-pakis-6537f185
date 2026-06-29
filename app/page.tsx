"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, Star, Check, ArrowRight, Shield, Clock, Users, ChevronDown, Sparkles, Phone, CheckCircle } from 'lucide-react';
import {
  APP_NAME,
  APP_TAGLINE,
  APP_DESCRIPTION,
  TASK_CATEGORIES,
  PAKISTANI_CITIES,
  formatPKR,
  type TaskerProfile,
  type TaskListing,
} from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const FEATURED_TASKERS: TaskerProfile[] = [
  {
    id: "t1",
    name: "Ali Hassan",
    avatar: "https://m.media-amazon.com/images/M/MV5BOWRhNzgzMTAtYzFhMS00YWEwLWEwMzgtODhkYTI1OTNlNTViXkEyXkFqcGc@._V1_.jpg",
    city: "Karachi",
    skills: ["Plumbing", "Electrical", "Handyman"],
    rating: 4.9,
    reviewCount: 134,
    completedJobs: 210,
    hourlyRate: 1500,
    bio: "Certified handyman with 8 years of experience in plumbing and electrical work across Karachi.",
    verified: true,
  },
  {
    id: "t2",
    name: "Fatima Malik",
    avatar: "https://eva-personnel-service-prod-uploader.s3.us-west-2.amazonaws.com/advisorphoto/9810d1bf-472c-452b-a43a-2457e8e02b52/advisorphoto-MalikFatima-s-web-large.jpg",
    city: "Lahore",
    skills: ["Home Cleaning", "Deep Clean", "Office Cleaning"],
    rating: 4.8,
    reviewCount: 98,
    completedJobs: 175,
    hourlyRate: 1200,
    bio: "Professional cleaner specializing in deep cleaning and post-renovation cleanup in Lahore.",
    verified: true,
  },
  {
    id: "t3",
    name: "Usman Tariq",
    avatar: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/399700/399794.2.png",
    city: "Islamabad",
    skills: ["Tutoring", "Math", "Physics", "Chemistry"],
    rating: 5.0,
    reviewCount: 62,
    completedJobs: 88,
    hourlyRate: 2000,
    bio: "FSc and O-Level tutor with a track record of top results. Available in Islamabad and Rawalpindi.",
    verified: true,
  },
  {
    id: "t4",
    name: "Sana Riaz",
    avatar: "https://ochsner-craft.s3.amazonaws.com/imager/wwwdoctors/12168226/Sana-Riaz-MD-Headshot-1200x1200-e8564f8a7a.jpg",
    city: "Lahore",
    skills: ["Photography", "Events", "Portraits"],
    rating: 4.7,
    reviewCount: 45,
    completedJobs: 60,
    hourlyRate: 3500,
    bio: "Freelance photographer covering weddings, corporate events, and portrait sessions in Lahore.",
    verified: true,
  },
  {
    id: "t5",
    name: "Bilal Ahmed",
    avatar: "https://www.ncronline.org/files/styles/author_page_bio_photo_220x220_/public/2025-09/Headshot%20-%20Bilal%20Ahmed%20CROP.jpg?h=18dd8767&itok=0AfcHMYV",
    city: "Karachi",
    skills: ["IT Support", "Networking", "PC Repair"],
    rating: 4.9,
    reviewCount: 77,
    completedJobs: 120,
    hourlyRate: 2500,
    bio: "IT professional offering on-site and remote support for homes and small businesses in Karachi.",
    verified: false,
  },
  {
    id: "t6",
    name: "Nadia Khan",
    avatar: "https://upload.wikimedia.org/wikipedia/en/b/bb/Nadia_Khan_Show.jpg",
    city: "Rawalpindi",
    skills: ["Cooking", "Catering", "Meal Prep"],
    rating: 4.8,
    reviewCount: 53,
    completedJobs: 79,
    hourlyRate: 1800,
    bio: "Home chef specializing in traditional Pakistani cuisine and catering for small gatherings.",
    verified: true,
  },
];

const RECENT_TASKS: TaskListing[] = [
  {
    id: "l1",
    title: "Need AC servicing for 2 units",
    description: "Two split ACs need gas refill and full service before summer. Located in DHA Phase 5.",
    category: "handyman",
    budget: 4500,
    city: "Karachi",
    deadline: "2 days",
    bidCount: 7,
    postedAt: "1 hour ago",
    urgent: true,
  },
  {
    id: "l2",
    title: "Move furniture from Gulberg to Johar Town",
    description: "3-bedroom apartment move. Need 2 helpers and a pickup truck. Fragile items included.",
    category: "moving",
    budget: 12000,
    city: "Lahore",
    deadline: "3 days",
    bidCount: 4,
    postedAt: "3 hours ago",
    urgent: false,
  },
  {
    id: "l3",
    title: "O-Level Math tutor needed",
    description: "My daughter needs help with O-Level Math. 3 sessions per week, 1.5 hours each.",
    category: "tutoring",
    budget: 8000,
    city: "Islamabad",
    deadline: "Ongoing",
    bidCount: 11,
    postedAt: "5 hours ago",
    urgent: false,
  },
  {
    id: "l4",
    title: "Deep clean 2-bedroom apartment",
    description: "Post-renovation deep clean needed. Kitchen, bathrooms, and all rooms. Bring own supplies.",
    category: "cleaning",
    budget: 3500,
    city: "Lahore",
    deadline: "Tomorrow",
    bidCount: 9,
    postedAt: "2 hours ago",
    urgent: true,
  },
  {
    id: "l5",
    title: "Deliver documents to Blue Area",
    description: "Urgent document delivery from F-7 to Blue Area office. Must be done before 5 PM.",
    category: "delivery",
    budget: 500,
    city: "Islamabad",
    deadline: "Today",
    bidCount: 3,
    postedAt: "30 min ago",
    urgent: true,
  },
  {
    id: "l6",
    title: "Garden landscaping and trimming",
    description: "Medium-sized garden needs trimming, weeding, and seasonal planting. Tools provided.",
    category: "gardening",
    budget: 2500,
    city: "Karachi",
    deadline: "This weekend",
    bidCount: 5,
    postedAt: "6 hours ago",
    urgent: false,
  },
];

const TESTIMONIALS = [
  {
    id: "r1",
    name: "Ayesha Siddiqui",
    city: "Karachi",
    avatar: "https://img.etimg.com/thumb/width-1200,height-900,imgsize-33966,resizemode-75,msid-107052084/magazines/panache/who-is-ayesha-siddiqui-meet-the-1st-wife-of-sania-mirzas-ex-husband-shoaib-malik-with-whom-he-had-a-telephonic-marriage.jpg",
    rating: 5,
    text: "Found a brilliant plumber within 30 minutes. He fixed our burst pipe the same evening. KaamKaro saved us from a disaster!",
    task: "Plumbing Emergency",
  },
  {
    id: "r2",
    name: "Hamza Qureshi",
    city: "Lahore",
    avatar: "https://hcstonline.org/wp-content/uploads/2019/04/hths-Hamza-Qureshi-e1555006287351.jpg",
    rating: 5,
    text: "The tutor I hired through KaamKaro helped my son improve his grades from C to A in just two months. Absolutely worth every rupee.",
    task: "O-Level Tutoring",
  },
  {
    id: "r3",
    name: "Zara Baig",
    city: "Islamabad",
    avatar: "https://media.licdn.com/dms/image/v2/D5603AQFeHvCvQ0QCCA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1695692541464?e=2147483647&v=beta&t=JRb1B6FHu3uVRIhp85dPpc2WrA3zi28kl9uM2fikWy4",
    rating: 5,
    text: "Hired a photographer for my sister's mehndi. The photos were stunning and the price was very reasonable. Highly recommend!",
    task: "Event Photography",
  },
  {
    id: "r4",
    name: "Tariq Mehmood",
    city: "Rawalpindi",
    avatar: "https://uoflhealth.org/wp-content/uploads/2025/10/Tariq_Mehmood_MD-768x768.jpg",
    rating: 4,
    text: "Moving was always stressful until I used KaamKaro. The team was professional, careful with my furniture, and on time.",
    task: "Home Moving",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Post Your Task",
    description: "Describe what you need done, set your budget, and choose your city. It takes less than 2 minutes.",
    icon: "📝",
    color: "#1DBF73",
  },
  {
    step: "02",
    title: "Receive Offers",
    description: "Verified local taskers send you their best offers. Compare profiles, ratings, and prices.",
    icon: "📬",
    color: "#FF6B35",
  },
  {
    step: "03",
    title: "Choose Your Tasker",
    description: "Pick the tasker that fits your needs. Chat with them directly before confirming.",
    icon: "✅",
    color: "#6C63FF",
  },
  {
    step: "04",
    title: "Pay Securely",
    description: "Pay through KaamKaro's secure escrow. Money is only released when you are satisfied.",
    icon: "🔒",
    color: "#F59E0B",
  },
];

const STATS = [
  { value: "50,000+", label: "Tasks Completed" },
  { value: "12,000+", label: "Verified Taskers" },
  { value: "10", label: "Cities Covered" },
  { value: "4.8★", label: "Average Rating" },
];

const CATEGORY_COLORS: Record<string, string> = {
  cleaning: "#1DBF73",
  delivery: "#FF6B35",
  moving: "#6C63FF",
  handyman: "#F59E0B",
  tutoring: "#EC4899",
  gardening: "#10B981",
  cooking: "#EF4444",
  "it-support": "#3B82F6",
  photography: "#8B5CF6",
  driving: "#14B8A6",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function TaskerCard({ tasker }: { tasker: TaskerProfile }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="bg-white rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5 flex flex-col gap-4 cursor-pointer group"
    >
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <img
            src={tasker.avatar}
            alt={tasker.name}
            className="w-14 h-14 rounded-xl object-cover ring-2 ring-white shadow-sm"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(tasker.name)}&background=1DBF73&color=fff&size=56`;
            }}
          />
          {tasker.verified && (
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#1DBF73] rounded-full flex items-center justify-center shadow">
              <Check className="w-3 h-3 text-white" />
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-gray-900 text-sm truncate">{tasker.name}</h3>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">{tasker.city}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={tasker.rating} />
            <span className="text-xs text-gray-500">
              {tasker.rating} ({tasker.reviewCount})
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{tasker.bio}</p>

      <div className="flex flex-wrap gap-1.5">
        {tasker.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 rounded-full bg-[#1DBF73]/10 text-[#1DBF73] text-xs font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <div>
          <span className="text-xs text-gray-400">From</span>
          <p className="font-bold text-gray-900 text-sm">{formatPKR(tasker.hourlyRate)}/hr</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="px-4 py-1.5 rounded-xl bg-[#1DBF73] text-white text-xs font-semibold shadow-[0_2px_8px_rgba(29,191,115,0.3)] hover:bg-[#17a862] transition-colors duration-200"
        >
          Hire Now
        </motion.button>
      </div>
    </motion.div>
  );
}

function TaskCard({ task }: { task: TaskListing }) {
  const categoryColor = CATEGORY_COLORS[task.category] ?? "#1DBF73";
  const categoryInfo = TASK_CATEGORIES.find((c) => c.id === task.category);

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5 flex flex-col gap-3 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{categoryInfo?.icon ?? "📋"}</span>
          <div>
            <h3 className="font-bold text-gray-900 text-sm leading-snug">{task.title}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">{task.city}</span>
            </div>
          </div>
        </div>
        {task.urgent && (
          <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-red-50 text-red-500 text-xs font-semibold border border-red-100">
            Urgent
          </span>
        )}
      </div>

      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{task.description}</p>

      <div className="flex items-center gap-3 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {task.deadline}
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          {task.bidCount} offers
        </span>
        <span className="ml-auto text-gray-400">{task.postedAt}</span>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <div>
          <span className="text-xs text-gray-400">Budget</span>
          <p className="font-bold text-sm" style={{ color: categoryColor }}>
            {formatPKR(task.budget)}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="px-4 py-1.5 rounded-xl text-white text-xs font-semibold transition-colors duration-200"
          style={{ backgroundColor: categoryColor }}
        >
          Make Offer
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Karachi");
  const [postTaskTitle, setPostTaskTitle] = useState("");
  const [postTaskCity, setPostTaskCity] = useState("Karachi");
  const [postTaskBudget, setPostTaskBudget] = useState("");
  const [postTaskDesc, setPostTaskDesc] = useState("");
  const [postTaskSubmitted, setPostTaskSubmitted] = useState(false);

  const handlePostTask = (e: React.FormEvent) => {
    e.preventDefault();
    setPostTaskSubmitted(true);
  };

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-[#f0fdf7] via-white to-[#fff7f3] pt-20 pb-16 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#1DBF73]/8 blur-[120px] translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#FF6B35]/6 blur-[100px] -translate-x-1/4 translate-y-1/4" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1DBF73" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1DBF73]/10 text-[#1DBF73] text-xs font-semibold border border-[#1DBF73]/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  {APP_TAGLINE}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] text-balance"
              >
                Get Any Task Done Across Pakistan{" "}
                <span className="text-[#1DBF73]">fdjgtk uyuly yfuy </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-gray-600 leading-relaxed max-w-lg text-pretty"
              >
                {APP_DESCRIPTION} Trusted by thousands of families and businesses from Karachi to Peshawar.
              </motion.p>

              {/* Search bar */}
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.10)] border border-black/5 p-2 flex flex-col sm:flex-row gap-2"
              >
                <div className="flex items-center gap-2 flex-1 px-3">
                  <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="What do you need help with?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent py-2"
                  />
                </div>
                <div className="flex items-center gap-2 px-3 border-t sm:border-t-0 sm:border-l border-gray-100 pt-2 sm:pt-0">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="text-sm text-gray-700 outline-none bg-transparent py-2 pr-6 cursor-pointer"
                  >
                    {PAKISTANI_CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-xl bg-[#1DBF73] text-white font-semibold text-sm shadow-[0_2px_8px_rgba(29,191,115,0.35)] hover:bg-[#17a862] transition-colors duration-200 flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Find Taskers
                </motion.button>
              </motion.div>

              {/* Quick category pills */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
                <span className="text-xs text-gray-400 self-center">Popular:</span>
                {TASK_CATEGORIES.slice(0, 5).map((cat) => (
                  <motion.button
                    key={cat.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-600 hover:border-[#1DBF73] hover:text-[#1DBF73] transition-all duration-200 shadow-sm flex items-center gap-1.5"
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </motion.button>
                ))}
              </motion.div>

              {/* Trust badges */}
              <motion.div variants={fadeInUp} className="flex items-center gap-6 pt-2">
                {[
                  { icon: Shield, text: "Verified Taskers" },
                  { icon: CheckCircle, text: "Secure Payments" },
                  { icon: Phone, text: "24/7 Support" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Icon className="w-3.5 h-3.5 text-[#1DBF73]" />
                    {text}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Stats + floating cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="relative hidden lg:flex flex-col gap-4"
            >
              {/* Hero image */}
              <motion.div variants={scaleIn} className="relative rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.14)] border border-black/5">
                <img
                  src="https://i.dawn.com/primary/2019/07/5d3cfdad0be51.jpg"
                  alt="Tasker working in Pakistan"
                  className="w-full h-80 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                    <p className="text-xs text-gray-500">Tasks posted today</p>
                    <p className="font-bold text-gray-900 text-lg">1,240+</p>
                  </div>
                  <div className="bg-[#1DBF73] rounded-xl px-3 py-2 shadow-lg">
                    <p className="text-xs text-white/80">Avg. response</p>
                    <p className="font-bold text-white text-lg">12 min</p>
                  </div>
                </div>
              </motion.div>

              {/* Stats row */}
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-4 gap-3"
              >
                {STATS.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeInUp}
                    className="bg-white rounded-2xl p-3 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] border border-black/5"
                  >
                    <p className="font-extrabold text-gray-900 text-base">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-tight">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      <section id="categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-[#1DBF73] uppercase tracking-widest mb-2">
              Browse by Category
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight text-balance">
              Every Task, Every City
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-3 text-gray-500 max-w-xl mx-auto text-pretty">
              From quick deliveries to skilled tradespeople, find the right help for any job across Pakistan.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {TASK_CATEGORIES.map((cat) => (
              <motion.div
                key={cat.id}
                variants={scaleIn}
                whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.2 } }}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] cursor-pointer hover:border-transparent hover:shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: cat.color + "18" }}
                >
                  {cat.icon}
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                  {cat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-[#f8fffe] to-[#f0fdf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-[#1DBF73] uppercase tracking-widest mb-2">
              Simple Process
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              How KaamKaro Works
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-3 text-gray-500 max-w-xl mx-auto">
              Getting help has never been easier. Post, compare, hire, and pay in four simple steps.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#1DBF73]/20 via-[#1DBF73]/60 to-[#1DBF73]/20 z-0" />

            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12 }}
                className="relative z-10 flex flex-col items-center text-center gap-4 p-6 bg-white rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm"
                  style={{ backgroundColor: step.color + "15" }}
                >
                  {step.icon}
                </div>
                <div
                  className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold text-white shadow-md"
                  style={{ backgroundColor: step.color }}
                >
                  {i + 1}
                </div>
                <h3 className="font-bold text-gray-900 text-base">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED TASKERS ─────────────────────────────────────────────── */}
      <section id="taskers" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <motion.p variants={fadeInUp} className="text-sm font-semibold text-[#1DBF73] uppercase tracking-widest mb-2">
                Top Rated
              </motion.p>
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Meet Our Best Taskers
              </motion.h2>
              <motion.p variants={fadeInUp} className="mt-2 text-gray-500 max-w-lg">
                Verified professionals ready to help you across Pakistan's major cities.
              </motion.p>
            </div>
            <motion.div variants={fadeIn}>
              <Link
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#1DBF73] hover:text-[#17a862] transition-colors"
              >
                View all taskers <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {FEATURED_TASKERS.map((tasker) => (
              <TaskerCard key={tasker.id} tasker={tasker} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── RECENT TASKS ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <motion.p variants={fadeInUp} className="text-sm font-semibold text-[#FF6B35] uppercase tracking-widest mb-2">
                Live Listings
              </motion.p>
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Tasks Waiting for Offers
              </motion.h2>
              <motion.p variants={fadeInUp} className="mt-2 text-gray-500 max-w-lg">
                Browse open tasks and start earning today. New tasks posted every few minutes.
              </motion.p>
            </div>
            <motion.div variants={fadeIn}>
              <Link
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF6B35] hover:text-[#e55a25] transition-colors"
              >
                Browse all tasks <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {RECENT_TASKS.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── VALUE PROPS (split layout) ───────────────────────────────────── */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Row 1: image left, text right */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-black/5">
                <img
                  src="https://www.taskrabbit.com/blog/wp-content/uploads/2024/01/US-473x1024.png"
                  alt="Verified tasker profile"
                  className="w-full h-72 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.background = "#f0fdf7";
                  }}
                />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="absolute -bottom-5 -right-5 bg-white rounded-2xl px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-black/5 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1DBF73]/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#1DBF73]" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">100% Verified</p>
                  <p className="text-xs text-gray-500">CNIC + Background Check</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-6"
            >
              <p className="text-sm font-semibold text-[#1DBF73] uppercase tracking-widest">For Task Posters</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight text-balance">
                Hire with Confidence, Every Time
              </h2>
              <p className="text-gray-500 leading-relaxed text-pretty">
                Every tasker on KaamKaro goes through a rigorous verification process including CNIC verification, skill assessment, and background checks. Your safety is our priority.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "CNIC-verified identity for every tasker",
                  "Ratings and reviews from real customers",
                  "Secure escrow payment, released only on completion",
                  "Dispute resolution team available 7 days a week",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#1DBF73]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#1DBF73]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="self-start">
                <Link
                  href="#post-task"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1DBF73] text-white font-semibold text-sm shadow-[0_2px_8px_rgba(29,191,115,0.35)] hover:bg-[#17a862] transition-colors duration-200"
                >
                  Post Your First Task <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Row 2: text left, image right */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-6 lg:order-1"
            >
              <p className="text-sm font-semibold text-[#FF6B35] uppercase tracking-widest">For Taskers</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight text-balance">
                Turn Your Skills Into a Steady Income
              </h2>
              <p className="text-gray-500 leading-relaxed text-pretty">
                Whether you are a plumber, tutor, photographer, or delivery rider, KaamKaro connects you with customers in your city. Set your own rates and work on your own schedule.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Free to join and create your profile",
                  "Receive task offers directly in your city",
                  "Get paid quickly via EasyPaisa or bank transfer",
                  "Build your reputation with verified reviews",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#FF6B35]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#FF6B35]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="self-start">
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF6B35] text-white font-semibold text-sm shadow-[0_2px_8px_rgba(255,107,53,0.35)] hover:bg-[#e55a25] transition-colors duration-200"
                >
                  Become a Tasker <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative lg:order-2"
            >
              <div className="rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-black/5">
                <img
                  src="https://kingtasker.com/blog/image/82?file=admin-post-1743076810-image_file-user_id_1.jpg"
                  alt="Tasker earning money in Pakistan"
                  className="w-full h-72 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.background = "#fff7f3";
                  }}
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="absolute -bottom-5 -left-5 bg-white rounded-2xl px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-black/5 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center">
                  <span className="text-lg">💰</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Avg. Monthly Earnings</p>
                  <p className="text-[#FF6B35] font-extrabold text-base">{formatPKR(45000)}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-[#1DBF73] uppercase tracking-widest mb-2">
              Real Stories
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Pakistanis Love KaamKaro
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-3 text-gray-400 max-w-xl mx-auto">
              Thousands of satisfied customers and taskers across the country share their experiences.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {TESTIMONIALS.map((review) => (
              <motion.div
                key={review.id}
                variants={scaleIn}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=1DBF73&color=fff&size=40`;
                    }}
                  />
                  <div>
                    <p className="font-bold text-white text-sm">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i <= review.rating ? "fill-amber-400 text-amber-400" : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed flex-1">{review.text}</p>
                <span className="text-xs text-[#1DBF73] font-medium">{review.task}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats bar */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center py-6 px-4 rounded-2xl bg-white/5 border border-white/10"
              >
                <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CITIES ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-10"
          >
            <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Available in 10 Cities Across Pakistan
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-2 text-gray-500">
              Expanding to more cities every month.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-wrap justify-center gap-3"
          >
            {PAKISTANI_CITIES.map((city) => (
              <motion.button
                key={city}
                variants={scaleIn}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-[#1DBF73]/10 hover:border-[#1DBF73]/40 hover:text-[#1DBF73] transition-all duration-200 shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5" />
                {city}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── POST A TASK FORM ─────────────────────────────────────────────── */}
      <section id="post-task" className="py-20 bg-gradient-to-br from-[#f0fdf7] to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-10"
          >
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-[#1DBF73] uppercase tracking-widest mb-2">
              Get Started
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Post a Task in 2 Minutes
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-3 text-gray-500">
              Describe your task, set a budget, and receive offers from verified taskers near you.
            </motion.p>
          </motion.div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-white rounded-3xl shadow-[0_4px_40px_rgba(0,0,0,0.10)] border border-black/5 p-8"
          >
            {postTaskSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#1DBF73]/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-[#1DBF73]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Task Posted Successfully!</h3>
                <p className="text-gray-500 max-w-sm">
                  Your task has been posted. Verified taskers in your city will start sending offers shortly.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setPostTaskSubmitted(false);
                    setPostTaskTitle("");
                    setPostTaskBudget("");
                    setPostTaskDesc("");
                  }}
                  className="mt-2 px-6 py-3 rounded-xl bg-[#1DBF73] text-white font-semibold text-sm shadow-[0_2px_8px_rgba(29,191,115,0.35)] hover:bg-[#17a862] transition-colors duration-200"
                >
                  Post Another Task
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handlePostTask} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Task Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Fix leaking tap in bathroom"
                    value={postTaskTitle}
                    onChange={(e) => setPostTaskTitle(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#1DBF73] focus:ring-2 focus:ring-[#1DBF73]/20 transition-all duration-200"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">Category</label>
                    <div className="relative">
                      <select
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 outline-none focus:border-[#1DBF73] focus:ring-2 focus:ring-[#1DBF73]/20 transition-all duration-200 appearance-none bg-white"
                        defaultValue=""
                      >
                        <option value="" disabled>Select category</option>
                        {TASK_CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.icon} {cat.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">City</label>
                    <div className="relative">
                      <select
                        value={postTaskCity}
                        onChange={(e) => setPostTaskCity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 outline-none focus:border-[#1DBF73] focus:ring-2 focus:ring-[#1DBF73]/20 transition-all duration-200 appearance-none bg-white"
                      >
                        {PAKISTANI_CITIES.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Budget (PKR)</label>
                  <input
                    type="number"
                    placeholder="e.g. 2500"
                    value={postTaskBudget}
                    onChange={(e) => setPostTaskBudget(e.target.value)}
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#1DBF73] focus:ring-2 focus:ring-[#1DBF73]/20 transition-all duration-200"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Task Description</label>
                  <textarea
                    placeholder="Describe your task in detail. Include any specific requirements, timing, or materials needed."
                    value={postTaskDesc}
                    onChange={(e) => setPostTaskDesc(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#1DBF73] focus:ring-2 focus:ring-[#1DBF73]/20 transition-all duration-200 resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#1DBF73] text-white font-bold text-base shadow-[0_4px_16px_rgba(29,191,115,0.35)] hover:bg-[#17a862] transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Post Task for Free
                </motion.button>

                <p className="text-center text-xs text-gray-400">
                  Free to post. No credit card required. Taskers will contact you directly.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}