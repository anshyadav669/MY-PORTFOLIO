# Ansh Kumar Yadav — Award-Winning Personal Developer Portfolio

An extraordinary, futuristic personal developer portfolio built for **Ansh Kumar Yadav**, undergraduate software engineer at the **National Institute of Technology, Silchar** (CGPA: 8.12), 400+ LeetCode solver, CodeChef 2-Star Coder (Rank 31), and startup web developer.

## 🚀 Live Visual & Design Identity
- **Palette**: Deep Black (`#080808`), Electric Yellow (`#FFD600`), Bright Yellow Highlight (`#FFE94A`), and Subtle Red Accent (`#FF3838`).
- **3D Interactive Core**: Integrated Spline 3D Reactive Orb (`https://my.spline.design/reactiveorb-2SXXd6xkKrgbxQQKE0CcHCeT/`) with toggleable WebGL Three.js Wireframe Geodesic Sphere.
- **Glassmorphism & Fluid Lighting**: Cursor-following radial light layers, HUD tech brackets, and coordinate rulers.
- **Micro-Interactions**: Web Audio API cybernetic sound effects (with mute toggle) and fluid custom cursor.
- **Resume Source of Truth**: 100% faithful to Ansh Kumar Yadav's actual resume (NIT Silchar, Kota 91%, Startup web developer, 5 machine learning & frontend projects, 400+ LeetCode).

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js + Spline 3D
- **Icons**: Lucide React + Custom Vectors
- **Audio**: Native Web Audio API Synthesizer (zero external audio asset dependencies)

---

## 💻 How to Run Locally

1. **Install Dependencies** (already installed in the workspace):
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

3. **Build for Production**:
   ```bash
   npm run build
   ```
   The production-optimized bundle is created in `dist/`.

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 📂 Project Architecture

```
├── index.html                 # Entry point with Google Fonts & HUD meta tags
├── package.json               # Dependencies and build scripts
├── vite.config.ts             # Vite configuration with chunk splitting
├── tailwind.config.js         # Custom electric yellow & black design system
├── src/
│   ├── main.tsx               # React DOM root
│   ├── App.tsx                # Main application orchestrator & intersection observer
│   ├── index.css              # Custom glassmorphism, HUD corners & grid utilities
│   ├── data/
│   │   └── resumeData.ts      # Structured data extracted from Ansh's resume
│   ├── utils/
│   │   └── sound.ts           # Web Audio API cybernetic SFX synthesizer
│   └── components/
│       ├── Navbar.tsx         # Fixed glass navbar with audio toggle & resume CTA
│       ├── Hero.tsx           # Fullscreen hero with cycling roles & 3D Reactive Orb
│       ├── ReactiveOrb.tsx    # Dual-mode Spline Reactive Orb & WebGL Geodesic sphere
│       ├── About.tsx          # Text-based editorial about section (No fake photos)
│       ├── Capabilities.tsx   # Fluid cursor-following spotlight service cards
│       ├── Skills.tsx         # Interactive categorized skills with live search
│       ├── Projects.tsx       # Vertically stacked full-width cinematic showcase (5 projects)
│       ├── ProjectModal.tsx   # Architectural deep-dive & pipeline breakdown modal
│       ├── PasswordGenLiveDemo.tsx # Live interactive password generator testbench
│       ├── CodingProfiles.tsx # LeetCode (400+), CodeChef (2-Star, Rank 31), GitHub
│       ├── Experience.tsx     # Startup web development & NIT Silchar Problem Setter
│       ├── Education.tsx      # NIT Silchar (8.12 CGPA), Bakshi's (91%), Vidyashram (90.8%)
│       ├── Philosophy.tsx     # 3 engineering core principles (replaces fake testimonials)
│       ├── Contact.tsx        # "LET'S BUILD SOMETHING GREAT" form & direct copy buttons
│       ├── Footer.tsx         # Station metrics, live IST clock, coordinates, social links
│       ├── ResumeModal.tsx    # Printable PDF & ATS plaintext resume viewer
│       ├── CustomCursor.tsx   # Desktop fluid magnetic cursor
│       └── icons.tsx          # Custom SVG icons
└── dist/                      # Production build assets
```

---

## 📜 Verified Resume Information Displayed
- **Name**: Ansh Kumar Yadav
- **Email**: `ansh-ug-24@civil.nits.ac.in`
- **Mobile**: `+91-9928943270`
- **GitHub**: `https://github.com/anshyadav669`
- **LinkedIn**: `https://linkedin.com/in/ansh-kumar-yadav`
- **LeetCode**: `https://leetcode.com/u/anshyadav669` (400+ Problems Solved)
- **CodeChef**: `https://www.codechef.com/users/anshyadav669` (2-Star Coder, Rank 31)
- **College**: National Institute of Technology, Silchar — B.Tech (2024–2028), CGPA: 8.12
- **Schooling**: Bakshi's Springdales School, Kota (HSC: 91%), Vidyashram Public School, Kota (SSC: 90.8%)
- **Projects**:
  1. RAG-Based Knowledge Chatbot (Python, LangChain, LLM APIs, Vector Database, Flask)
  2. Password Generator (HTML, CSS, JavaScript) — includes real interactive live testbench
  3. Speech Emotion Recognition (Python, Librosa, TensorFlow/Keras, Streamlit)
  4. Music Genre Prediction Model (Python, Librosa, Scikit-learn, Streamlit)
  5. Movie Recommendation System (Python, Pandas, Scikit-learn, Streamlit)
