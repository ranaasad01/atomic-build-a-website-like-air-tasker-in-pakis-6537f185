"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Sparkles, MessageCircle as Twitter, Globe as Facebook, Briefcase as Linkedin, Camera as Instagram } from 'lucide-react';
import { navLinks, APP_NAME, APP_TAGLINE } from "@/lib/data";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const footerServices = [
  { label: "Home Cleaning", href: "#categories" },
  { label: "Handyman", href: "#categories" },
  { label: "Delivery", href: "#categories" },
  { label: "Tutoring", href: "#categories" },
  { label: "Moving Help", href: "#categories" },
  { label: "IT Support", href: "#categories" },
];

const footerCompany = [
  { label: "About Us", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Trust & Safety", href: "#trust" },
  { label: "Careers", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Press", href: "#" },
];

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

export default function Footer() {
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <footer id="contact" className="bg-[#1a1a2e] text-white">
      {/* Top CTA Banner */}
      <div className="bg-[#1DBF73] py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Ready to get things done?
            </h2>
            <p className="text-white/80 mt-1 text-sm md:text-base">
              Join thousands of Pakistanis already using KaamKaro.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href={getHref("#post-task")}
              onClick={(e) => handleAnchorClick(e, "#post-task")}
              className="px-6 py-3 rounded-xl bg-white text-[#1DBF73] font-bold text-sm hover:bg-gray-50 transition-all duration-200 shadow-md"
            >
              Post a Task
            </Link>
            <Link
              href={getHref("#taskers")}
              onClick={(e) => handleAnchorClick(e, "#taskers")}
              className="px-6 py-3 rounded-xl bg-white/20 text-white font-bold text-sm hover:bg-white/30 transition-all duration-200 border border-white/30"
            >
              Become a Tasker
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#1DBF73] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {APP_TAGLINE}. Connecting skilled taskers with people who need help across Pakistan.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:bg-[#1DBF73] hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Nav Links */}
          <motion.div variants={fadeInUp}>
            <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-5">
              Navigate
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-gray-400 text-sm hover:text-[#1DBF73] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {footerServices.map((item) => (
                <li key={item.label}>
                  <Link
                    href={getHref(item.href)}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className="text-gray-400 text-sm hover:text-[#1DBF73] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp}>
            <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#1DBF73] mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  Office 12, Tech Hub, Blue Area, Islamabad, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#1DBF73] shrink-0" />
                <a
                  href="tel:+922134567890"
                  className="text-gray-400 text-sm hover:text-[#1DBF73] transition-colors duration-200"
                >
                  +92 21 3456 7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#1DBF73] shrink-0" />
                <a
                  href="mailto:hello@kaamkaro.pk"
                  className="text-gray-400 text-sm hover:text-[#1DBF73] transition-colors duration-200"
                >
                  hello@kaamkaro.pk
                </a>
              </li>
            </ul>

            <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-gray-500 leading-relaxed">
                Available Mon-Sat, 9am-6pm PKT. We respond within 24 hours.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved. Made with care in Pakistan.
          </p>
          <div className="flex gap-6">
            {footerCompany.slice(0, 3).map((item) => (
              <Link
                key={item.label}
                href={getHref(item.href)}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className="text-gray-500 text-xs hover:text-gray-300 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}