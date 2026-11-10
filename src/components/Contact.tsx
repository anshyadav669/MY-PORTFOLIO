import React, { useState } from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { sound } from '../utils/sound';
import { GithubIcon, LinkedinIcon } from './icons';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  Code2, 
  Sparkles, 
  Terminal 
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setIsSubmitting(true);

    const encode = (data: Record<string, string>) => {
      return Object.keys(data)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
    };

    // Submits directly to Netlify Forms backend API
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...formData }),
    })
      .then(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        sound.playSuccess();
      })
      .catch((error) => {
        console.warn('Netlify form submission falling back to mail client:', error);
        setIsSubmitting(false);
        setIsSubmitted(true);
        sound.playSuccess();

        // Local dev or offline fallback: open email client
        const mailtoLink = `mailto:${RESUME_DATA.personal.email}?subject=${encodeURIComponent(
          formData.subject || 'Portfolio Inquiry'
        )}&body=${encodeURIComponent(
          `From: ${formData.name} (${formData.email})\n\n${formData.message}`
        )}`;
        window.location.href = mailtoLink;
      });
  };

  const copyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(RESUME_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(RESUME_DATA.personal.mobile);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-transparent overflow-hidden border-t border-white/[0.06] z-10">
      {/* Background Spotlights */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#FFD600]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#FF3838]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#FFD600] tracking-widest uppercase">
              <Terminal className="w-3.5 h-3.5 text-[#FFD600]" />
              <span>// 09 INITIATE CONTACT PROTOCOL</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-outfit font-black tracking-tight text-white leading-tight">
              LET&apos;S BUILD <br />
              <span className="text-[#FFD600] relative inline-block">
                SOMETHING GREAT
                <span className="absolute bottom-1 left-0 w-full h-[4px] bg-[#FF3838] opacity-80 rounded" />
              </span>
              .
            </h2>
          </div>
          <p className="mt-4 sm:mt-0 font-mono text-xs text-neutral-400">
            TRANSMISSION_GATE: <span className="text-[#FFD600]">READY</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Credentials & Direct Action */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-white/[0.08] relative overflow-hidden group">
              <div className="hud-corner-tl" />
              <div className="hud-corner-tr" />
              <div className="hud-corner-bl" />
              <div className="hud-corner-br" />

              <h3 className="text-xl font-outfit font-bold text-white mb-2">
                Open for Opportunities
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed mb-6">
                Whether you have an early-stage startup looking for a high-velocity frontend engineer, a machine learning challenge, or an internship role, let&apos;s talk.
              </p>

              {/* Direct Info Tiles */}
              <div className="space-y-3 font-mono text-xs">
                {/* Email */}
                <div className="p-3.5 rounded-xl bg-[#111111] border border-white/[0.06] hover:border-[#FFD600]/40 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#FFD600]" />
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase block">EMAIL</span>
                      <a href={`mailto:${RESUME_DATA.personal.email}`} className="text-white hover:text-[#FFD600] transition-colors truncate max-w-[200px] block">
                        {RESUME_DATA.personal.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={copyEmail}
                    title="Copy Email"
                    className="p-1.5 rounded-lg bg-[#1a1a1a] hover:bg-[#FFD600] text-neutral-300 hover:text-black transition-colors"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Mobile Phone */}
                <div className="p-3.5 rounded-xl bg-[#111111] border border-white/[0.06] hover:border-[#FFD600]/40 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#FFD600]" />
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase block">MOBILE / WHATSAPP</span>
                      <a href={`tel:${RESUME_DATA.personal.mobile}`} className="text-white hover:text-[#FFD600] transition-colors">
                        {RESUME_DATA.personal.mobile}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={copyPhone}
                    title="Copy Phone"
                    className="p-1.5 rounded-lg bg-[#1a1a1a] hover:bg-[#FFD600] text-neutral-300 hover:text-black transition-colors"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Location */}
                <div className="p-3.5 rounded-xl bg-[#111111] border border-white/[0.06] flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#FF3838]" />
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block">LOCATION</span>
                    <span className="text-white">{RESUME_DATA.personal.location}</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 mt-6 border-t border-white/[0.06]">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-3">
                  CONNECT DIRECTLY:
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href={RESUME_DATA.personal.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => sound.playHover()}
                    className="p-2.5 rounded-xl bg-[#111111] border border-white/[0.08] hover:border-[#FFD600] text-neutral-300 hover:text-[#FFD600] transition-all hover:scale-110"
                    title="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>

                  <a
                    href={RESUME_DATA.personal.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => sound.playHover()}
                    className="p-2.5 rounded-xl bg-[#111111] border border-white/[0.08] hover:border-[#FFD600] text-neutral-300 hover:text-[#FFD600] transition-all hover:scale-110"
                    title="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>

                  <a
                    href={RESUME_DATA.personal.leetcodeUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => sound.playHover()}
                    className="p-2.5 rounded-xl bg-[#111111] border border-white/[0.08] hover:border-[#FFA116] text-neutral-300 hover:text-[#FFA116] transition-all hover:scale-110"
                    title="LeetCode (400+ Solved)"
                  >
                    <Code2 className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/[0.08] relative group">
              <div className="hud-corner-tl" />
              <div className="hud-corner-tr" />
              <div className="hud-corner-bl" />
              <div className="hud-corner-br" />

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#FFD600]/20 border border-[#FFD600] flex items-center justify-center text-[#FFD600] mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-outfit font-black text-white">
                    Transmission Dispatched!
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 font-sans max-w-md mx-auto">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your message has been transmitted and delivered directly to Ansh via Netlify. I will respond to <strong className="text-[#FFD600]">{formData.email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#171717] border border-white/[0.1] text-xs font-mono text-neutral-300 hover:text-[#FFD600] hover:border-[#FFD600] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form 
                  name="contact" 
                  method="POST" 
                  data-netlify="true" 
                  data-netlify-honeypot="bot-field" 
                  onSubmit={handleSubmit} 
                  className="space-y-5"
                >
                  {/* Hidden inputs required for Netlify Forms routing */}
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
                    </label>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                        YOUR FULL NAME *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full bg-[#111111] border border-white/[0.1] focus:border-[#FFD600] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-[#FFD600] transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@example.com"
                        className="w-full bg-[#111111] border border-white/[0.1] focus:border-[#FFD600] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-[#FFD600] transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                      SUBJECT / PURPOSE *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Startup Frontend Collaboration / Internship Opportunity"
                      className="w-full bg-[#111111] border border-white/[0.1] focus:border-[#FFD600] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-[#FFD600] transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                      YOUR MESSAGE *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hello Ansh, I reviewed your work on the RAG Chatbot and 400+ LeetCode track record. We'd love to talk about..."
                      className="w-full bg-[#111111] border border-white/[0.1] focus:border-[#FFD600] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-[#FFD600] transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => sound.playHover()}
                    className="w-full py-4 rounded-xl bg-[#FFD600] text-black font-grotesk font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,214,0,0.4)] hover:shadow-[0_0_40px_rgba(255,214,0,0.7)] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>DISPATCHING TRANSMISSION...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>DISPATCH DIRECT TRANSMISSION</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
