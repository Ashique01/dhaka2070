import React, { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // Importing icons
import { Link, useLocation } from "react-router-dom";

// Navbar now accepts 'theme' and 'setTheme' props
export default function Navbar({ theme, setTheme }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const { pathname } = useLocation();

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
    { name: "Zones", to: "/zone" }, // Added Zones link for consistency
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="sticky top-0 z-50 bg-web3-dark-bg text-web3-text-primary border-b border-web3-border shadow-md backdrop-blur-md bg-opacity-80
                    light:bg-light-web3-dark-bg light:text-light-web3-text-primary light:border-light-web3-border light:shadow-soft light:bg-opacity-80">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Logo with Glitch Effect */}
        <Link
          to="/"
          className="text-3xl lg:text-4xl font-black font-futuristic tracking-wide relative inline-block group
                     text-web3-accent-blue light:text-light-web3-accent-blue"
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-web3-accent-purple light:group-hover:text-light-web3-accent-purple">
            Dhaka <span className="text-web3-accent-purple light:text-light-web3-accent-purple group-hover:text-web3-accent-blue light:group-hover:text-light-web3-accent-blue">2070</span>
          </span>
          {/* Glitch effects for visual flair (only visible in dark mode) */}
          {theme === 'dark' && (
            <>
              <span
                className="absolute top-0 left-0 w-full h-full text-web3-accent-blue opacity-0 animate-glitch-1"
                aria-hidden="true"
              >
                Dhaka 2070
              </span>
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 w-full h-full text-web3-accent-purple opacity-0 animate-glitch-2"
                style={{ mixBlendMode: "screen" }}
              >
                Dhaka 2070
              </span>
            </>
          )}
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 sm:gap-8 text-sm sm:text-base font-semibold">
          {navLinks.map((link) => (
            <li key={link.to} className="relative group">
              <Link
                to={link.to}
                aria-current={pathname === link.to ? "page" : undefined}
                className={`transition duration-300 ${
                  pathname === link.to
                    ? "text-web3-accent-blue light:text-light-web3-accent-blue" // Active link color
                    : "text-web3-text-secondary hover:text-web3-accent-purple light:text-light-web3-text-secondary light:hover:text-light-web3-accent-purple" // Inactive link color with hover
                }`}
              >
                {link.name}
              </Link>
              {/* Underline effect on hover/active */}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-web3-accent-purple light:bg-light-web3-accent-purple transition-transform duration-300 origin-left ${pathname === link.to ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
            </li>
          ))}

          {/* Theme Toggle Button */}
          <li>
            <button
              onClick={toggleTheme}
              className="ml-4 px-3 py-1 rounded-full border border-web3-border bg-web3-card text-sm text-web3-text-primary hover:shadow transition
                         light:border-light-web3-border light:bg-light-web3-card light:text-light-web3-text-primary light:hover:shadow"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-full border border-web3-border bg-web3-card text-web3-accent-blue shadow-md
                     hover:text-web3-accent-purple light:border-light-web3-border light:bg-light-web3-card light:text-light-web3-accent-blue light:shadow-soft light:hover:text-light-web3-accent-purple"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <HiX className="text-2xl" /> : <HiMenuAlt3 className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 border-l shadow-2xl transform
                    ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
                    transition-transform duration-500 ease-in-out z-50 md:hidden
                    !bg-web3-dark-bg !bg-opacity-100 !text-web3-text-primary !border-web3-border
                    light:!bg-light-web3-dark-bg light:!bg-opacity-100 light:!text-light-web3-text-primary light:!border-light-web3-border`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="p-6 pt-10 flex flex-col h-full justify-between">
          <div>
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 text-web3-accent-blue text-3xl focus:outline-none p-2 rounded-full hover:bg-web3-border transition-colors duration-200
                         light:text-light-web3-accent-blue light:hover:bg-light-web3-border"
              aria-label="Close menu"
            >
              <HiX />
            </button>

            <ul className="flex flex-col gap-6 text-lg font-futuristic">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={toggleMobileMenu} // Close menu on link click
                    className={`block py-2 border-b border-web3-border transition-colors duration-300 ${
                      pathname === link.to
                        ? "text-web3-accent-blue light:text-light-web3-accent-blue"
                        : "hover:text-web3-accent-purple text-web3-text-secondary light:hover:text-light-web3-accent-purple light:text-light-web3-text-secondary"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="text-sm text-web3-text-secondary pt-6 font-mono light:text-light-web3-text-secondary">
                ⚙ System Status: <span className="text-web3-accent-green light:text-light-web3-accent-green">LIVE</span>
              </li>
            </ul>
          </div>

          {/* Sidebar Footer */}
          <footer className="text-xs text-web3-text-secondary border-t border-web3-border pt-4 font-mono
                             light:text-light-web3-text-secondary light:border-light-web3-border">
            <p>&copy; 2070 CyberGrid</p>
            <p className="mt-1 text-web3-text-secondary light:text-light-web3-text-secondary">Quantum Core Secured</p>
          </footer>
        </div>
      </aside>
    </nav>
  );
}