// File: src/components/ContactForm.tsx
import React, { useState } from 'react';
import { PaperAirplaneIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function ContactForm() {
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('SUBMITTING');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xqaqgdoy", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('SUCCESS');
        form.reset();
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          setErrorMessage(data["errors"].map((error: any) => error["message"]).join(", "));
        } else {
          setErrorMessage("There was a problem submitting the form.");
        }
        setStatus('ERROR');
      }
    } catch (error) {
      setStatus('ERROR');
      setErrorMessage("Connection error. Please check your internet and try again.");
    }
  };

  if (status === 'SUCCESS') {
    return (
      <div className="bg-green-900/20 border border-green-800 rounded-3xl p-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-green-900/50 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircleIcon className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Message sent</h3>
        <p className="text-zinc-400">Thank you for reaching out. Our team will review your enquiry and reply within two working days.</p>
        <button
          onClick={() => setStatus('IDLE')}
          className="mt-8 text-green-400 hover:text-green-300 text-sm font-medium underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-400 ml-1">Full name</label>
          <input
            required
            type="text"
            name="name"
            id="name"
            placeholder="Jane Smith"
            className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-zinc-900 dark:text-white focus:border-olive-500 outline-none focus:ring-1 focus:ring-olive-500/50 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="organisation" className="text-sm font-medium text-zinc-700 dark:text-zinc-400 ml-1">Organisation</label>
          <input
            type="text"
            name="organisation"
            id="organisation"
            placeholder="Your organisation"
            className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-zinc-900 dark:text-white focus:border-olive-500 outline-none focus:ring-1 focus:ring-olive-500/50 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-400 ml-1">Email address</label>
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="jane@organisation.com"
            className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-zinc-900 dark:text-white focus:border-olive-500 outline-none focus:ring-1 focus:ring-olive-500/50 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-zinc-700 dark:text-zinc-400 ml-1">Phone (optional)</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="+44 20 7946 0000"
            className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-zinc-900 dark:text-white focus:border-olive-500 outline-none focus:ring-1 focus:ring-olive-500/50 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-zinc-700 dark:text-zinc-400 ml-1">How can we help?</label>
        <textarea
          required
          name="message"
          id="message"
          rows={5}
          placeholder="Tell us about your project, constraints and timeline..."
          className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-zinc-900 dark:text-white focus:border-olive-500 outline-none resize-none focus:ring-1 focus:ring-olive-500/50 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
        ></textarea>
      </div>

      <input type="hidden" name="_subject" value="New enquiry from stacksolveruk.com" />
      <input type="text" name="_gotcha" style={{ display: 'none' }} />

      {status === 'ERROR' && (
        <div className="flex items-center gap-2 text-red-400 bg-red-900/20 p-4 rounded-lg border border-red-900/50">
          <ExclamationCircleIcon className="w-5 h-5" />
          <span className="text-sm">{errorMessage || "There was an error submitting your message."}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'SUBMITTING'}
        className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black font-bold py-4 rounded-xl dark:hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'SUBMITTING' ? (
          'Sending...'
        ) : (
          <>
            Send message
            <PaperAirplaneIcon className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}
