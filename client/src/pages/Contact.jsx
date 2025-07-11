import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaTag,
  FaPaperPlane,
  FaPhoneAlt, // For contact number
  FaMapMarkerAlt, // For address
  FaArrowUp, // For scroll to top
} from "react-icons/fa";
import { MdMessage } from "react-icons/md"; // For message icon

export default function Contact({ theme }) { // Add theme prop
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" }); // { type: 'success' | 'error', message: '...' }
  const [isSubmitting, setIsSubmitting] = useState(false);

  const topOfPageRef = useRef(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" }); // Clear previous status
    setIsSubmitting(true);

    // Basic validation
    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus({ type: "error", message: "All fields are required." });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call for sending message
    try {
      // In a real application, you would send this data to your backend API:
      // await axios.post("/api/contact", form);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      setStatus({
        type: "success",
        message:
          "Message transmitted successfully! We will connect with you shortly.",
      });
      setForm({ name: "", email: "", subject: "", message: "" }); // Clear form
    } catch (error) {
      console.error("Contact form submission error:", error);
      setStatus({
        type: "error",
        message: "Transmission failed. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus({ type: "", message: "" }), 5000); // Clear status message after 5 seconds
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    // The main div's background and primary text color are handled by Layout
    <div className="relative min-h-screen w-full font-futuristic select-none overflow-hidden p-4">
      {/* Top of Page Ref for Scroll-to-Top */}
      <div ref={topOfPageRef} className="absolute top-0 left-0 w-full h-px" />

      {/* Dynamic Background Layer (fixed, full screen, behind content) */}
      {theme === 'dark' && (
        <div className="fixed inset-0 z-0 opacity-20 animate-pulse-bg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--web3-accent-blue)_0%,_transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--web3-accent-purple)_0%,_transparent_50%)] animate-pulse-bg-2"></div>
        </div>
      )}
      {theme === 'light' && (
        <div className="fixed inset-0 z-0 opacity-20 animate-pulse-bg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-colors-light-web3-accent-blue)_0%,_transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-colors-light-web3-accent-purple)_0%,_transparent_50%)] animate-pulse-bg-2"></div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={() => scrollToSection(topOfPageRef)}
          className="fixed bottom-8 right-8 p-4 rounded-full shadow-web3-glow-blue-strong z-50 transition-all duration-300 flex items-center justify-center animate-fade-in-up
                     bg-web3-accent-blue/80 hover:bg-web3-accent-blue text-web3-text-primary
                     light:bg-light-web3-accent-blue/80 light:hover:bg-light-web3-accent-blue light:text-light-web3-text-primary light:shadow-light-web3-glow-blue-strong"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}

      {/* Content Wrapper: This div contains all page content, centered with max-width */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Back to Home Link */}
        <Link
          to="/"
          className="inline-block mb-12 font-semibold transition-colors duration-300 animate-fade-in
                     text-web3-accent-blue hover:underline
                     light:text-light-web3-accent-blue"
        >
          ← Back to Quantum Hub
        </Link>

        {/* Main Heading */}
        <h1 className="relative text-center text-6xl md:text-7xl font-extrabold tracking-widest mb-16 animate-fade-in-up-delay">
          <span className="relative z-10 animate-pulse-light drop-shadow-[0_0_25px_rgba(46,204,113,0.8)]
                       text-web3-accent-green
                       light:text-light-web3-accent-green light:drop-shadow-[0_0_25px_rgba(46,125,50,0.8)]">
            Connect with Us
          </span>
          {/* Glitch overlays for visual effect (only visible in dark mode) */}
          {theme === 'dark' && (
            <>
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 w-full h-full text-web3-accent-green opacity-0 animate-glitch-1"
                style={{ mixBlendMode: "screen" }}
              >
                Connect with Us
              </span>
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 w-full h-full text-web3-accent-blue opacity-0 animate-glitch-2"
                style={{ mixBlendMode: "screen" }}
              >
                Connect with Us
              </span>
            </>
          )}
        </h1>

        {/* Introduction / Slogan */}
        <section className="text-center mb-20 px-4 py-8 rounded-xl border shadow-web3-shadow-soft animate-fade-in delay-200
                            bg-web3-card/50 backdrop-blur-sm border-web3-accent-blue/30
                            light:bg-light-web3-card/80 light:border-light-web3-accent-blue/50 light:shadow-soft">
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-4 font-light
                        text-web3-text-secondary
                        light:text-light-web3-text-secondary">
            Your connection to the future of urban innovation.
          </p>
          <p className="text-lg max-w-3xl mx-auto
                        text-web3-text-primary/80
                        light:text-light-web3-text-primary/80">
            Whether you have inquiries, partnership proposals, or feedback, our
            Nexus team is ready to receive your data stream.
          </p>
        </section>

        {/* Direct Email Contact Section */}
        <section className="mb-20 px-4 py-12 rounded-xl border shadow-web3-shadow-deep animate-fade-in delay-300
                            bg-web3-card/60 backdrop-blur-lg border-web3-accent-purple/40
                            light:bg-light-web3-card/80 light:border-light-web3-accent-purple/50 light:shadow-deep">
          <h2 className="text-4xl font-bold text-center mb-10 drop-shadow-[0_0_15px_var(--web3-accent-purple)]
                        text-web3-accent-purple
                        light:text-light-web3-accent-purple light:drop-shadow-[0_0_15px_var(--light-web3-accent-purple)]">
            Contact the Team
          </h2>

          <div className="text-center max-w-2xl mx-auto text-lg leading-relaxed space-y-6
                        text-web3-text-primary
                        light:text-light-web3-text-primary">
            <p>
              🚀 We’re always ready to collaborate, innovate, and respond. If
              you want to reach us directly, drop a message at:
            </p>

            <p className="text-xl font-bold underline underline-offset-4
                          text-web3-accent-blue
                          light:text-light-web3-accent-blue">
              <a
                href="mailto:ashiquemurad@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                ashiquemurad@gmail.com
              </a>
            </p>

            <p>We’ll get back to you faster than a quantum ping ⚡.</p>
          </div>
        </section>

        {/* Direct Contact Info Section */}
        <section className="mb-20 px-4 py-12 rounded-xl border shadow-web3-shadow-deep animate-fade-in delay-800
                            bg-web3-card/60 backdrop-blur-lg border-web3-accent-blue/40
                            light:bg-light-web3-card/80 light:border-light-web3-accent-blue/50 light:shadow-deep">
          <h2 className="text-4xl font-bold text-center mb-10 drop-shadow-[0_0_15px_var(--web3-accent-blue)]
                        text-web3-accent-blue
                        light:text-light-web3-accent-blue light:drop-shadow-[0_0_15px_var(--light-web3-accent-blue)]">
            Direct Communication Channels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto
                          text-web3-text-primary
                          light:text-light-web3-text-primary">
            <div className="text-center p-6 rounded-lg border shadow-web3-shadow-soft hover:shadow-web3-glow-purple transition-all duration-300 transform hover:-translate-y-1
                            bg-web3-input-bg border-web3-accent-purple/30
                            light:bg-light-web3-input-bg light:border-light-web3-accent-purple/50 light:shadow-soft light:hover:shadow-light-web3-glow-purple">
              <FaPhoneAlt className="text-5xl mx-auto mb-4 drop-shadow-[0_0_10px_var(--web3-accent-purple)]
                                    text-web3-accent-purple
                                    light:text-light-web3-accent-purple light:drop-shadow-[0_0_10px_var(--light-web3-accent-purple)]" />
              <h3 className="text-2xl font-semibold mb-2
                             text-web3-accent-purple
                             light:text-light-web3-accent-purple">
                Secure Comms Link
              </h3>
              <p className="text-lg font-mono">+(880) 2070-DHAKA</p>
              <p className="text-sm
                            text-web3-text-secondary
                            light:text-light-web3-text-secondary">
                (Standard data rates apply)
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border shadow-web3-shadow-soft hover:shadow-web3-glow-orange transition-all duration-300 transform hover:-translate-y-1
                            bg-web3-input-bg border-web3-accent-orange/30
                            light:bg-light-web3-input-bg light:border-light-web3-accent-orange/50 light:shadow-soft light:hover:shadow-light-web3-glow-orange">
              <FaMapMarkerAlt className="text-5xl mx-auto mb-4 drop-shadow-[0_0_10px_var(--web3-accent-orange)]
                                        text-web3-accent-orange
                                        light:text-light-web3-accent-orange light:drop-shadow-[0_0_10px_var(--light-web3-accent-orange)]" />
              <h3 className="text-2xl font-semibold mb-2
                             text-web3-accent-orange
                             light:text-light-web3-accent-orange">
                Nexus Command Center
              </h3>
              <p className="text-lg font-mono">
                Quantum District 7, Dhaka 2070
              </p>
              <p className="text-sm
                            text-web3-text-secondary
                            light:text-light-web3-text-secondary">
                (Coordinates: 23.777 N, 90.399 E)
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
      </div>
    </div>
  );
}