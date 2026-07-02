// Static data extracted from Ansh Kumar Yadav's resume.
// Used across the portfolio; live stats come from backend proxies.

export const PROFILE = {
    name: "Ansh Kumar Yadav",
    handle: "@anshyadav669",
    headline: "Software Developer · Competitive Programmer",
    subheadline: "Building web apps, RAG systems, and solving hard problems.",
    location: "Silchar, Assam · India",
    email: "ansh-ug-24@civil.nits.ac.in",
    phone: "+91 99289 43270",
    resumeUrl: "/AnshResume.pdf",
    about: [
        "I'm a Civil Engineering undergrad at NIT Silchar who spends most of his hours writing code — freelance web apps for early-stage startups, RAG-powered chatbots, and algorithmic problems for institute-level contests.",
        "400+ LeetCode problems, 2★ on CodeChef with a Rank 21 finish in Starters 243 (out of 21,836), and a habit of shipping.",
    ],
    socials: {
        github: "https://github.com/anshyadav669",
        linkedin: "https://www.linkedin.com/in/anshkumaryadav",
        leetcode: "https://leetcode.com/u/AnshKumarYadav/",
        codechef: "https://www.codechef.com/users/loop_hole39",
    },
};

export const EDUCATION = [
    {
        institution: "National Institute of Technology, Silchar",
        degree: "B.Tech, Civil Engineering",
        score: "CGPA 8.11",
        period: "Aug 2024 — Jun 2028",
        location: "Silchar, Assam",
    },
    {
        institution: "Bakshi's Springdales School",
        degree: "HSC — Class XII",
        score: "91%",
        period: "2022 — 2023",
        location: "India",
    },
    {
        institution: "Vidyashram Public School",
        degree: "SSC — Class X",
        score: "90.8%",
        period: "2023 — 2024",
        location: "India",
    },
];

export const SKILL_GROUPS = [
    {
        title: "Languages",
        items: [
            { name: "Python", level: 92 },
            { name: "C++", level: 88 },
            { name: "C", level: 80 },
            { name: "JavaScript", level: 78 },
        ],
    },
    {
        title: "Frontend",
        items: [
            { name: "HTML", level: 92 },
            { name: "CSS", level: 88 },
            { name: "JavaScript", level: 82 },
        ],
    },
    {
        title: "Backend & DB",
        items: [
            { name: "Node.js", level: 74 },
            { name: "Flask", level: 82 },
            { name: "Vector DB", level: 72 },
        ],
    },
    {
        title: "AI / Tooling",
        items: [
            { name: "LangChain", level: 78 },
            { name: "LLM APIs", level: 82 },
            { name: "Git / GitHub", level: 80 },
            { name: "Linux", level: 78 },
        ],
    },
];

export const TOOLS = [
    "Python", "C++", "C", "JavaScript", "Node.js", "Flask",
    "LangChain", "LLM APIs", "Vector DB", "HTML", "CSS",
    "Git", "GitHub", "Linux", "Arduino", "VS Code",
];

export const PROJECTS = [
    {
        title: "RAG Chatbot",
        tagline: "Retrieval-Augmented chatbot that cuts hallucinations by grounding answers in a custom knowledge base.",
        description:
            "Built a Retrieval-Augmented Generation (RAG) chatbot that retrieves relevant context from a custom knowledge base before generation. Document chunking + embedding generation feeds into a vector database for fast similarity-based retrieval. Wrapped it in a lightweight Flask web interface for real-time interaction.",
        features: [
            "Custom knowledge base ingestion",
            "Chunking + embedding pipeline",
            "Vector similarity retrieval",
            "Flask real-time UI",
        ],
        stack: ["Python", "LangChain", "LLM APIs", "Vector DB", "Flask"],
        github: "https://github.com/anshyadav669",
        demo: null,
        accent: "AI · NLP",
    },
    {
        title: "To-Do List Web App",
        tagline: "A fast, responsive task manager with persistent storage and due-date reminders.",
        description:
            "Task management web app enabling users to create, edit, prioritize, and delete tasks in real time. Persistent data storage keeps tasks across sessions, with due-date reminders and completion tracking. Clean, responsive UI works smoothly across desktop and mobile.",
        features: [
            "Create / edit / prioritize / delete",
            "Persistent storage across sessions",
            "Due-date reminders",
            "Responsive UI",
        ],
        stack: ["HTML", "CSS", "JavaScript", "Node.js"],
        github: "https://github.com/anshyadav669",
        demo: null,
        accent: "Web App",
    },
];

export const EXPERIENCE = [
    {
        role: "Freelance Web Developer",
        org: "Startup Projects",
        period: "2024 — Present",
        bullets: [
            "Designed and shipped responsive websites for early-stage startups, translating rough client requirements into production-ready pages.",
            "Owned end-to-end delivery — UI design → frontend build → deployment — with a focus on fast load times and mobile-first layouts.",
        ],
    },
    {
        role: "Problem Setter",
        org: "Institute Coding Contests · NIT Silchar",
        period: "2024 — Present",
        bullets: [
            "Authored original algorithmic problems and rigorous test cases for institute-level contests.",
            "Calibrated difficulty across easy/medium/hard tiers for 100+ participants.",
        ],
    },
];

export const ACHIEVEMENTS = [
    {
        title: "CodeChef Starters 243 — Rank 21",
        detail: "Global Rank 21 out of 21,836 participants.",
    },
    {
        title: "400+ Problems Solved on LeetCode",
        detail: "Consistent DSA practice across arrays, graphs, DP, and more.",
    },
    {
        title: "2★ Coder on CodeChef",
        detail: "Active contest participation and rating climbs.",
    },
    {
        title: "Institute-level Problem Setter",
        detail: "Authored problems for 100+ competing students at NIT Silchar.",
    },
];

export const NAV = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "cp", label: "CP Stats" },
    { id: "github", label: "GitHub" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
];
