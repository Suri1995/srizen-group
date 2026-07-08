"use client";
import { useState, type FormEvent } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    // Wire this up to your newsletter provider (Mailchimp, Resend, etc.)
    setSubmitted(true);
    setEmail("");
  };

  if (submitted) {
    return (
      <p className="text-[13.5px] text-cyan font-medium" role="status">
        Thanks — you&apos;re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex border-b border-white/25 pb-3">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="bg-transparent border-0 text-white text-sm flex-1 placeholder:text-white/40 focus:outline-none"
      />
      <button type="submit" className="text-cyan text-[13px] font-semibold shrink-0">
        Join →
      </button>
    </form>
  );
}
