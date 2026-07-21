"use client";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import useReveal from "./useReveal";

interface ContactRow {
  label: string;
  value: string;
  icon: ReactNode;
}

const rows: ContactRow[] = [
  {
    label: "Office",
    value: "SriZen Towers, HITEC City, Hyderabad, Telangana 500081",
    icon: (
      <>
        <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
  {
    label: "Phone",
    value: "+91 40 4567 8900",
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z" />
    ),
  },
  {
    label: "Email",
    value: "info@srizengroup.com",
    icon: (
      <>
        <path d="m22 6-10 7L2 6" />
        <rect x="2" y="4" width="20" height="16" rx="2" />
      </>
    ),
  },
  {
    label: "Business Hours",
    value: "Mon – Sat, 9:00 AM – 6:30 PM IST",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
  },
];

const socials = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <>
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
        <path d="M10 9h3.6v1.9h.05c.5-.95 1.75-1.95 3.6-1.95 3.85 0 4.55 2.5 4.55 5.8V21h-4v-5.6c0-1.35-.03-3.1-1.9-3.1-1.9 0-2.2 1.5-2.2 3v5.7h-4z" />
      </>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: <path d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.6 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 0 1-1.8.1c.5 1.6 2 2.8 3.8 2.9A8.3 8.3 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z" />,
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </>
    ),
  },
];

/* ---------- form data model ---------- */

const projectTypes = ["Residential", "Commercial", "Interior Design", "Renovation", "Land Development", "Other"];
const budgetRanges = ["Under ₹50 Lakh", "₹50 Lakh – ₹1 Crore", "₹1 Crore – ₹3 Crore", "₹3 Crore & above", "Prefer not to say"];
const timelines = ["Immediately", "Within 3 months", "3 – 6 months", "6 – 12 months", "Just exploring"];
const contactMethods = ["Email", "Phone", "WhatsApp"] as const;
const hearAboutOptions = ["Referral", "Google Search", "Instagram", "LinkedIn", "An event", "Other"];

type Field =
  | "name"
  | "email"
  | "phone"
  | "preferredContact"
  | "projectType"
  | "location"
  | "area"
  | "budget"
  | "timeline"
  | "message"
  | "hearAbout";

type FormState = Record<Field, string>;
type ErrorState = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  preferredContact: "Email",
  projectType: "",
  location: "",
  area: "",
  budget: "",
  timeline: "",
  message: "",
  hearAbout: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+()\-\s]{7,16}$/;

const steps = [
  {
    title: "Your Details",
    description: "So we know who we're speaking with.",
    fields: ["name", "email", "phone"] as Field[],
    icon: (
      <>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
      </>
    ),
  },
  {
    title: "Your Project",
    description: "The scope, scale, and shape of what you're building.",
    fields: ["projectType", "budget", "timeline"] as Field[],
    icon: (
      <>
        <path d="M4 21V9l8-5 8 5v12" />
        <path d="M9 21v-6h6v6" />
      </>
    ),
  },
  {
    title: "Tell Us More",
    description: "Anything else that helps us prepare for the first call.",
    fields: ["message"] as Field[],
    icon: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </>
    ),
  },
];

function validateStep(step: number, values: FormState): ErrorState {
  const errors: ErrorState = {};
  if (step === 0) {
    if (!values.name.trim()) errors.name = "Enter your full name.";
    if (!values.email.trim()) errors.email = "Enter your email address.";
    else if (!emailPattern.test(values.email)) errors.email = "Enter a valid email address.";
    if (values.phone && !phonePattern.test(values.phone)) errors.phone = "Enter a valid phone number.";
  }
  if (step === 1) {
    if (!values.projectType) errors.projectType = "Select a project type.";
    if (!values.budget) errors.budget = "Select an estimated budget.";
    if (!values.timeline) errors.timeline = "Select a start timeline.";
  }
  if (step === 2) {
    if (!values.message.trim()) errors.message = "Tell us a little about your project.";
  }
  return errors;
}

/* ---------- shared field styling ---------- */

const inputClass =
  "peer w-full border-0 border-b bg-transparent px-0 pb-2.5 pt-5 text-[15px] text-ink placeholder-transparent outline-none transition-all duration-300 motion-reduce:transition-none focus-visible:outline-none";
const labelClass =
  "pointer-events-none absolute left-0 top-5 text-[15px] text-ink-muted transition-all duration-300 motion-reduce:transition-none peer-focus:top-0 peer-focus:text-[11px] peer-focus:tracking-[.08em] peer-focus:text-navy peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:tracking-[.08em]";
const selectLabelClass =
  "pointer-events-none absolute left-0 top-0 text-[11px] tracking-[.08em] text-ink-muted transition-colors duration-300 peer-focus:text-navy";
const selectClass =
  "peer w-full appearance-none border-0 border-b bg-transparent px-0 pb-2.5 pt-5 text-[15px] text-ink outline-none transition-all duration-300 motion-reduce:transition-none focus-visible:outline-none cursor-pointer";

function ChevronIcon() {
  return (
    <svg
      className="pointer-events-none absolute right-0 top-4 text-navy/50 transition-transform duration-300 peer-focus:text-navy"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

/** Fades + lifts its children in whenever `stepKey` changes. */
function StepTransition({ stepKey, children }: { stepKey: number; children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [stepKey]);

  return (
    <div
      className={`transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      {children}
    </div>
  );
}

export default function Contact() {
  const [ref, inView] = useReveal<HTMLDivElement>();
  const formId = useId();
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<ErrorState>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isFinalStep = step === steps.length - 1;

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const setField = (field: Field, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors((prev) => ({ ...prev, ...validateStep(step, next) }));
  };

  const handleBlur = (field: Field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, ...validateStep(step, values) }));
  };

  const focusFirstInvalid = (form: HTMLFormElement | null) => {
    form?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  };

  const goNext = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stepErrors = validateStep(step, values);
    setErrors((prev) => ({ ...prev, ...stepErrors }));
    setTouched((prev) => ({
      ...prev,
      ...Object.fromEntries(steps[step].fields.map((f) => [f, true])),
    }));

    if (Object.keys(stepErrors).length > 0) {
      focusFirstInvalid(e.currentTarget);
      return;
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stepErrors = validateStep(step, values);
    setErrors((prev) => ({ ...prev, ...stepErrors }));
    setTouched((prev) => ({
      ...prev,
      ...Object.fromEntries(steps[step].fields.map((f) => [f, true])),
    }));

    if (Object.keys(stepErrors).length > 0) {
      focusFirstInvalid(e.currentTarget);
      return;
    }

    setStatus("submitting");
    try {
      // Replace with real endpoint
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("success");
      setValues(initialState);
      setTouched({});
      setStep(0);
    } catch {
      setStatus("error");
    }
  };

  const fieldId = (field: string) => `${formId}-${field}`;
  const errorId = (field: string) => `${formId}-${field}-error`;
  const borderClass = (field: Field) =>
    errors[field] ? "border-red-500 focus:border-red-500" : "border-navy/15 hover:border-navy/30 focus:border-navy";

  return (
    <section className="py-20 md:py-28">
      <div className="wrap grid md:grid-cols-[0.9fr_1.1fr] gap-16 md:gap-24">
        <div ref={ref} data-in={inView} className="reveal">
          <p className="eyebrow">Get In Touch</p>
          <h2 className="text-[32px] md:text-[48px]">Let&apos;s build something exceptional</h2>
          <p className="mt-5 text-ink-muted text-lg leading-relaxed max-w-[420px]">
            Share a few details about your project — the more we know up front, the better we can match you
            with the right team.
          </p>

          <div className="mt-11 flex flex-col gap-y-6">
            {rows.map((row) => (
              <div key={row.label} className="flex gap-[18px]">
                <div className="w-[42px] h-[42px] rounded-lg bg-bg-light flex items-center justify-center text-navy shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                    focusable="false"
                  >
                    {row.icon}
                  </svg>
                </div>
                <div>
                  <div className="font-mono text-[11px] tracking-[.14em] uppercase text-ink-muted">
                    {row.label}
                  </div>
                  <div className="text-[15px] mt-1 font-medium">{row.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-10">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-navy/20 flex items-center justify-center transition-colors duration-300 motion-reduce:transition-none hover:bg-navy hover:border-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                  {social.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Form card, with a soft ambient glow sitting behind it */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 -right-10 h-64 w-64 rounded-full bg-navy/[0.07] blur-3xl"
          />
          <div className="relative overflow-hidden rounded-2xl bg-bg-light p-10 md:p-12 shadow-[0_30px_70px_-25px_rgba(20,33,61,0.25)] ring-1 ring-navy/[0.06]">
            {/* gradient accent bar */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-navy via-navy/70 to-navy/10" aria-hidden="true" />

            {/* Step indicator */}
            <div className="mb-10">
              <div className="flex items-center">
                {steps.map((s, i) => {
                  const isActive = i === step;
                  const isDone = i < step;
                  return (
                    <div key={s.title} className={`flex items-center ${i !== steps.length - 1 ? "flex-1" : ""}`}>
                      <div className="flex items-center gap-2.5">
                        <span
                          aria-current={isActive ? "step" : undefined}
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 motion-reduce:transition-none ${
                            isDone
                              ? "bg-gradient-to-br from-navy to-navy/80 text-white shadow-md shadow-navy/20"
                              : isActive
                                ? "border-2 border-navy text-navy ring-4 ring-navy/10"
                                : "border border-navy/20 text-ink-muted"
                          }`}
                        >
                          {isDone ? (
                            <CheckIcon />
                          ) : (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                              {s.icon}
                            </svg>
                          )}
                        </span>
                        <span
                          className={`hidden sm:block text-[11px] font-mono uppercase tracking-[.1em] whitespace-nowrap transition-colors duration-300 ${
                            isActive ? "text-navy" : "text-ink-muted"
                          }`}
                        >
                          {s.title}
                        </span>
                      </div>
                      {i !== steps.length - 1 && (
                        <span className="mx-3 h-px flex-1 bg-navy/10" aria-hidden="true">
                          <span
                            className="block h-px bg-navy transition-all duration-500 motion-reduce:transition-none"
                            style={{ width: isDone ? "100%" : "0%" }}
                          />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="sm:hidden mt-3 text-[11px] font-mono uppercase tracking-[.1em] text-navy">
                Step {step + 1} of {steps.length} — {steps[step].title}
              </p>
              <p aria-live="polite" className="sr-only">
                Step {step + 1} of {steps.length}: {steps[step].title}
              </p>
            </div>

            <form
              onSubmit={isFinalStep ? handleSubmit : goNext}
              noValidate
              aria-describedby={status === "success" ? `${formId}-status` : undefined}
            >
              <StepTransition stepKey={step}>
                {/* Step 1 — Your Details */}
                {step === 0 && (
                  <fieldset className="border-0 p-0 m-0">
                    <legend className="sr-only">Your details</legend>
                    <div className="mb-7">
                      <div className="h-[2px] w-8 bg-navy mb-3" aria-hidden="true" />
                      <h3 ref={headingRef} tabIndex={-1} className="text-xl font-semibold outline-none">
                        {steps[0].title}
                      </h3>
                      <p className="text-sm text-ink-muted mt-1">{steps[0].description}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-x-6">
                      <div className="relative pb-6">
                        <input
                          id={fieldId("name")}
                          name="name"
                          type="text"
                          placeholder=" "
                          autoComplete="name"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? errorId("name") : undefined}
                          value={values.name}
                          onChange={(e) => setField("name", e.target.value)}
                          onBlur={() => handleBlur("name")}
                          className={`${inputClass} ${borderClass("name")}`}
                        />
                        <label htmlFor={fieldId("name")} className={labelClass}>
                          Full Name <span aria-hidden="true">*</span>
                        </label>
                        {errors.name && (
                          <p id={errorId("name")} className="absolute left-0 bottom-0 text-xs text-red-600" role="alert">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="relative pb-6">
                        <input
                          id={fieldId("email")}
                          name="email"
                          type="email"
                          placeholder=" "
                          autoComplete="email"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? errorId("email") : undefined}
                          value={values.email}
                          onChange={(e) => setField("email", e.target.value)}
                          onBlur={() => handleBlur("email")}
                          className={`${inputClass} ${borderClass("email")}`}
                        />
                        <label htmlFor={fieldId("email")} className={labelClass}>
                          Email Address <span aria-hidden="true">*</span>
                        </label>
                        {errors.email && (
                          <p id={errorId("email")} className="absolute left-0 bottom-0 text-xs text-red-600" role="alert">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="relative pb-6">
                      <input
                        id={fieldId("phone")}
                        name="phone"
                        type="tel"
                        placeholder=" "
                        autoComplete="tel"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? errorId("phone") : undefined}
                        value={values.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                        onBlur={() => handleBlur("phone")}
                        className={`${inputClass} ${borderClass("phone")}`}
                      />
                      <label htmlFor={fieldId("phone")} className={labelClass}>
                        Phone Number
                      </label>
                      {errors.phone && (
                        <p id={errorId("phone")} className="absolute left-0 bottom-0 text-xs text-red-600" role="alert">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <fieldset className="pt-2 pb-2 border-0 p-0">
                      <legend className="text-[11px] font-mono uppercase tracking-[.1em] text-ink-muted mb-3">
                        Preferred Contact Method
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {contactMethods.map((method) => (
                          <div key={method}>
                            <input
                              type="radio"
                              id={fieldId(`contact-${method}`)}
                              name="preferredContact"
                              value={method}
                              checked={values.preferredContact === method}
                              onChange={(e) => setField("preferredContact", e.target.value)}
                              className="peer sr-only"
                            />
                            <label
                              htmlFor={fieldId(`contact-${method}`)}
                              className="cursor-pointer select-none rounded-full border border-navy/20 px-4 py-2 text-sm text-ink-muted transition-all duration-300 motion-reduce:transition-none hover:border-navy/40 peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-checked:shadow-sm peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-navy"
                            >
                              {method}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </fieldset>
                )}

                {/* Step 2 — Your Project */}
                {step === 1 && (
                  <fieldset className="border-0 p-0 m-0">
                    <legend className="sr-only">Your project</legend>
                    <div className="mb-7">
                      <div className="h-[2px] w-8 bg-navy mb-3" aria-hidden="true" />
                      <h3 ref={headingRef} tabIndex={-1} className="text-xl font-semibold outline-none">
                        {steps[1].title}
                      </h3>
                      <p className="text-sm text-ink-muted mt-1">{steps[1].description}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-x-6">
                      <div className="relative pb-6">
                        <select
                          id={fieldId("projectType")}
                          name="projectType"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.projectType}
                          aria-describedby={errors.projectType ? errorId("projectType") : undefined}
                          value={values.projectType}
                          onChange={(e) => setField("projectType", e.target.value)}
                          onBlur={() => handleBlur("projectType")}
                          className={`${selectClass} ${borderClass("projectType")}`}
                        >
                          <option value="" disabled hidden></option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        <label htmlFor={fieldId("projectType")} className={selectLabelClass}>
                          Project Type <span aria-hidden="true">*</span>
                        </label>
                        <ChevronIcon />
                        {errors.projectType && (
                          <p id={errorId("projectType")} className="absolute left-0 bottom-0 text-xs text-red-600" role="alert">
                            {errors.projectType}
                          </p>
                        )}
                      </div>

                      <div className="relative pb-6">
                        <input
                          id={fieldId("location")}
                          name="location"
                          type="text"
                          placeholder=" "
                          autoComplete="address-level2"
                          value={values.location}
                          onChange={(e) => setField("location", e.target.value)}
                          className={`${inputClass} border-navy/15 hover:border-navy/30 focus:border-navy`}
                        />
                        <label htmlFor={fieldId("location")} className={labelClass}>
                          Project Location (City / Area)
                        </label>
                      </div>
                    </div>

                    <div className="relative pb-6">
                      <input
                        id={fieldId("area")}
                        name="area"
                        type="text"
                        placeholder=" "
                        value={values.area}
                        onChange={(e) => setField("area", e.target.value)}
                        className={`${inputClass} border-navy/15 hover:border-navy/30 focus:border-navy`}
                      />
                      <label htmlFor={fieldId("area")} className={labelClass}>
                        Plot or Built-up Area (e.g. 2,400 sq.ft)
                      </label>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-x-6">
                      <div className="relative pb-2">
                        <select
                          id={fieldId("budget")}
                          name="budget"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.budget}
                          aria-describedby={errors.budget ? errorId("budget") : `${fieldId("budget")}-hint`}
                          value={values.budget}
                          onChange={(e) => setField("budget", e.target.value)}
                          onBlur={() => handleBlur("budget")}
                          className={`${selectClass} ${borderClass("budget")}`}
                        >
                          <option value="" disabled hidden></option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>
                              {range}
                            </option>
                          ))}
                        </select>
                        <label htmlFor={fieldId("budget")} className={selectLabelClass}>
                          Estimated Budget <span aria-hidden="true">*</span>
                        </label>
                        <ChevronIcon />
                        <p id={`${fieldId("budget")}-hint`} className="mt-2 flex items-center gap-1.5 text-xs text-ink-muted">
                          <LockIcon />
                          Kept confidential — helps us match the right team.
                        </p>
                        {errors.budget && (
                          <p id={errorId("budget")} className="mt-1 text-xs text-red-600" role="alert">
                            {errors.budget}
                          </p>
                        )}
                      </div>

                      <div className="relative pb-6">
                        <select
                          id={fieldId("timeline")}
                          name="timeline"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.timeline}
                          aria-describedby={errors.timeline ? errorId("timeline") : undefined}
                          value={values.timeline}
                          onChange={(e) => setField("timeline", e.target.value)}
                          onBlur={() => handleBlur("timeline")}
                          className={`${selectClass} ${borderClass("timeline")}`}
                        >
                          <option value="" disabled hidden></option>
                          {timelines.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                        <label htmlFor={fieldId("timeline")} className={selectLabelClass}>
                          Desired Start <span aria-hidden="true">*</span>
                        </label>
                        <ChevronIcon />
                        {errors.timeline && (
                          <p id={errorId("timeline")} className="absolute left-0 bottom-0 text-xs text-red-600" role="alert">
                            {errors.timeline}
                          </p>
                        )}
                      </div>
                    </div>
                  </fieldset>
                )}

                {/* Step 3 — Tell Us More */}
                {step === 2 && (
                  <fieldset className="border-0 p-0 m-0">
                    <legend className="sr-only">Tell us more</legend>
                    <div className="mb-7">
                      <div className="h-[2px] w-8 bg-navy mb-3" aria-hidden="true" />
                      <h3 ref={headingRef} tabIndex={-1} className="text-xl font-semibold outline-none">
                        {steps[2].title}
                      </h3>
                      <p className="text-sm text-ink-muted mt-1">{steps[2].description}</p>
                    </div>

                    <div className="relative pb-6">
                      <textarea
                        id={fieldId("message")}
                        name="message"
                        placeholder=" "
                        rows={5}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? errorId("message") : `${fieldId("message")}-hint`}
                        value={values.message}
                        onChange={(e) => setField("message", e.target.value)}
                        onBlur={() => handleBlur("message")}
                        className={`${inputClass} resize-none ${borderClass("message")}`}
                      />
                      <label htmlFor={fieldId("message")} className={labelClass}>
                        Describe your project <span aria-hidden="true">*</span>
                      </label>
                      <p id={`${fieldId("message")}-hint`} className="mt-2 text-xs text-ink-muted">
                        Vision, must-haves, site conditions, anything that helps us prepare.
                      </p>
                      {errors.message && (
                        <p id={errorId("message")} className="mt-1 text-xs text-red-600" role="alert">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="relative pb-6">
                      <select
                        id={fieldId("hearAbout")}
                        name="hearAbout"
                        value={values.hearAbout}
                        onChange={(e) => setField("hearAbout", e.target.value)}
                        className={`${selectClass} border-navy/15 hover:border-navy/30 focus:border-navy`}
                      >
                        <option value="" hidden></option>
                        {hearAboutOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <label htmlFor={fieldId("hearAbout")} className={selectLabelClass}>
                        How did you hear about us? (optional)
                      </label>
                      <ChevronIcon />
                    </div>
                  </fieldset>
                )}
              </StepTransition>

              {/* Navigation */}
              <div className="flex items-center gap-5 mt-3">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="shrink-0 text-sm font-medium text-ink-muted transition-colors duration-300 motion-reduce:transition-none hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy rounded"
                  >
                    ← Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group btn btn-primary flex-1 justify-center shadow-lg shadow-navy/15 transition-all duration-300 motion-reduce:transition-none hover:shadow-xl hover:shadow-navy/20 active:scale-[0.98] motion-reduce:active:scale-100 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {isFinalStep ? (status === "submitting" ? "Sending…" : "Send Message") : "Continue"}
                  <span className="arrow inline-block transition-transform duration-300 motion-reduce:transition-none group-hover:translate-x-1">→</span>
                </button>
              </div>

              <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-ink-muted">
                <LockIcon />
                Your information is confidential and never shared.
              </p>

              <div aria-live="polite" className="sr-only">
                {status === "submitting" && "Sending your message."}
                {status === "success" && "Message sent. We will be in touch within one business day."}
                {status === "error" && "Something went wrong. Please try again."}
              </div>

              {status === "success" && (
                <p id={`${formId}-status`} className="mt-4 text-sm font-medium text-navy text-center" role="status">
                  Thanks — your message is on its way. We&apos;ll reply within one business day.
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 text-sm font-medium text-red-600 text-center" role="alert">
                  Something went wrong sending your message. Please try again, or email us directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}