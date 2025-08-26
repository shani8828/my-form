import { motion } from "framer-motion";
import { useState, useEffect } from "react";
// import { logPageVisit } from "../api";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Form() {
//   useEffect(() => {
//     logPageVisit("contact");
//   }, []);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.success) {
        setFeedback({ type: "success", message: "Message sent successfully!" });
        setForm({ name: "", email: "", message: "" });
      } else {
        setFeedback({ type: "error", message: data.error || "Failed to send message." });
      }
    } catch (err) {
      console.error(err);
      setFeedback({ type: "error", message: "An error occurred. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden" aria-label="Contact section">
      <div className="pointer-events-none absolute inset-0 -z-10 select-none" aria-hidden>
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-600/20" />
        <div className="absolute right-12 bottom-0 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-600/20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.h2 initial={fadeIn.hidden} whileInView={fadeIn.show(0)} viewport={{ once: true, margin: "-100px" }}
          className="text-center text-4xl sm:text-5xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
          Submit your data
        </motion.h2>
        <motion.p initial={fadeIn.hidden} whileInView={fadeIn.show(1)} viewport={{ once: true }}
          className="mt-4 text-center text-lg max-w-3xl mx-auto text-slate-600 dark:text-slate-300">
          Have a project, collaboration idea, or just want to say hello? Fill out the form below or reach out using the details provided.
        </motion.p>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {/* Contact Info */}
          <motion.div initial={fadeIn.hidden} whileInView={fadeIn.show(0)} viewport={{ once: true }}
            className="rounded-2xl p-6 ring-1 ring-slate-900/5 dark:ring-white/10 bg-white/80 dark:bg-slate-900/50 backdrop-blur shadow-lg">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Reach Us</h3>
            <ul className="space-y-4 text-slate-700 dark:text-slate-300">
              <li><span className="block text-sm font-semibold">Email</span><span className="text-sm">contact@yourdomain.com</span></li>
              <li><span className="block text-sm font-semibold">Phone</span><span className="text-sm">+91 9876543210</span></li>
              <li><span className="block text-sm font-semibold">Address</span><span className="text-sm">123 Innovation Street, Tech City</span></li>
            </ul>
          </motion.div>

          {/* Contact Form */}
          <motion.form initial={fadeIn.hidden} whileInView={fadeIn.show(1)} viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-2xl p-6 ring-1 ring-slate-900/5 dark:ring-white/10 bg-white/80 dark:bg-slate-900/50 backdrop-blur shadow-lg">

            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Send a Message</h3>

            <div className="space-y-4">
              <input type="text" name="name" value={form.name} onChange={handleChange} required
                placeholder="Your Name"
                className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:outline-none" />

              <input type="email" name="email" value={form.email} onChange={handleChange} required
                placeholder="Your Email"
                className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:outline-none" />

              <textarea name="message" value={form.message} onChange={handleChange} rows="4" required
                placeholder="Your Message"
                className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"></textarea>

              <button type="submit" disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold ring-1 ring-slate-900/10 dark:ring-white/10 shadow-sm bg-gradient-to-r from-fuchsia-500 to-indigo-600 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-500 dark:focus-visible:ring-offset-slate-900 hover:scale-[1.02] active:scale-[0.99] transition-transform disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? "Sending..." : "Send Message"}
              </button>

              {feedback.message && (
                <p className={`mt-2 text-center font-medium ${feedback.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                  {feedback.message}
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
