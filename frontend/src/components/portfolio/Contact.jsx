import React, { useState } from "react";
import { toast } from "sonner";
import { Section, SectionHeader } from "./Section";
import { submitContact } from "@/lib/api";
import { PROFILE } from "@/data/portfolio";
import { FiSend, FiMail, FiMapPin, FiPhone, FiDownload } from "react-icons/fi";
import { SiGithub, SiLeetcode, SiCodechef } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Name required";
        if (!form.email.trim()) e.email = "Email required";
        else if (!emailRe.test(form.email)) e.email = "Invalid email";
        if (!form.message.trim()) e.message = "Message required";
        else if (form.message.trim().length < 10) e.message = "At least 10 chars";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            await submitContact(form);
            toast.success("Message sent. I'll get back to you shortly.");
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch (err) {
            toast.error("Something went wrong. Try again in a moment.");
        } finally {
            setLoading(false);
        }
    };

    const set = (k) => (ev) => setForm({ ...form, [k]: ev.target.value });

    return (
        <Section id="contact">
            <SectionHeader index="07" sub="say hi" title="Let's build something." />

            <div className="grid lg:grid-cols-5 gap-8">
                {/* Info column */}
                <div className="lg:col-span-2 space-y-6">
                    <p className="font-mono text-sm text-zinc-300 leading-relaxed">
                        Have a project, a role, or a hard problem you want to talk through? Drop a line — I read every message.
                    </p>

                    <div className="space-y-4">
                        <ContactRow icon={<FiMail />} label="Email" value={PROFILE.email} href={`mailto:${PROFILE.email}`} testId="contact-email-row" />
                        <ContactRow icon={<FiPhone />} label="Phone" value={PROFILE.phone} href={`tel:${PROFILE.phone}`} testId="contact-phone-row" />
                        <ContactRow icon={<FiMapPin />} label="Location" value={PROFILE.location} testId="contact-location-row" />
                    </div>

                    <a
                        href={PROFILE.resumeUrl}
                        download
                        className="inline-flex items-center gap-2 px-5 py-3 border border-ink-600 text-zinc-200 font-mono text-xs uppercase tracking-widest hover:border-brand hover:text-brand transition-colors"
                        data-testid="contact-resume-download"
                    >
                        <FiDownload /> Download resume
                    </a>

                    <div className="pt-4 flex items-center gap-5">
                        {[
                            { icon: <SiGithub size={18} />, href: PROFILE.socials.github, label: "github" },
                            { icon: <FaLinkedinIn size={18} />, href: PROFILE.socials.linkedin, label: "linkedin" },
                            { icon: <SiLeetcode size={18} />, href: PROFILE.socials.leetcode, label: "leetcode" },
                            { icon: <SiCodechef size={18} />, href: PROFILE.socials.codechef, label: "codechef" },
                        ].map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noreferrer"
                                className="text-zinc-400 hover:text-brand transition-colors"
                                aria-label={s.label}
                                data-testid={`contact-social-${s.label}`}
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Form column */}
                <form onSubmit={onSubmit} className="lg:col-span-3 border border-ink-600 bg-ink-800 p-6 sm:p-10 space-y-6" data-testid="contact-form" noValidate>
                    <Field
                        id="name"
                        label="Name"
                        value={form.name}
                        onChange={set("name")}
                        error={errors.name}
                        placeholder="your name"
                    />
                    <Field
                        id="email"
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        error={errors.email}
                        placeholder="you@domain.com"
                    />
                    <Field
                        id="subject"
                        label="Subject"
                        value={form.subject}
                        onChange={set("subject")}
                        placeholder="collab / project / opportunity"
                    />
                    <div>
                        <label htmlFor="message" className="block font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-400 mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows={5}
                            value={form.message}
                            onChange={set("message")}
                            placeholder="tell me about what you're building…"
                            className="w-full bg-ink-900 border border-ink-600 focus:border-brand focus:outline-none px-4 py-3 font-mono text-sm text-zinc-100 placeholder:text-zinc-600 rounded-none resize-none"
                            data-testid="contact-message-input"
                        />
                        {errors.message && (
                            <p className="mt-2 font-mono text-xs text-red-400">{errors.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group inline-flex items-center gap-3 px-8 py-3 bg-brand text-black font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-brand-hover disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                        data-testid="contact-submit-btn"
                    >
                        {loading ? "sending…" : "send message"}
                        <FiSend className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>
            </div>
        </Section>
    );
};

const Field = ({ id, label, value, onChange, error, placeholder, type = "text" }) => (
    <div>
        <label htmlFor={id} className="block font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-400 mb-2">
            {label}
        </label>
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-ink-900 border border-ink-600 focus:border-brand focus:outline-none px-4 py-3 font-mono text-sm text-zinc-100 placeholder:text-zinc-600 rounded-none"
            data-testid={`contact-${id}-input`}
        />
        {error && <p className="mt-2 font-mono text-xs text-red-400">{error}</p>}
    </div>
);

const ContactRow = ({ icon, label, value, href, testId }) => {
    const inner = (
        <>
            <span className="w-10 h-10 border border-ink-600 flex items-center justify-center text-brand shrink-0">
                {icon}
            </span>
            <div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-zinc-500">{label}</div>
                <div className="font-mono text-sm text-zinc-200 break-all">{value}</div>
            </div>
        </>
    );
    if (href) {
        return (
            <a href={href} className="flex items-center gap-4 hover:text-brand group" data-testid={testId}>
                {inner}
            </a>
        );
    }
    return <div className="flex items-center gap-4" data-testid={testId}>{inner}</div>;
};
