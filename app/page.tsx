'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function GroupLinkTree() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  
  const members = [
    { 
      name: "Eknoor Singh Kohli", 
      role: "Lead Coder", 
      linkedin: "https://www.linkedin.com/in/eknoor-singh-kohli/", 
      avatar: "/eknoor.jpg",
      skills: ["HTML","CSS","JavaScript", "React","React-Native", "Node.js", "TypeScript", "Next.js","Java","Python","Supabase","C#","Docker","CI/CD PipeLine","Restful API","Expo"],
      bio: "Passionate full-stack developer with expertise in modern web technologies. Love creating efficient and scalable applications. A visionary leader who orchestrated the entire project lifecycle, from concept to launch.",
      experience: "1 year",
      location: "Calgary,Canada",
      email: "eknoor@example.com"
    },
    { 
      name: "KamalPreet Singh", 
      role: "DBA", 
      linkedin: "https://www.linkedin.com/in/kamalpreet-singh-b671992a5/", 
      avatar: "/Kamal.jpg",
      skills: ["Java", "Javascript", "MYSQL", "Typescript", "Supabase", "HTML","CSS"],
      bio: "Database specialist focused on creating robust and scalable database solutions.",
      experience: "1 year",
      location: "Calgary,Canada",
      email: "teammate1@example.com"
    },
    { 
      name: "Pranav", 
      role: "UI/UX Designer", 
      linkedin: "https://www.linkedin.com/in/pranav-bhalla-b720b62b0/", 
      avatar: "/Pranav.jpg",
      skills: ["UI/UX Design", "Figma", "Prototyping"],
      bio: "Creative designer passionate about user experience and interface design.",
      experience: "1 year",
      location: "Calgary,Canada",
      email: "teammate2@example.com"
    },
    { 
      name: "Harkaran", 
      role: "Support coder", 
      linkedin: "https://ca.linkedin.com/in/harkaran-singh-690bbb270", 
      avatar: "/Harkaran.jpg",
      skills: ["DevOps", "Docker", "Kubernetes", "CI/CD"],
      bio: "Infrastructure specialist ensuring smooth deployment and operations.",
      experience: "1 year",
      location: "Calgary,Canada",
      email: "teammate3@example.com"
    },
  ];

  return (
    <main className="relative min-h-dvh overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="absolute inset-0">
        <BackgroundBlobs />
      </div>

      <section className="relative mx-auto max-w-4xl px-4 py-12">
        <motion.header initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold">Team VapeVault LinkTree</h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Your all-in-one digital hub of the members of Team VapeVault.
          </p>
        </motion.header>

        <motion.div initial={false} whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={{ show: { opacity: 1, transition: { staggerChildren: 0.08 } } }} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {members.map((m, i) => (
            <MemberCard key={m.linkedin} member={m} index={i} onClick={() => setSelectedMember(m)} />
          ))}
        </motion.div>

        <footer className="mt-12 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>Click on any card to view detailed information about the team member.</p>
        </footer>
      </section>

      {selectedMember && (
        <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </main>
  );
}

interface Member {
  name: string;
  role: string;
  linkedin: string;
  avatar: string;
  skills: string[];
  bio: string;
  experience: string;
  location: string;
  email: string;
}

interface MemberCardProps {
  member: Member;
  index: number;
  onClick: () => void;
}

function MemberCard({ member, index, onClick }: MemberCardProps) {
  const { name, role, linkedin, avatar } = member;
  return (
    <motion.article variants={{ show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }} initial={false}>
      <motion.div 
        whileHover={{ y: -4 }} 
        transition={{ type: "spring", stiffness: 260, damping: 18 }} 
        className="group relative rounded-2xl border border-slate-300/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm hover:shadow-xl cursor-pointer"
        onClick={onClick}
      >
        <div className="p-6">
          <div className="flex items-center gap-5">
            <Avatar name={name} src={avatar} />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{name}</h2>
              <p className="text-base text-slate-700/80 dark:text-slate-300/90 mt-1">{role}</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
              <AnchorButton href={linkedin}>Open LinkedIn</AnchorButton>
              <CopyButton text={linkedin} />
              <ShareButton url={linkedin} />
            </div>
            <div className="flex justify-center">
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700/50">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Click card for more details</span>
              </div>
            </div>
          </div>
        </div>
        <motion.div layoutId={`bar-${index}`} className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-cyan-500" />
      </motion.div>
    </motion.article>
  );
}

function Avatar({ name, src }: { name: string; src: string }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  return src ? (
    <div className="relative">
      <img src={src} alt={name} className="h-20 w-20 rounded-2xl object-cover ring-2 ring-slate-300 dark:ring-slate-700 shadow-lg" />
    </div>
  ) : (
    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 grid place-items-center font-bold text-xl text-slate-900 dark:text-slate-100 ring-2 ring-slate-300 dark:ring-slate-700 shadow-lg">
      {initials}
    </div>
  );
}

function AnchorButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold border border-slate-900/80 dark:border-white/80 text-slate-50 dark:text-slate-900 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200">
      {children}
    </a>
  );
}

function CopyButton({ text }: { text: string }) {
  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  };
  return (
    <button onClick={handleCopy} className="inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-sm font-medium border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
      Copy URL
    </button>
  );
}

function ShareButton({ url }: { url: string }) {
  // Always render the same markup on server & client to avoid hydration diffs.
  const handleShare = () => {
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        navigator.share({ url });
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(url);
        // Optional: you could show a toast here.
      }
    } catch {}
  };
  return (
    <button onClick={handleShare} className="inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-sm font-medium border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
      Share
    </button>
  );
}

function BackgroundBlobs() {
  return (
    <>
      <motion.div aria-hidden initial={false} animate={{ opacity: 0.8 }} transition={{ duration: 1.4 }} className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl bg-indigo-400/30 dark:bg-indigo-600/30" />
      <motion.div aria-hidden initial={false} animate={{ opacity: 0.7 }} transition={{ duration: 1.6, delay: 0.1 }} className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl bg-fuchsia-400/30 dark:bg-fuchsia-600/30" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(2,6,23,0.06),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(2,6,23,0.06),transparent_40%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_40%)]" />
    </>
  );
}

interface MemberModalProps {
  member: Member;
  onClose: () => void;
}

function MemberModal({ member, onClose }: MemberModalProps) {
  const { name, role, linkedin, avatar, skills, bio, experience, location, email } = member;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          {/* Main Content - Side by Side Layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Large Image */}
            <div className="flex-shrink-0 flex justify-center lg:justify-start">
              {avatar ? (
                <img src={avatar} alt={name} className="h-48 w-48 lg:h-64 lg:w-64 rounded-3xl object-cover ring-4 ring-slate-300 dark:ring-slate-700 shadow-xl" />
              ) : (
                <div className="h-48 w-48 lg:h-64 lg:w-64 rounded-3xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 grid place-items-center font-bold text-4xl lg:text-5xl text-slate-900 dark:text-slate-100 ring-4 ring-slate-300 dark:ring-slate-700 shadow-xl">
                  {name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
                </div>
              )}
            </div>

            {/* Right Side - All Details */}
            <div className="flex-1 space-y-6">
              {/* Header Info */}
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">{name}</h2>
                <p className="text-xl text-slate-600 dark:text-slate-300 mt-2">{role}</p>
                <div className="flex items-center gap-4 mt-4 text-base text-slate-500 dark:text-slate-400">
                  <span>📍 {location}</span>
                  <span>⏱️ {experience}</span>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">About</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{bio}</p>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-800 dark:text-indigo-200 rounded-full border border-indigo-200 dark:border-indigo-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Get in Touch</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <AnchorButton href={linkedin}>
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn Profile
                  </AnchorButton>
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
