"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock,
  Database,
  FileText,
  Laptop,
  Loader2,
  Lock,
  Mail,
  Megaphone,
  MessageCircle,
  Phone,
  Sparkles,
  Store,
  User,
} from "lucide-react";
import confetti from "canvas-confetti";

const WHATSAPP_NUMBER = "94702251601";

const services = [
  { id: "Website", icon: Laptop },
  { id: "POS System", icon: Store },
  { id: "In-House System", icon: Database },
  { id: "Social Media", icon: Megaphone },
  { id: "Other", icon: Sparkles },
];

const nextSteps = [
  { icon: Clock, title: "We reply within 24 hours", desc: "A real person reads every message." },
  { icon: CalendarCheck, title: "Free consultation", desc: "We talk through your goals, no obligation." },
  { icon: FileText, title: "Clear proposal", desc: "A fixed quote and timeline before any work starts." },
];

const MESSAGE_MAX = 1000;

type Fields = { name: string; email: string; phone: string; business: string; message: string };
type Errors = Partial<Record<keyof Fields | "services", string>>;

function validate(f: Fields, selected: string[]): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please tell us your name.";
  if (!f.email.trim()) e.email = "We need an email to reply to you.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "That email doesn't look quite right.";
  if (!f.phone.trim()) e.phone = "Add a number so we can call you back.";
  else if (f.phone.replace(/\D/g, "").length < 9) e.phone = "Please check the phone number.";
  if (selected.length === 0) e.services = "Pick at least one service.";
  if (f.message.trim().length < 10) e.message = "A sentence or two about your project helps us prepare.";
  return e;
}

/* Shared input styling: large hit area, quiet border, neon focus ring */
const inputBase =
  "w-full h-12 lg:h-11 rounded-xl border bg-white/[0.03] pl-11 pr-4 text-base text-white placeholder:text-dark-subtle transition-[border-color,box-shadow,background-color] duration-200 focus:outline-none focus:bg-white/[0.05] focus:border-neon/60 focus:ring-4 focus:ring-neon/10";

function Field({
  id,
  label,
  optional,
  error,
  icon: Icon,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-medium text-silver-light">
        <span>{label}</span>
        {optional && <span className="text-xs font-normal text-dark-subtle">Optional</span>}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-dark-subtle" />
        {children}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 text-sm text-[#FF8A80]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", phone: "", business: "", message: "" });
  const [selected, setSelected] = useState<string[]>([]);
  const [touched, setTouched] = useState<Partial<Record<keyof Errors, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const errors = validate(fields, selected);
  const showError = (k: keyof Errors) => (touched[k] ? errors[k] : undefined);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));
  const blur = (k: keyof Errors) => () => setTouched((t) => ({ ...t, [k]: true }));

  const toggleService = (id: string) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
    setTouched((t) => ({ ...t, services: true }));
  };

  const inputClass = (k: keyof Fields) =>
    `${inputBase} ${showError(k) ? "border-[#FF8A80]/60" : "border-white/10 hover:border-white/20"}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(errors).length) {
      setTouched({ name: true, email: true, phone: true, services: true, message: true });
      const first = (["services", "name", "email", "phone", "message"] as const).find((k) => errors[k]);
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setLoading(true);

    // TODO: send to a real endpoint (API route, Formspree, Resend…). This only simulates success.
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.65 }, colors: ["#79FC32", "#FFFFFF", "#A3A7AF"] });
    }, 900);
  };

  const reset = () => {
    setFields({ name: "", email: "", phone: "", business: "", message: "" });
    setSelected([]);
    setTouched({});
    setSubmitted(false);
  };

  const whatsappText = encodeURIComponent(
    `Hi Serenod, I'm ${fields.name || "interested in working with you"}.` +
      (selected.length ? ` I'm looking for: ${selected.join(", ")}.` : "") +
      (fields.message ? `\n\n${fields.message}` : "")
  );

  return (
    <section id="contact" className="section section-alt lg:!py-0 lg:min-h-[100svh] lg:flex lg:items-center">
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[400px] w-[500px] -translate-y-1/2 rounded-full bg-neon/[0.035] blur-[160px]" />

      {/* Desktop: spacing scales with screen height so the form fits one screen */}
      <div className="container-x lg:pt-[5.5rem] lg:pb-[2.5svh]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">

          {/* Left: promise, direct line, what happens next */}
          <div className="lg:col-span-5">
            <span className="eyebrow">Contact</span>
            <h2 className="section-title mb-6 lg:mb-[2.5svh] lg:text-[clamp(2rem,5.6svh,3.75rem)]">
              Let&apos;s build <span className="text-neon">something great</span> together.
            </h2>
            <p className="mb-10 lg:mb-[4svh] text-lead text-dark-muted">
              Tell us about your project and we&apos;ll get back to you within 24 hours to set up a free consultation.
            </p>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-12 lg:mb-[4.5svh] flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 pr-5 transition-colors hover:border-neon/40 hover:bg-neon/[0.04]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon/10 text-neon">
                <MessageCircle className="h-5 w-5" />
              </span>
              <span className="flex-1">
                <span className="block text-sm text-dark-muted">Prefer to talk? Call or WhatsApp</span>
                <span className="block text-lg font-semibold text-white">070 225 1601</span>
              </span>
              <ArrowRight className="h-5 w-5 text-dark-muted transition-all group-hover:translate-x-1 group-hover:text-neon" />
            </a>

            <h3 className="mb-6 lg:mb-[2.5svh] text-eyebrow font-semibold uppercase text-dark-muted">What happens next</h3>
            <ol className="relative space-y-6 lg:space-y-[2.4svh]">
              {/* connecting line */}
              <span className="absolute bottom-5 left-[19px] top-5 w-px bg-white/10" aria-hidden="true" />
              {nextSteps.map((s, i) => (
                <li key={s.title} className="relative flex gap-4">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-dark-surface text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <p className="font-semibold text-white">{s.title}</p>
                    <p className="text-[15px] text-dark-muted">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Right: the form */}
          <div className="lg:col-span-7">
            <div ref={cardRef} className="flex flex-col justify-center rounded-3xl border border-white/10 bg-dark-card/80 p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-10 lg:p-[clamp(1.5rem,3.6svh,2.5rem)]">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center py-10 text-center sm:py-16"
                    role="status"
                  >
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-neon/50 bg-neon/10 text-neon">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="mb-3 font-display text-3xl font-bold text-white">
                      Thanks{fields.name ? `, ${fields.name.split(" ")[0]}` : ""}!
                    </h3>
                    <p className="mb-8 max-w-md text-base text-dark-muted">
                      Your message is with our team. We&apos;ll reply to <span className="text-white">{fields.email}</span> within 24 hours to set up your free consultation.
                    </p>
                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-neon px-6 py-3.5 text-sm font-bold text-[#0B0B0D] transition-colors hover:bg-neon-hover"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Need it sooner? WhatsApp us
                      </a>
                      <button
                        onClick={reset}
                        className="rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/30"
                      >
                        Send another message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    noValidate
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-8 lg:mb-[2.6svh]">
                      <h3 className="font-display text-h3 font-bold text-white">Tell us about your project</h3>
                      <p className="mt-1 text-[15px] text-dark-muted">Takes about 2 minutes. Everything is required unless marked optional.</p>
                    </div>

                    {/* Service chips */}
                    <fieldset className="mb-7 lg:mb-[2.6svh]">
                      <legend className="mb-3 lg:mb-2 text-sm font-medium text-silver-light">What do you need help with?</legend>
                      <div id="contact-services" tabIndex={-1} className="flex flex-wrap gap-2.5 lg:gap-2 outline-none">
                        {services.map(({ id, icon: Icon }) => {
                          const on = selected.includes(id);
                          return (
                            <button
                              key={id}
                              type="button"
                              aria-pressed={on}
                              onClick={() => toggleService(id)}
                              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[15px] lg:gap-1.5 lg:px-3 lg:py-2 lg:text-sm font-medium transition-all duration-200 ${
                                on
                                  ? "border-neon bg-neon/10 text-white"
                                  : "border-white/10 bg-white/[0.02] text-dark-muted hover:border-white/25 hover:text-white"
                              }`}
                            >
                              {on ? <Check className="h-4 w-4 text-neon" /> : <Icon className="h-4 w-4 lg:max-[1400px]:hidden" />}
                              {id}
                            </button>
                          );
                        })}
                      </div>
                      <AnimatePresence>
                        {showError("services") && (
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-2 text-sm text-[#FF8A80]">
                            {errors.services}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </fieldset>

                    <div className="grid grid-cols-1 gap-5 lg:gap-x-4 lg:gap-y-[2svh] sm:grid-cols-2">
                      <Field id="contact-name" label="Full name" icon={User} error={showError("name")}>
                        <input
                          id="contact-name"
                          type="text"
                          autoComplete="name"
                          value={fields.name}
                          onChange={set("name")}
                          onBlur={blur("name")}
                          placeholder="Jane Perera"
                          aria-invalid={!!showError("name")}
                          aria-describedby={showError("name") ? "contact-name-error" : undefined}
                          className={inputClass("name")}
                        />
                      </Field>

                      <Field id="contact-business" label="Business name" optional icon={Building2}>
                        <input
                          id="contact-business"
                          type="text"
                          autoComplete="organization"
                          value={fields.business}
                          onChange={set("business")}
                          placeholder="Your company"
                          className={inputClass("business")}
                        />
                      </Field>

                      <Field id="contact-email" label="Email" icon={Mail} error={showError("email")}>
                        <input
                          id="contact-email"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          value={fields.email}
                          onChange={set("email")}
                          onBlur={blur("email")}
                          placeholder="you@business.com"
                          aria-invalid={!!showError("email")}
                          aria-describedby={showError("email") ? "contact-email-error" : undefined}
                          className={inputClass("email")}
                        />
                      </Field>

                      <Field id="contact-phone" label="Phone / WhatsApp" icon={Phone} error={showError("phone")}>
                        <input
                          id="contact-phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={fields.phone}
                          onChange={set("phone")}
                          onBlur={blur("phone")}
                          placeholder="07X XXX XXXX"
                          aria-invalid={!!showError("phone")}
                          aria-describedby={showError("phone") ? "contact-phone-error" : undefined}
                          className={inputClass("phone")}
                        />
                      </Field>
                    </div>

                    <div className="mt-5 lg:mt-[2svh]">
                      <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-silver-light">
                        About your project
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        maxLength={MESSAGE_MAX}
                        value={fields.message}
                        onChange={set("message")}
                        onBlur={blur("message")}
                        placeholder="What does your business do, and what would you like to achieve? Any deadlines or examples you like?"
                        aria-invalid={!!showError("message")}
                        aria-describedby="contact-message-hint"
                        className={`${inputBase} !h-auto lg:!h-[clamp(64px,11svh,150px)] resize-none py-3.5 !pl-4 leading-relaxed ${
                          showError("message") ? "border-[#FF8A80]/60" : "border-white/10 hover:border-white/20"
                        }`}
                      />
                      <div id="contact-message-hint" className="mt-1.5 flex justify-between gap-4 text-sm">
                        <span className="text-[#FF8A80]">{showError("message") ?? ""}</span>
                        <span className="shrink-0 text-dark-subtle">
                          {fields.message.length}/{MESSAGE_MAX}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group mt-8 lg:mt-[2.6svh] flex h-14 lg:h-12 w-full items-center justify-center gap-2 rounded-xl bg-neon text-base font-bold text-[#0B0B0D] transition-all duration-200 hover:bg-neon-hover active:scale-[0.99] disabled:cursor-wait disabled:opacity-80"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <p className="mt-4 lg:mt-3 flex items-center justify-center gap-2 text-sm text-dark-subtle">
                      <Lock className="h-3.5 w-3.5" />
                      Your details stay private. No spam, ever.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
