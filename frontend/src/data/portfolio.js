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
        slug: "rag-chatbot",
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
        year: 2025,
        heroPattern: "radial",
        caseStudy: {
            problem:
                "Large language models are impressive generalists — and confident hallucinators. Asking a raw LLM a domain-specific question (product docs, internal wiki, textbook chapter) frequently returns plausible-sounding but wrong answers. For any real assistant, that's not shippable.",
            approach:
                "Rather than fine-tune an entire model, I built a Retrieval-Augmented Generation (RAG) system. Documents are chunked, embedded, and stored in a vector database. At query time, the top-k most relevant chunks are pulled and injected into the prompt as authoritative context — with an instruction that forces the model to answer only from what it was shown.",
            architecture: [
                { step: "01", title: "Ingest", detail: "Documents split into overlapping ~500-token chunks to preserve semantic boundaries." },
                { step: "02", title: "Embed", detail: "Each chunk is passed through an embedding model and stored in a vector database with metadata." },
                { step: "03", title: "Retrieve", detail: "User query is embedded, top-k similar chunks are fetched via cosine similarity." },
                { step: "04", title: "Ground", detail: "Retrieved chunks are stitched into a system prompt with a strict 'answer only from context' rule." },
                { step: "05", title: "Generate", detail: "LLM produces the answer; falls back to 'I don't know' when the context is thin." },
                { step: "06", title: "Serve", detail: "Flask endpoint streams the response to a minimal web UI in real time." },
            ],
            decisions: [
                { title: "Why LangChain?", body: "Batteries-included retrievers, chain composition and streaming. Fast path from prototype to demo without re-implementing plumbing." },
                { title: "Why Flask (not Django)?", body: "The surface area is tiny — one endpoint, one page. Flask keeps the deploy footprint minimal and startup instant." },
                { title: "Chunk size", body: "500-token chunks with ~10% overlap balances retrieval precision against context bloat in the prompt." },
                { title: "Failure mode", body: "Explicit fallback message when no chunk crosses a similarity threshold — better than confidently making things up." },
            ],
            learnings: [
                "Chunking strategy is a hyperparameter — small enough to be precise, big enough to preserve context.",
                "Prompt discipline (\"answer only from the context, otherwise say you don't know\") reduced hallucinations more than any model swap.",
                "Vector DB choice matters less than the quality of the input corpus.",
            ],
            snippet: {
                lang: "python",
                code: `# core loop (simplified)\nquery_embedding = embed(user_query)\ncontext = vector_db.similarity_search(query_embedding, k=4)\n\nprompt = f"""\nYou are a helpful assistant. Answer ONLY from the context below.\nIf the answer is not present, reply: \\"I don't know from the given context.\\"\n\nContext:\n{context}\n\nQuestion: {user_query}\n"""\n\nreturn llm.stream(prompt)`,
            },
        },
    },
    {
        slug: "todo-web-app",
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
        year: 2024,
        heroPattern: "grid",
        caseStudy: {
            problem:
                "Every to-do app either overwhelms you with features you don't use, or loses your list the moment the tab crashes. I wanted the simplest possible task manager that respects two rules: nothing disappears, nothing distracts.",
            approach:
                "A single-page app with vanilla JS state, hydrated from localStorage on load and persisted on every mutation. Tasks are ordered by priority × due date. The whole UI collapses to one column on mobile — no responsive gymnastics, just a keyboard-first list.",
            architecture: [
                { step: "01", title: "State", detail: "A single tasks array lives in memory; each task has id, text, priority, dueDate, completed." },
                { step: "02", title: "Persist", detail: "Every mutation writes the array back to localStorage — the browser is the database." },
                { step: "03", title: "Render", detail: "A tiny diff-and-render function repaints only the changed items on state change." },
                { step: "04", title: "Notify", detail: "A daily setInterval scans tasks and surfaces due-date reminders as inline banners." },
            ],
            decisions: [
                { title: "Why vanilla JS?", body: "React would have shipped 40KB of framework for a 500-line app. Vanilla keeps the whole page under a couple of kilobytes gzipped." },
                { title: "Why localStorage?", body: "No auth, no server bill, no privacy questions. The user's data never leaves their browser." },
                { title: "Priority ordering", body: "Priority is a small enum (P1/P2/P3). Combined with dueDate it produces a stable, intuitive sort." },
                { title: "Mobile", body: "Instead of a separate mobile view I designed the single column to work naturally at every width." },
            ],
            learnings: [
                "You can go a long way without a framework — DOM diffing is easy when the app is small.",
                "Persisting on every mutation is cheaper than debouncing, and eliminates lost-work edge cases.",
                "Constraints (no server, no framework) forced better UX decisions than a bigger stack would have.",
            ],
            snippet: {
                lang: "javascript",
                code: `// persistence layer (simplified)\nconst KEY = "todos.v1";\n\nfunction saveTasks(tasks) {\n    localStorage.setItem(KEY, JSON.stringify(tasks));\n}\n\nfunction loadTasks() {\n    try {\n        return JSON.parse(localStorage.getItem(KEY)) ?? [];\n    } catch {\n        return [];\n    }\n}\n\nfunction addTask(text, priority = "P2", dueDate = null) {\n    const tasks = loadTasks();\n    tasks.push({ id: crypto.randomUUID(), text, priority, dueDate, completed: false });\n    saveTasks(tasks);\n    render(tasks);\n}`,
            },
        },
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
