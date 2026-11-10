export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI / ML' | 'Full-Stack Web' | 'Frontend Utility';
  description: string;
  technologies: string[];
  keyFeatures: string[];
  contributions: string[];
  githubUrl: string;
  liveUrl?: string;
  accentColor: string;
  architectureDetails: string;
  imageUrl: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    icon: string;
    description: string;
  }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  location: string;
  duration: string;
  score: string;
  scoreType: 'CGPA' | 'Percentage';
  highlights: string[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  location: string;
  duration: string;
  isCurrent: boolean;
  responsibilities: string[];
  technologies: string[];
}

export interface CodingProfile {
  platform: 'LeetCode' | 'CodeChef' | 'GitHub';
  username: string;
  url: string;
  accent: string;
  badge: string;
  stats: {
    label: string;
    value: string;
    detail?: string;
  }[];
  highlights: string[];
}

export const RESUME_DATA = {
  personal: {
    name: "ANSH KUMAR YADAV",
    headline: "SOFTWARE DEVELOPER & PROBLEM SOLVER",
    subheadline: "TURNING IDEAS INTO DIGITAL REALITY",
    tagline: "Engineering high-performance web applications and intelligent machine learning systems through algorithmic rigor, clean code, and first-principles thinking.",
    email: "ansh-ug-24@civil.nits.ac.in",
    mobile: "+91-9928943270",
    location: "NIT Silchar, Assam / Kota, India",
    college: "National Institute of Technology, Silchar",
    degree: "B.Tech (2024 – 2028)",
    cgpa: "8.12",
    githubUrl: "https://github.com/anshyadav669",
    githubUsername: "anshyadav669",
    linkedinUrl: "https://linkedin.com/in/ansh-kumar-yadav",
    linkedinUsername: "ansh-kumar-yadav",
    leetcodeUrl: "https://leetcode.com/u/anshyadav669",
    codechefUrl: "https://www.codechef.com/users/anshyadav669",
    roles: [
      "Software Developer",
      "Machine Learning Builder",
      "Algorithmic Problem Setter",
      "Full-Stack Web Engineer"
    ],
    summary: "Aspiring Software Engineer and B.Tech student at National Institute of Technology, Silchar (CGPA 8.12). Proven track record in solving 400+ algorithmic problems on LeetCode and achieving 4-Star status (Global Rank 31) on CodeChef. Experienced in building Retrieval-Augmented Generation (RAG) AI systems, deep learning speech emotion audio classifiers, and responsive web applications for early-stage startups."
  },

  stats: [
    { label: "Problems Solved", value: "400+", subtext: "LeetCode Algorithmic Mastery" },
    { label: "CodeChef Rank", value: "31", subtext: "Secured in Global Contest (4-Star)" },
    { label: "Academic CGPA", value: "8.12", subtext: "NIT Silchar Engineering" },
    { label: "Contest Creator", value: "100+", subtext: "Participants in NIT Contests" },
  ],

  services: [
    {
      id: "web-dev",
      number: "01",
      title: "Full-Stack Web Engineering",
      shortDesc: "Translating ambiguous client requirements into responsive, high-performance web applications tailored for early-stage startups.",
      capabilities: [
        "Responsive, mobile-first architectures",
        "Frontend performance & accessibility audit",
        "Clean component systems & interactive UI",
        "Modern deployment pipelines (Vercel, Netlify, Cloud)"
      ],
      icon: "LayoutTemplate",
      tag: "PRODUCTION READY"
    },
    {
      id: "rag-ai",
      number: "02",
      title: "RAG & Machine Learning Systems",
      shortDesc: "Designing intelligent AI applications powered by LLMs, custom knowledge vector databases, and deep learning classification pipelines.",
      capabilities: [
        "Retrieval-Augmented Generation (RAG) architectures",
        "Vector embeddings & semantic similarity retrieval",
        "Deep learning audio signal classification (Librosa/TF)",
        "Streamlit & Flask micro-service deployments"
      ],
      icon: "Cpu",
      tag: "INTELLIGENT SYSTEMS"
    },
    {
      id: "algo-problem-solving",
      number: "03",
      title: "Algorithmic Problem Setting & DSA",
      shortDesc: "Crafting robust test cases and complex algorithmic challenges for competitive programming contests, with 400+ LeetCode problems solved.",
      capabilities: [
        "Data structures & optimized algorithmic reasoning",
        "Contest problem crafting & edge-case test case design",
        "Time & space complexity optimization in C++ & Python",
        "Dynamic programming, graphs, trees & math solutions"
      ],
      icon: "Terminal",
      tag: "COMPETITIVE DSA"
    },
    {
      id: "audio-ml",
      number: "04",
      title: "Signal Processing & Audio ML",
      shortDesc: "Extracting acoustic features from raw audio waves and training deep convolutional and recurrent models for emotion and genre recognition.",
      capabilities: [
        "MFCC, Chroma & Mel Spectrogram feature engineering",
        "Classifier model benchmarking (TensorFlow/Scikit-learn)",
        "Real-time audio feature inference pipelines",
        "Interactive analytics dashboards with Matplotlib"
      ],
      icon: "Activity",
      tag: "DEEP LEARNING"
    }
  ],

  skillsCategories: [
    {
      category: "Programming Languages",
      description: "Core languages used for systems, competitive programming, and application backends",
      skills: [
        { name: "Python", icon: "Code2", description: "Primary language for ML, RAG, Librosa, Flask & Automation" },
        { name: "C++", icon: "Terminal", description: "Core language for DSA, LeetCode (400+) & Competitive Contests" },
        { name: "C", icon: "Cpu", description: "Low-level system logic, memory understanding & Arduino projects" },
        { name: "JavaScript", icon: "Globe", description: "Dynamic web development, DOM manipulation & client-side apps" },
        { name: "HTML5 / CSS3", icon: "Layout", description: "Semantic markup, modern layouts, Flexbox/Grid & responsive CSS" }
      ]
    },
    {
      category: "Libraries & ML Frameworks",
      description: "Data science, deep learning, NLP, and signal processing toolkits",
      skills: [
        { name: "LangChain", icon: "Brain", description: "Chaining LLM prompts, document loaders & retrieval workflows" },
        { name: "TensorFlow / Keras", icon: "Layers", description: "Neural network architectures for audio & emotion classification" },
        { name: "Scikit-learn", icon: "Binary", description: "Supervised & unsupervised learning, classification pipelines" },
        { name: "Librosa", icon: "Music", description: "Acoustic signal analysis, MFCC, mel spectrogram extraction" },
        { name: "Pandas & NumPy", icon: "Database", description: "High-performance vector computation & structured data analysis" },
        { name: "Flask", icon: "Server", description: "Lightweight REST API backend for AI and web interfaces" },
        { name: "Streamlit", icon: "MonitorPlay", description: "Rapid interactive deployment for data science prototypes" },
        { name: "Matplotlib", icon: "LineChart", description: "Statistical visualizations & acoustic spectrum plotting" }
      ]
    },
    {
      category: "Technical & Computer Science Concepts",
      description: "Foundational software engineering principles and core CS pillars",
      skills: [
        { name: "Data Structures & Algorithms", icon: "GitFork", description: "Arrays, Trees, Graphs, DP, Heaps, Greedy algorithms" },
        { name: "Machine Learning", icon: "Workflow", description: "Feature engineering, model evaluation, cosine similarity, clustering" },
        { name: "Web Development", icon: "Laptop", description: "Full lifecycle UI engineering, client-server communication" },
        { name: "Problem Solving", icon: "CheckCircle2", description: "Translating ambiguous real-world constraints into discrete code" },
        { name: "Vector Databases", icon: "HardDrive", description: "Similarity search, vector indexing & semantic chunking" }
      ]
    },
    {
      category: "Platforms & Developer Tools",
      description: "Operating systems, hardware prototyping, and runtime environments",
      skills: [
        { name: "Linux", icon: "TerminalSquare", description: "Command-line navigation, shell utilities & environment control" },
        { name: "Windows", icon: "AppWindow", description: "Desktop developer workflows & local tooling" },
        { name: "Web / Cloud", icon: "Cloud", description: "Modern browser APIs, HTTP protocols & remote deployment" },
        { name: "Arduino", icon: "Radio", description: "Hardware interaction, microcontroller programming & sensors" },
        { name: "Git & GitHub", icon: "GitBranch", description: "Version control, branching, repository management & code reviews" }
      ]
    },
    {
      category: "Professional & Leadership Skills",
      description: "Core competencies demonstrated in institute contests and client engagements",
      skills: [
        { name: "Analytical Thinking", icon: "Search", description: "Deconstructing complex problems into methodical algorithmic steps" },
        { name: "Problem Setting", icon: "HelpCircle", description: "Formulating contest problems and robust boundary test cases" },
        { name: "Leadership", icon: "Users", description: "Guiding institute-level coding competitions with 100+ attendees" },
        { name: "Communication", icon: "MessageSquare", description: "Translating stakeholder needs into concise technical milestones" },
        { name: "Event & Time Management", icon: "Clock", description: "Balancing engineering coursework, competitive coding, and freelancing" }
      ]
    }
  ],

  projects: [
    {
      id: "rag-chatbot",
      title: "RAG-Based Knowledge Chatbot",
      subtitle: "Retrieval-Augmented Generation for Custom Document Intelligence",
      category: "AI / ML" as const,
      description: "Built an intelligent Retrieval-Augmented Generation (RAG) conversational agent that ingests documents into a vector database and grounds LLM responses with accurate, verifiable context from private knowledge repositories.",
      technologies: ["Python", "LangChain", "LLM APIs", "Vector Database", "Flask"],
      keyFeatures: [
        "Automated document chunking and vector embedding generation pipeline",
        "Vector storage with high-precision similarity-based k-NN retrieval",
        "Lightweight, low-latency Flask REST interface for real-time streaming queries",
        "Hallucination mitigation via prompt grounding and source attribution"
      ],
      contributions: [
        "Architected the end-to-end embedding pipeline from scratch using LangChain",
        "Engineered the Flask API endpoint and structured response schema",
        "Optimized chunk size and overlap parameters for maximum semantic fidelity"
      ],
      githubUrl: "https://github.com/anshyadav669",
      accentColor: "#FFD600",
      architectureDetails: "Document Ingestion → Text Splitting & Tokenization → Vector Embeddings Generation → Vector DB Storage → User Query Embedding → Cosine Similarity Retrieval → Context Augmented Prompt → LLM API → Flask Client Interface",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "speech-emotion-recognition",
      title: "Speech Emotion Recognition System",
      subtitle: "Deep Learning Audio Signal Classification Pipeline",
      category: "AI / ML" as const,
      description: "Developed a deep learning model to classify human emotional states (happy, sad, neutral, angry, etc.) directly from raw speech audio signals, deploying an interactive live testbench on Streamlit.",
      technologies: ["Python", "Librosa", "TensorFlow/Keras", "NumPy", "Pandas", "Scikit-learn", "Matplotlib", "Streamlit"],
      keyFeatures: [
        "Acoustic feature extraction extracting MFCC, Chroma, and Mel-scaled spectrograms",
        "Multi-layer deep neural network trained and evaluated on audio emotion corpora",
        "Real-time waveform upload and classification with confidence probability breakdowns",
        "Interactive visual plots of audio frequency spectra via Matplotlib"
      ],
      contributions: [
        "Designed the audio preprocessing and feature matrix normalization pipeline using Librosa",
        "Implemented TensorFlow/Keras neural network architecture with dropout regularization",
        "Deployed the fully interactive Streamlit web dashboard for live audio predictions"
      ],
      githubUrl: "https://github.com/anshyadav669",
      liveUrl: "https://github.com/anshyadav669",
      accentColor: "#FFE94A",
      architectureDetails: "Raw Audio Waveform (.wav) → Librosa Signal Processing → Feature Extraction (MFCC + Chroma + Mel Spectrogram) → Feature Scaling → TensorFlow/Keras Deep Model → Emotion Class Probabilities → Streamlit Web UI",
      imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "music-genre-prediction",
      title: "Music Genre Prediction Engine",
      subtitle: "Machine Learning Classifier for Acoustic Feature Profiling",
      category: "AI / ML" as const,
      description: "Built a machine learning system to predict musical genres from acoustic spectral features of song tracks. Trained, validated, and benchmarked multiple classifier algorithms to select the optimal model.",
      technologies: ["Python", "Librosa", "Pandas", "NumPy", "Scikit-learn", "TensorFlow/Keras", "Matplotlib", "Streamlit"],
      keyFeatures: [
        "Comprehensive audio feature engineering: zero-crossing rate, spectral centroid, rolloff, tempo",
        "Systematic comparison of multiple classifiers (SVM, Random Forest, Neural Networks)",
        "Confusion matrix and ROC metric evaluation to identify highest-performing model",
        "Streamlit web interface allowing users to upload audio files and inspect genre breakdowns"
      ],
      contributions: [
        "Authored the multi-classifier benchmarking suite in Scikit-learn and evaluated precision/recall",
        "Conducted spectral feature importance analysis to optimize inference speed",
        "Created user-friendly Streamlit dashboard for real-time track classification"
      ],
      githubUrl: "https://github.com/anshyadav669",
      liveUrl: "https://github.com/anshyadav669",
      accentColor: "#FFD600",
      architectureDetails: "Audio Dataset Ingestion → Signal Segmentation → Spectral & Temporal Extraction → Hyperparameter Tuning → Multi-Classifier Benchmark → Best Model Serialization → Streamlit Deployment",
      imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "movie-recommendation-system",
      title: "Movie Recommendation System",
      subtitle: "Hybrid Content-Based & Collaborative Filtering Engine",
      category: "AI / ML" as const,
      description: "Engineered a personalized movie recommendation engine combining content-based feature similarity with collaborative filtering matrices to surface highly accurate cinematic suggestions.",
      technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Streamlit"],
      keyFeatures: [
        "Cosine similarity computation across high-dimensional genre and metadata vector spaces",
        "Content-based filtering using plot tags, directors, cast, and keyword tokens",
        "Collaborative filtering scoring to overcome cold-start bias",
        "Interactive Streamlit application with instant search query auto-completion"
      ],
      contributions: [
        "Cleaned and merged extensive movie metadata datasets using Pandas and NumPy",
        "Engineered the vectorization and cosine similarity matrix calculation logic",
        "Designed the recommendation display layout showing similarity scores and posters"
      ],
      githubUrl: "https://github.com/anshyadav669",
      accentColor: "#C9A900",
      architectureDetails: "Dataset Wrangling → Metadata Vectorization → TF-IDF & Tag Bagging → Cosine Similarity Matrix → Filtering Logic → Interactive Streamlit Interface",
      imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "password-generator",
      title: "Modern Security Password Generator",
      subtitle: "Client-Side Cryptographic Strength Engine & Modern UI",
      category: "Frontend Utility" as const,
      description: "Built a secure, responsive password generator and strength evaluation utility with customizable character sets, entropy calculation, and instant one-click clipboard copying.",
      technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "Web Cryptography API"],
      keyFeatures: [
        "Real-time password entropy scoring and strength indicator (Weak, Moderate, Strong, Unbreakable)",
        "Adjustable length sliders (4 to 64 characters) with granular charset toggles (uppercase, lowercase, numbers, symbols)",
        "Seamless one-click clipboard copy feature with instant animated feedback",
        "Clean, dark-mode modern user interface fully responsive across desktop and mobile browsers"
      ],
      contributions: [
        "Implemented mathematically secure randomness using browser crypto APIs",
        "Developed custom DOM animation micro-interactions and strength visualization meters",
        "Crafted a mobile-first responsive layout with zero external framework dependencies"
      ],
      githubUrl: "https://github.com/anshyadav669",
      liveUrl: "https://github.com/anshyadav669",
      accentColor: "#FFD600",
      architectureDetails: "User Config Input → Crypto Random Byte Generation → Character Space Mapping → Entropy & Regex Strength Evaluation → DOM Micro-Interactions & Clipboard API",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80"
    }
  ],

  codingProfiles: [
    {
      platform: "LeetCode" as const,
      username: "anshyadav669",
      url: "https://leetcode.com/u/anshyadav669",
      accent: "#FFA116",
      badge: "400+ Problems Solved",
      stats: [
        { label: "Total Solved", value: "400+", detail: "Algorithmic Reasoning" },
        { label: "Focus Areas", value: "DSA", detail: "Arrays, DP, Graphs, Trees" },
        { label: "Primary Lang", value: "C++ / Python", detail: "Optimized Complexity" },
        { label: "Status", value: "Active", detail: "Continuous Daily Practice" }
      ],
      highlights: [
        "Consistently solved 400+ problems across diverse algorithmic domains",
        "Strong command of Data Structures, Dynamic Programming, and Graph Traversal",
        "Focus on achieving optimal O(N) time and O(1) space complexities"
      ]
    },
    {
      platform: "CodeChef" as const,
      username: "anshyadav669",
      url: "https://www.codechef.com/users/anshyadav669",
      accent: "#5B4638",
      badge: "4-Star Coder ★★★★",
      stats: [
        { label: "Star Rating", value: "4-Star", detail: "Verified CodeChef 4★" },
        { label: "Contest Rank", value: "Rank 31", detail: "Secured in CodeChef Contest" },
        { label: "Problem Type", value: "Ad-hoc & Math", detail: "Speed & Accuracy" },
        { label: "Track Record", value: "Top Performer", detail: "Contest Performance" }
      ],
      highlights: [
        "Achieved prestigious 4-Star Coder status on CodeChef through consistent algorithmic contest mastery",
        "Secured impressive Rank 31 in a competitive CodeChef contest",
        "Proven ability to solve complex problems under strict timed conditions"
      ]
    },
    {
      platform: "GitHub" as const,
      username: "anshyadav669",
      url: "https://github.com/anshyadav669",
      accent: "#FFD600",
      badge: "Open Source Repos",
      stats: [
        { label: "Profile", value: "@anshyadav669", detail: "GitHub Developer" },
        { label: "Focus", value: "AI, ML, Web", detail: "RAG, Librosa, Web Apps" },
        { label: "Stack", value: "Python / JS", detail: "Modern Tooling" },
        { label: "Status", value: "Active", detail: "Regular Code Commits" }
      ],
      highlights: [
        "Hosts codebases for RAG chatbot, Speech Emotion Recognition, and Music Genre ML",
        "Well-structured repositories with comprehensive READMEs and documentation",
        "Clean commit history demonstrating incremental architecture development"
      ]
    }
  ],

  experience: [
    {
      role: "Freelance Web Developer",
      organization: "Startup Projects",
      location: "Remote",
      duration: "2024 – Present",
      isCurrent: true,
      responsibilities: [
        "Develop responsive, user-focused websites for early-stage startups, translating business requirements into high-performance functional web pages.",
        "Manage frontend implementation and cloud deployment, prioritizing mobile responsiveness, cross-browser compatibility, and sub-second load times.",
        "Collaborate directly with startup founders to rapidly iterate on MVP designs, user feedback, and interactive prototypes."
      ],
      technologies: ["JavaScript", "HTML5", "CSS3", "React", "Responsive Design", "Performance Optimization"]
    },
    {
      role: "Problem Setter",
      organization: "NIT Silchar Coding Contests",
      location: "NIT Silchar, Assam",
      duration: "2024 – Present",
      isCurrent: true,
      responsibilities: [
        "Create novel algorithmic problems and rigorous test cases for institute-level programming contests with 100+ active participants.",
        "Formulate corner cases, stress test problem solutions, and define optimal time/memory complexity limits in C++ and Python.",
        "Assist peers in post-contest editorial discussions, mentoring junior developers in algorithmic reasoning and debugging."
      ],
      technologies: ["C++", "Python", "Data Structures", "Algorithms", "Competitive Programming", "Test Case Generation"]
    }
  ],

  education: [
    {
      institution: "National Institute of Technology, Silchar",
      degree: "Bachelor of Technology",
      field: "Civil Engineering",
      location: "Assam, India",
      duration: "August 2024 – June 2028",
      score: "8.12",
      scoreType: "CGPA" as const,
      highlights: [
        "Strong academic standing with CGPA of 8.12 at a premier National Institute of Technology",
        "Active contributor to technical clubs, coding initiatives, and problem-setting teams",
        "Rigorous coursework in computational mathematics, analytical mechanics, and systems thinking"
      ]
    },
    {
      institution: "Bakshi’s Springdales School",
      degree: "Higher Secondary Certificate (HSC) — Class XII",
      field: "Science Stream (PCM)",
      location: "Kota, India",
      duration: "July 2022 – June 2023",
      score: "91%",
      scoreType: "Percentage" as const,
      highlights: [
        "Graduated with Distinction scoring 91% in senior secondary board examinations",
        "Intensive analytical foundation in Physics, Chemistry, and Advanced Mathematics",
        "Honed competitive examination problem-solving techniques in Kota's academic hub"
      ]
    },
    {
      institution: "Vidyashram Public School",
      degree: "Secondary School Certificate (SSC) — Class X",
      field: "General Academics",
      location: "Kota, India",
      duration: "July 2023 – June 2024",
      score: "90.8%",
      scoreType: "Percentage" as const,
      highlights: [
        "Secured outstanding academic score of 90.8% in Class X examinations",
        "Recognized for academic excellence, logical aptitude, and mathematical foundation"
      ]
    }
  ],

  achievements: [
    {
      title: "Solved 400+ Problems on LeetCode",
      description: "Strengthened algorithmic reasoning, time-space efficiency, and deep proficiency in Data Structures and Algorithms.",
      badge: "400+ Milestone",
      category: "Competitive Coding"
    },
    {
      title: "Achieved 4-Star Coder on CodeChef",
      description: "Recognized as a verified 4-Star Coder through consistent competitive contest performances against global peers.",
      badge: "4-Star Coder",
      category: "Global Ranking"
    },
    {
      title: "Secured Rank 31 in CodeChef Contest",
      description: "Demonstrated exceptional speed and accuracy under timed competition pressure, outperforming hundreds of participants.",
      badge: "Global Rank 31",
      category: "Contest Victory"
    },
    {
      title: "Problem Setter for 100+ Participants",
      description: "Appointed to design and author algorithmic challenges for institute-level coding competitions at NIT Silchar.",
      badge: "Contest Architect",
      category: "Leadership"
    }
  ],

  philosophy: [
    {
      title: "Algorithmic Precision First",
      quote: "Before writing a single line of framework boilerplate, understand the fundamental data structures and algorithmic complexity. Elegant software is born from clear logic.",
      icon: "Binary"
    },
    {
      title: "Real-World Pragmatism",
      quote: "Whether engineering an ML audio classifier or building a startup landing page, software exists to solve real human problems efficiently, securely, and reliably.",
      icon: "Compass"
    },
    {
      title: "Continuous Craftsmanship",
      quote: "From 400+ LeetCode problems to cutting-edge RAG pipelines, true mastery is the byproduct of deliberate, persistent daily practice.",
      icon: "Sparkles"
    }
  ]
};
