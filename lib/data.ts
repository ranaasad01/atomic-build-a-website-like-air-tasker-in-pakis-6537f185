export const APP_NAME = "KaamKaro";
export const APP_TAGLINE = "Pakistan's Local Task Marketplace";
export const APP_DESCRIPTION =
  "Post tasks, hire trusted local taskers across Pakistan. From cleaning to delivery, handyman to tutoring.";

export const ACCENT_COLOR = "#1DBF73";
export const ACCENT_DARK = "#17a862";
export const BRAND_ORANGE = "#FF6B35";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Categories", href: "#categories" },
  { label: "Taskers", href: "#taskers" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const NAV_CTA = {
  label: "Post a Task",
  href: "#post-task",
};

export const PAKISTANI_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Peshawar",
  "Quetta",
  "Multan",
  "Faisalabad",
  "Hyderabad",
  "Sialkot",
];

export const TASK_CATEGORIES = [
  { id: "cleaning", label: "Cleaning", icon: "✨", color: "#1DBF73" },
  { id: "delivery", label: "Delivery", icon: "📦", color: "#FF6B35" },
  { id: "moving", label: "Moving", icon: "🚚", color: "#6C63FF" },
  { id: "handyman", label: "Handyman", icon: "🔧", color: "#F59E0B" },
  { id: "tutoring", label: "Tutoring", icon: "📚", color: "#EC4899" },
  { id: "gardening", label: "Gardening", icon: "🌿", color: "#10B981" },
  { id: "cooking", label: "Cooking", icon: "🍳", color: "#EF4444" },
  { id: "it-support", label: "IT Support", icon: "💻", color: "#3B82F6" },
  { id: "photography", label: "Photography", icon: "📷", color: "#8B5CF6" },
  { id: "driving", label: "Driving", icon: "🚗", color: "#14B8A6" },
];

export interface TaskerProfile {
  id: string;
  name: string;
  avatar: string;
  city: string;
  skills: string[];
  rating: number;
  reviewCount: number;
  completedJobs: number;
  hourlyRate: number;
  bio: string;
  verified: boolean;
}

export interface TaskListing {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  city: string;
  deadline: string;
  bidCount: number;
  postedAt: string;
  urgent: boolean;
}

export const formatPKR = (amount: number): string => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};