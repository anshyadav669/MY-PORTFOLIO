import React, { useState } from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { sound } from '../utils/sound';
import { 
  X, 
  Printer, 
  Copy, 
  Check 
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleCopyText = () => {
    sound.playSuccess();
    const plainText = `
ANSH KUMAR YADAV
Email: ${RESUME_DATA.personal.email} | Mobile: ${RESUME_DATA.personal.mobile}
GitHub: ${RESUME_DATA.personal.githubUrl} | LinkedIn: ${RESUME_DATA.personal.linkedinUrl}

EDUCATION
• National Institute of Technology, Silchar — B.Tech (Civil Engineering), CGPA: 8.12 (August 2024 – June 2028)
• Bakshi's Springdales School, Kota — HSC; Percentage: 91% (July 2022 – June 2023)
• Vidyashram Public School, Kota — SSC; Percentage: 90.8% (July 2023 – June 2024)

EXPERIENCE
• Freelance Web Developer (Remote, Startup Projects, 2024 – Present)
  - Develop responsive, user-focused websites for early-stage startups.
  - Manage frontend implementation and deployment, focusing on mobile responsiveness and performance.
• Problem Setter (NIT Silchar Coding Contests, 2024 – Present)
  - Create algorithmic problems and test cases for institute-level contests with 100+ participants.

PROJECTS
• RAG-Based Chatbot (Python, LangChain, LLM APIs, Vector Database, Flask)
  - Retrieval-Augmented Generation chatbot retrieving context from custom knowledge base.
  - Implemented document chunking, embedding generation, vector storage, and lightweight Flask interface.
• Password Generator (HTML, CSS, JavaScript)
  - Secure, responsive password generator with adjustable length, character sets, and real-time entropy evaluation.
• Speech Emotion Recognition (Python, Librosa, TensorFlow/Keras, Streamlit)
  - Deep learning audio classification extracting MFCC, chroma, and mel spectrogram features.
• Music Genre Prediction Model (Python, Librosa, Scikit-learn, Streamlit)
  - Machine learning classification benchmarking multiple models on audio features.
• Movie Recommendation System (Python, Pandas, Scikit-learn, Streamlit)
  - Recommendation engine using content-based and collaborative filtering with cosine similarity.

SKILLS
• Languages: Python, C++, C, JavaScript, HTML/CSS
• Libraries: Pandas, NumPy, Scikit-learn, TensorFlow/Keras, Librosa, Matplotlib, Streamlit, Flask, LangChain
• Technical Skills: Data Structures and Algorithms, Machine Learning, Web Development, Problem Solving
• Platforms: Linux, Windows, Web, Arduino

ACHIEVEMENTS & COMPETITIVE PROGRAMMING
• Solved 400+ problems on LeetCode.
• Achieved 2-Star Coder status on CodeChef.
• Secured Rank 31 in a CodeChef contest.
    `.trim();

    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0d0d0d] border border-[#FFD600]/40 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Header Bar (Hidden in Print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141414] border-b border-white/[0.08] print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFD600] animate-pulse" />
            <span className="font-grotesk font-black text-sm text-white tracking-wider">
              OFFICIAL RESUME DOCUMENT // ANSH KUMAR YADAV
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-lg bg-[#1f1f1f] hover:bg-[#2a2a2a] text-neutral-300 text-xs font-mono flex items-center gap-1.5 border border-white/[0.08] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#FFD600]" />}
              <span>{copied ? 'Copied ATS Text' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-lg bg-[#FFD600] text-black font-grotesk font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,214,0,0.4)] hover:bg-[#FFE94A] transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-[#1f1f1f] text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Container */}
        <div className="overflow-y-auto p-6 sm:p-10 bg-white text-black font-sans leading-relaxed print:p-0 print:m-0 selection:bg-neutral-300 selection:text-black">
          {/* Header */}
          <div className="border-b-2 border-black pb-4 mb-5">
            <h1 className="text-3xl font-black tracking-tight text-neutral-900 font-serif">
              ANSH KUMAR YADAV
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-700 mt-2 font-mono">
              <span><strong>Email:</strong> {RESUME_DATA.personal.email}</span>
              <span><strong>Mobile:</strong> {RESUME_DATA.personal.mobile}</span>
              <span>
                <strong>GitHub:</strong>{' '}
                <a href={RESUME_DATA.personal.githubUrl} className="text-blue-700 underline" target="_blank" rel="noreferrer">
                  github.com/anshyadav669
                </a>
              </span>
              <span>
                <strong>LinkedIn:</strong>{' '}
                <a href={RESUME_DATA.personal.linkedinUrl} className="text-blue-700 underline" target="_blank" rel="noreferrer">
                  ansh-kumar-yadav
                </a>
              </span>
            </div>
          </div>

          {/* Education */}
          <div className="mb-5">
            <h2 className="text-sm font-bold tracking-widest uppercase border-b border-neutral-300 pb-1 mb-2 font-mono text-neutral-900">
              Education
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-baseline">
                <div>
                  <strong className="text-neutral-900">National Institute of Technology, Silchar</strong> — <em>Bachelor of Technology – Civil Engineering; CGPA: 8.12</em>
                </div>
                <div className="text-right text-neutral-600 font-mono text-[11px]">
                  Assam, India | Aug 2024 – June 2028
                </div>
              </div>

              <div className="flex justify-between items-baseline">
                <div>
                  <strong className="text-neutral-900">Bakshi’s Springdales School</strong> — <em>HSC; Percentage: 91</em>
                </div>
                <div className="text-right text-neutral-600 font-mono text-[11px]">
                  Kota, India | July 2022 – June 2023
                </div>
              </div>

              <div className="flex justify-between items-baseline">
                <div>
                  <strong className="text-neutral-900">Vidyashram Public School</strong> — <em>SSC; Percentage: 90.8</em>
                </div>
                <div className="text-right text-neutral-600 font-mono text-[11px]">
                  Kota, India | July 2023 – June 2024
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-5">
            <h2 className="text-sm font-bold tracking-widest uppercase border-b border-neutral-300 pb-1 mb-2 font-mono text-neutral-900">
              Experience
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between items-baseline">
                  <div>
                    <strong className="text-neutral-900">Freelance Web Developer</strong> — <em>Startup Projects</em>
                  </div>
                  <div className="text-right text-neutral-600 font-mono text-[11px]">
                    Remote | 2024 – Present
                  </div>
                </div>
                <ul className="list-disc list-inside text-neutral-800 space-y-0.5 mt-1 pl-1">
                  <li>Develop responsive, user-focused websites for early-stage startups, translating requirements into functional web pages.</li>
                  <li>Manage frontend implementation and deployment, focusing on mobile responsiveness, usability, and performance.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <div>
                    <strong className="text-neutral-900">Problem Setter</strong> — <em>Coding Contests</em>
                  </div>
                  <div className="text-right text-neutral-600 font-mono text-[11px]">
                    NIT Silchar | 2024 – Present
                  </div>
                </div>
                <ul className="list-disc list-inside text-neutral-800 space-y-0.5 mt-1 pl-1">
                  <li>Create algorithmic problems and test cases for institute-level contests with 100+ participants.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="mb-5">
            <h2 className="text-sm font-bold tracking-widest uppercase border-b border-neutral-300 pb-1 mb-2 font-mono text-neutral-900">
              Projects
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-neutral-900">RAG-Based Chatbot</div>
                  <div className="text-[11px] font-mono text-neutral-600">Python, LangChain, LLM APIs, Vector Database, Flask</div>
                </div>
                <ul className="list-disc list-inside text-neutral-800 space-y-0.5 mt-0.5 pl-1">
                  <li>Built a Retrieval-Augmented Generation chatbot that retrieves context from a custom knowledge base.</li>
                  <li>Implemented document chunking, embedding generation, and vector storage for similarity-based retrieval.</li>
                  <li>Developed a lightweight Flask interface for real-time user interaction with the chatbot.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-neutral-900">Password Generator</div>
                  <div className="text-[11px] font-mono text-neutral-600">HTML, CSS, JavaScript</div>
                </div>
                <ul className="list-disc list-inside text-neutral-800 space-y-0.5 mt-0.5 pl-1">
                  <li>Built a secure, responsive password generator with adjustable length and character sets.</li>
                  <li>Implemented real-time strength evaluation and a one-click clipboard copy feature.</li>
                  <li>Focused on a clean, modern UI optimized for both desktop and mobile devices.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-neutral-900">Speech Emotion Recognition</div>
                  <div className="text-[11px] font-mono text-neutral-600">Python, Librosa, NumPy, Pandas, Scikit-learn, TensorFlow/Keras, Matplotlib, Streamlit</div>
                </div>
                <ul className="list-disc list-inside text-neutral-800 space-y-0.5 mt-0.5 pl-1">
                  <li>Developed a deep learning model to classify human emotions from speech audio signals.</li>
                  <li>Extracted audio features (MFCC, chroma, mel spectrogram) with Librosa to train and evaluate the model.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-neutral-900">Music Genre Prediction Model</div>
                  <div className="text-[11px] font-mono text-neutral-600">Python, Librosa, Pandas, NumPy, Scikit-learn, TensorFlow/Keras, Matplotlib, Streamlit</div>
                </div>
                <ul className="list-disc list-inside text-neutral-800 space-y-0.5 mt-0.5 pl-1">
                  <li>Built a machine learning model to predict music genres from audio features of songs.</li>
                  <li>Trained and compared multiple classifiers to select the best-performing model for genre prediction.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-neutral-900">Movie Recommendation System</div>
                  <div className="text-[11px] font-mono text-neutral-600">Python, Pandas, NumPy, Scikit-learn, Matplotlib, Streamlit</div>
                </div>
                <ul className="list-disc list-inside text-neutral-800 space-y-0.5 mt-0.5 pl-1">
                  <li>Developed a movie recommendation engine using content-based and collaborative filtering techniques.</li>
                  <li>Implemented cosine similarity to generate personalized movie recommendations.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-5">
            <h2 className="text-sm font-bold tracking-widest uppercase border-b border-neutral-300 pb-1 mb-2 font-mono text-neutral-900">
              Skills
            </h2>
            <div className="text-xs space-y-1">
              <p><strong>Programming Languages:</strong> Python, C++, C, JavaScript, HTML/CSS</p>
              <p><strong>Libraries:</strong> Pandas, NumPy, Scikit-learn, TensorFlow/Keras, Librosa, Matplotlib, Streamlit, Flask, LangChain</p>
              <p><strong>Technical Skills:</strong> Data Structures and Algorithms, Machine Learning, Web Development, Problem Solving</p>
              <p><strong>Platforms:</strong> Linux, Windows, Web, Arduino</p>
              <p><strong>Professional Skills:</strong> Analytical Thinking, Communication, Leadership, Event Management, Time Management</p>
              <p><strong>Coding Profiles:</strong> LeetCode &bull; CodeChef</p>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase border-b border-neutral-300 pb-1 mb-2 font-mono text-neutral-900">
              Achievements and Competitive Programming
            </h2>
            <ul className="list-disc list-inside text-xs text-neutral-800 space-y-0.5 pl-1">
              <li>Solved 400+ problems on LeetCode, strengthening algorithmic reasoning and coding proficiency.</li>
              <li>Achieved 2-Star Coder status on CodeChef.</li>
              <li>Secured Rank 31 in a CodeChef contest.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
