import React from 'react';
import { Mail, Github, Linkedin, User as UserIcon, BookOpen, FileText, Newspaper, Building2, IdCard, Phone, Fingerprint, GraduationCap, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
    data: Record<string, string>;
    publicationStats?: {
        journals: number;
        conferences: number;
        books: number;
    };
    socialLinks?: {
        mail?: string;
        github?: string;
        linkedin?: string;
    };
}

export const Hero: React.FC<HeroProps> = ({ data, publicationStats, socialLinks }) => {
    const name = data['Full Name'] || 'Faculty Member';
    const designation = data['Designation'] || 'Designation';
    const dept = data['Department'] || '';
    const institution = data['Institution Name'];
    const employeeId = data['Employee ID'];
    const officialEmail = data['Official Email'];
    const phone = data['Phone Number'];
    const ensureProtocol = (link: string) => {
        if (!link || link === '#') return '#';
        if (link.startsWith('http://') || link.startsWith('https://')) return link;
        return `https://${link}`;
    };


    // For hrefs
    const githubLink = ensureProtocol(socialLinks?.github || '#');
    const linkedinLink = ensureProtocol(socialLinks?.linkedin || '#');
    const findKey = (search: string) => {
        const key = Object.keys(data).find(k => k.toLowerCase().trim() === search.toLowerCase());
        return key ? data[key] : undefined;
    };

    const orcid = findKey('orc id') || findKey('orcid') || findKey('orcid id');
    const scholar = findKey('google scholar') || findKey('scholar') || findKey('scholar link');
    const scopus = findKey('scopus') || findKey('scopus id');

    const orcidLink = orcid ? (orcid.startsWith('http') ? orcid : `https://orcid.org/${orcid}`) : '';
    const scholarLink = ensureProtocol(scholar || '');
    const scopusLink = scopus ? (scopus.startsWith('http') ? scopus : `https://www.scopus.com/authid/detail.uri?authorId=${scopus}`) : '';

    const getPhotoUrl = (url: string) => {
        if (!url) return '';

        // Handle various Google Drive URL formats
        if (url.includes('drive.google.com')) {
            let id = '';
            // Match /d/ID or /file/d/ID
            const dMatch = url.match(/\/d\/([a-zA-Z0-9_-]{25,})/);
            // Match id=ID
            const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]{25,})/);

            if (dMatch && dMatch[1]) id = dMatch[1];
            else if (idMatch && idMatch[1]) id = idMatch[1];

            if (id) {
                // This is the most reliable "hotlink" format for Google Drive photos
                return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
            }
        }
        return url;
    };

    const photo = getPhotoUrl(data['Profile Photo Link']);

    return (
        <section id="basicInfo" className="min-h-screen relative flex flex-col md:flex-row items-center overflow-hidden bg-surface-200">
            {/* Theme Background Shape - The 'Curve' */}
            <div className="absolute top-0 left-0 w-full md:w-[45%] h-full bg-primary-200 rounded-br-[100px] md:rounded-br-[200px] z-0"></div>

            {/* Decorative Outline Circles */}
            <div className="absolute bottom-10 right-10 w-96 h-96 border border-primary-200 rounded-full z-0 pointer-events-none opacity-50"></div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* Left Content Column */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col space-y-8 md:pr-10"
                >
                    {/* Greeting */}
                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl font-medium text-stone-600 tracking-wide"
                    >
                        Hello, I'm
                    </motion.h3>

                    {/* Name - Single Line */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-primary-500 font-serif"
                    >
                        {name}
                    </motion.h1>

                    {/* Designation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-2"
                    >
                        <p className="text-xl md:text-2xl font-bold text-stone-700">
                            {designation}
                        </p>
                        <p className="text-lg text-stone-500 font-medium font-serif italic">
                            {dept}
                        </p>
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.52 }}
                        className="space-y-3 text-stone-600 font-medium text-15 md:text-base mt-4"
                    >
                        {institution && (
                            <div className="flex items-center gap-3">
                                <Building2 size={18} className="text-primary-500 shrink-0" />
                                <span>{institution}</span>
                            </div>
                        )}
                        {employeeId && (
                            <div className="flex items-center gap-3">
                                <IdCard size={18} className="text-primary-500 shrink-0" />
                                <span>ID: {employeeId}</span>
                            </div>
                        )}
                        {officialEmail && (
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-primary-500 shrink-0" />
                                <span>{officialEmail}</span>
                            </div>
                        )}
                        {phone && (
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-primary-500 shrink-0" />
                                <span>{phone}</span>
                            </div>
                        )}
                        {orcid && (
                            <div className="flex items-center gap-3">
                                <Fingerprint size={18} className="text-primary-500 shrink-0" />
                                <span className="font-bold">ORCID:</span>
                                <a href={orcidLink} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">{orcid}</a>
                            </div>
                        )}
                        {scholar && (
                            <div className="flex items-center gap-3">
                                <GraduationCap size={18} className="text-primary-500 shrink-0" />
                                <span className="font-bold">Scholar:</span>
                                {scholar.startsWith('http') ? (
                                    <a href={scholarLink} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline truncate max-w-[200px]">Link</a>
                                ) : (
                                    <span>{scholar}</span>
                                )}
                            </div>
                        )}
                        {scopus && (
                            <div className="flex items-center gap-3">
                                <Search size={18} className="text-primary-500 shrink-0" />
                                <span className="font-bold">Scopus:</span>
                                <a href={scopusLink} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">{scopus}</a>
                            </div>
                        )}
                    </motion.div>





                    {/* Publication Analysis - 3D Index Cards */}
                    {publicationStats && (publicationStats.journals > 0 || publicationStats.conferences > 0 || publicationStats.books > 0) && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                            className="flex flex-wrap gap-6 pt-6"
                            style={{ perspective: "1000px" }}
                        >
                            {[
                                { label: 'journals', count: publicationStats.journals, icon: <FileText />, color: 'bg-[#1A3C34]' },
                                { label: 'conferences', count: publicationStats.conferences, icon: <Newspaper />, color: 'bg-[#274C40]' },
                                { label: 'books', count: publicationStats.books, icon: <BookOpen />, color: 'bg-[#0F2520]' }
                            ].filter(stat => stat.count > 0).map((stat, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{
                                        rotateX: 10,
                                        rotateY: -10,
                                        z: 50,
                                        scale: 1.05
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="relative group w-36 h-28"
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    {/* The Tab */}
                                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 ${stat.color} rounded-t-lg z-0 shadow-sm flex items-center justify-center`}>
                                        <div className="w-1.5 h-1.5 rounded-full bg-stone-400"></div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="relative bg-white w-full h-full rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-stone-100 flex flex-col items-center justify-center overflow-hidden z-10 transition-shadow group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                                        {/* Watermark Icon */}
                                        <div className="absolute -bottom-2 -right-2 text-stone-100 opacity-20 transform -rotate-12">
                                            {React.cloneElement(stat.icon as React.ReactElement, { size: 64 } as any)}
                                        </div>

                                        {/* Content */}
                                        <p className="text-4xl font-bold text-[#1A3C34] font-serif leading-none z-20">
                                            {stat.count}
                                        </p>
                                        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400 mt-2 z-20">
                                            {stat.label}
                                        </p>

                                        {/* Bottom Shadow Lip */}
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-t from-stone-100 to-transparent"></div>
                                    </div>

                                    {/* 3D Depth Layer (Shadow) */}
                                    <div className="absolute inset-0 bg-black/5 rounded-xl blur-lg translate-y-4 translate-x-2 -z-10 group-hover:translate-y-6 group-hover:translate-x-4 transition-transform"></div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}


                    {/* Social Icons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap gap-4"
                    >
                        {[
                            { icon: <Mail size={20} />, href: '#contact', color: 'bg-primary-500', label: 'Email' },
                            { icon: <Github size={20} />, href: githubLink, color: 'bg-stone-700', label: 'Github' },
                            { icon: <Linkedin size={20} />, href: linkedinLink, color: 'bg-primary-600', label: 'LinkedIn' },
                            { icon: <Fingerprint size={20} />, href: orcidLink, color: 'bg-orange-600', label: 'ORCID' },
                            { icon: <GraduationCap size={20} />, href: scholarLink, color: 'bg-blue-600', label: 'Scholar' },
                            { icon: <Search size={20} />, href: scopusLink, color: 'bg-sky-700', label: 'Scopus' }
                        ].filter(social => social.href && social.href !== '#' && social.href !== 'https://').map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target={social.href.startsWith('http') ? "_blank" : undefined}
                                rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                className="group relative w-12 h-12 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:text-white transition-all duration-300 hover:border-transparent hover:-translate-y-1 overflow-hidden"
                                title={social.label}
                            >
                                <div className={`absolute inset-0 ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                                <span className="relative z-10">{social.icon}</span>
                            </a>
                        ))}
                    </motion.div>


                    {/* CTA Button */}
                    <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        href="#contact"
                        className="btn-premium px-8 py-4 rounded-full text-white font-bold text-lg w-fit shadow-md hover:shadow-lg bg-primary-500"
                    >
                        Get Started
                    </motion.a>
                </motion.div>

                {/* Right Photo Column */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex justify-center relative md:pt-16"
                    style={{ perspective: "1000px" }}
                >
                    <motion.div
                        className="relative"
                        animate={{
                            rotateY: [0, 5, 0, -5, 0],
                            y: [0, -10, 0, -10, 0]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* Decorative Circle Behind Photo */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border border-[#d6d3d1] opacity-60"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full border border-[#e7e5e4] opacity-80"></div>

                        <motion.div
                            className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl"
                            whileHover={{ scale: 1.05, translateZ: 50 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {photo ? (
                                <img
                                    src={photo}
                                    alt={name}
                                    className="w-full h-full object-cover object-center"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200 text-stone-500">
                                    <UserIcon size={96} className="opacity-50" />
                                    <span className="mt-4 opacity-50 font-semibold">No Photo</span>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};
