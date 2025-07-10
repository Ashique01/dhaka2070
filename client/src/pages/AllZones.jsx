import React, { useEffect, useState, useRef, useCallback } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaRobot,
  FaLightbulb,
  FaArrowUp,
  FaSearch, // Icon for search input
} from "react-icons/fa";
import { MdSecurity, MdOutlineScience } from "react-icons/md";

export default function AllZones() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    aiLevel: "",
    securityLevel: "",
    energySource: "",
    tech: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const zonesPerPage = 6;

  const observerRef = useRef(null);
  const topOfPageRef = useRef(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get("/city")
      .then((res) => setZones(res.data))
      .catch((error) => {
        console.error("Error fetching zones:", error);
      })
      .finally(() => setLoading(false));
  }, []);

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1); // reset pagination on filter change
  };

  const filteredZones = zones.filter((zone) => {
    const matchesSearch =
      zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      zone.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (zone.notableTech?.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      ) ?? false);

    const matchesAI = filters.aiLevel
      ? Number(zone.aiIntegrationLevel) >= Number(filters.aiLevel)
      : true;

    const matchesSecurity = filters.securityLevel
      ? Number(zone.cyberSecurityLevel) >= Number(filters.securityLevel)
      : true;

    const matchesEnergy = filters.energySource
      ? zone.energySource?.toLowerCase().includes(filters.energySource.toLowerCase())
      : true;

    const matchesTech = filters.tech
      ? zone.notableTech?.some((tech) =>
          tech.toLowerCase().includes(filters.tech.toLowerCase())
        )
      : true;

    return (
      matchesSearch &&
      matchesAI &&
      matchesSecurity &&
      matchesEnergy &&
      matchesTech
    );
  });

  const visibleZones = filteredZones.slice(0, currentPage * zonesPerPage);
  const hasMore = visibleZones.length < filteredZones.length;

  const loadMore = () => {
    if (hasMore) setCurrentPage((prev) => prev + 1);
  };

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        loadMore();
      }
    },
    [hasMore, loading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "200px",
      threshold: 0.1,
    });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [handleObserver]);

  const currentYear = new Date().getFullYear();

  return (
    <div className="relative min-h-screen w-full font-futuristic select-none text-web3-text-primary overflow-hidden bg-web3-dark-bg p-4">
      {/* Top of Page Ref for Scroll-to-Top */}
      <div ref={topOfPageRef} className="absolute top-0 left-0 w-full h-px" />

      {/* Dynamic Background Layer (fixed, full screen, behind content) */}
      <div className="fixed inset-0 z-0 opacity-20 animate-pulse-bg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--web3-accent-blue)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--web3-accent-purple)_0%,_transparent_50%)] animate-pulse-bg-2"></div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={() => scrollToSection(topOfPageRef)}
          className="fixed bottom-8 right-8 bg-web3-accent-blue/80 hover:bg-web3-accent-blue text-web3-text-primary p-4 rounded-full shadow-web3-glow-blue-strong z-50 transition-all duration-300 flex items-center justify-center animate-fade-in-up"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Back to Home Link */}
        <Link
          to="/"
          className="inline-block mb-12 text-web3-accent-blue hover:underline font-semibold transition-colors duration-300 animate-fade-in"
        >
          ← Back to Quantum Hub
        </Link>

        <h1 className="relative text-center text-6xl md:text-7xl font-extrabold tracking-widest mb-16 animate-fade-in-up-delay">
          <span className="relative z-10 animate-pulse-light text-web3-accent-blue drop-shadow-[0_0_25px_rgba(33,150,243,0.8)]">
            Explore Quantum Zones
          </span>
          {/* Glitch overlays for visual effect */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 w-full h-full text-web3-accent-blue opacity-0 animate-glitch-1"
            style={{ mixBlendMode: "screen" }}
          >
            Explore Quantum Zones
          </span>
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 w-full h-full text-web3-accent-purple opacity-0 animate-glitch-2"
            style={{ mixBlendMode: "screen" }}
          >
            Explore Quantum Zones
          </span>
        </h1>

        {/* Search Input - FIXED ALIGNMENT */}
        <div className="flex justify-center mb-8 animate-fade-in delay-200">
          <div className="relative w-full max-w-xl"> {/* New wrapper for input and icon */}
            <input
              type="text"
              placeholder="Search zones by name, description, or tech..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset to first page on search
              }}
              // pl-12 to make space for the icon
              className="w-full pl-12 pr-5 py-4 rounded-3xl bg-web3-input-bg border border-web3-accent-blue placeholder-web3-placeholder text-web3-text-primary text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-web3-accent-blue shadow-web3-glow-blue transition"
            />
            {/* FaSearch icon now positioned absolutely within its new parent div */}
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-web3-text-secondary/70 text-xl" />
          </div>
        </div>

        {/* Filter Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12 text-sm animate-fade-in delay-300">
          {/* AI Level Filter */}
          <div className="relative">
            <select
              name="aiLevel"
              value={filters.aiLevel}
              onChange={handleFilterChange}
              className="w-full px-10 py-3 rounded-xl bg-web3-input-bg border border-web3-border text-web3-text-primary focus:outline-none focus:ring-2 focus:ring-web3-accent-purple shadow-web3-shadow-soft appearance-none"
            >
              <option value="">AI Level (Min)</option>
              {[...Array(11).keys()].slice(1).map((level) => (
                <option key={level} value={level}>{`Level ${level}+`}</option>
              ))}
            </select>
            <FaRobot className="absolute left-3 top-1/2 -translate-y-1/2 text-web3-text-secondary/70" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-web3-text-secondary">▼</span>
          </div>

          {/* Security Level Filter */}
          <div className="relative">
            <select
              name="securityLevel"
              value={filters.securityLevel}
              onChange={handleFilterChange}
              className="w-full px-10 py-3 rounded-xl bg-web3-input-bg border border-web3-border text-web3-text-primary focus:outline-none focus:ring-2 focus:ring-web3-accent-blue shadow-web3-shadow-soft appearance-none"
            >
              <option value="">Security (Min)</option>
              {[...Array(11).keys()].slice(1).map((level) => (
                <option key={level} value={level}>{`Level ${level}+`}</option>
              ))}
            </select>
            <MdSecurity className="absolute left-3 top-1/2 -translate-y-1/2 text-web3-text-secondary/70" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-web3-text-secondary">▼</span>
          </div>

          {/* Energy Source */}
          <div className="relative">
            <input
              type="text"
              name="energySource"
              value={filters.energySource}
              onChange={handleFilterChange}
              placeholder="Energy Source"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-web3-input-bg border border-web3-border text-web3-text-primary focus:outline-none focus:ring-2 focus:ring-web3-accent-orange shadow-web3-shadow-soft"
            />
            <FaLightbulb className="absolute left-3 top-1/2 -translate-y-1/2 text-web3-text-secondary/70" />
          </div>

          {/* Tech Filter */}
          <div className="relative">
            <input
              type="text"
              name="tech"
              value={filters.tech}
              onChange={handleFilterChange}
              placeholder="Notable Tech (e.g., Quantum)"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-web3-input-bg border border-web3-border text-web3-text-primary focus:outline-none focus:ring-2 focus:ring-web3-accent-green shadow-web3-shadow-soft"
            />
            <MdOutlineScience className="absolute left-3 top-1/2 -translate-y-1/2 text-web3-text-secondary/70" />
          </div>
        </div>

        {/* Zone Cards */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-6">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-web3-accent-blue shadow-web3-glow-blue"></div>
            <p className="text-lg text-web3-text-secondary font-semibold animate-pulse">
              Initializing Quantum Zone data...
            </p>
          </div>
        ) : filteredZones.length === 0 ? (
          <div className="text-center py-24 text-web3-text-secondary italic text-xl font-mono animate-fade-in">
            No Quantum Zones matched your criteria. Adjust filters or search terms.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {visibleZones.map((zone) => (
                <Link
                  key={zone._id}
                  to={`/city/${zone._id}`}
                  className="group relative flex flex-col bg-web3-card/80 rounded-3xl border border-web3-accent-blue/50 backdrop-blur-md shadow-web3-shadow-soft hover:shadow-web3-glow-blue-strong transition-all duration-400 transform hover:-translate-y-2 animate-fade-in"
                >
                  {zone.image && (
                    <div className="rounded-t-3xl overflow-hidden relative">
                      <img
                        src={zone.image}
                        alt={zone.name}
                        className="w-full h-52 object-cover group-hover:brightness-110 transition duration-500"
                        loading="lazy"
                      />
                      {/* Gradient overlay for image */}
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-web3-accent-blue/80 to-transparent pointer-events-none rounded-b-3xl"></div>
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-3">
                    <h3 className="text-3xl font-extrabold text-web3-accent-blue drop-shadow-[0_0_15px_rgba(33,150,243,0.9)] tracking-wide">
                      {zone.name}
                    </h3>
                    <p className="text-web3-text-primary/90 text-sm leading-relaxed line-clamp-4">
                      {zone.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-web3-accent-purple font-mono">
                      <div className="flex items-center gap-2">
                        <FaUsers /> Population: {zone.population?.toLocaleString() ?? "Unknown"}
                      </div>
                      <div className="flex items-center gap-2">
                        <MdSecurity /> Security: Level {zone.cyberSecurityLevel ?? "N/A"}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaRobot /> AI: Level {zone.aiIntegrationLevel ?? "N/A"}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaLightbulb /> Energy: {zone.energySource ?? "Unknown"}
                      </div>
                    </div>

                    {zone.notableTech?.length > 0 && (
                      <div className="mt-5">
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-web3-accent-green mb-2">
                          Core Technologies
                        </h4>
                        <ul className="flex flex-wrap gap-2">
                          {zone.notableTech.map((tech, idx) => (
                            <li
                              key={idx}
                              className="bg-web3-accent-green/30 px-3 py-1 rounded-full text-xs tracking-wide text-web3-text-primary"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-8 font-semibold text-web3-accent-orange tracking-wider text-lg group-hover:text-web3-accent-blue transition-all duration-300">
                      Access Zone Grid →
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Lazy Loading Target */}
            {hasMore && (
              <div
                ref={observerRef}
                className="h-24 flex justify-center items-center mt-12 text-web3-text-secondary animate-pulse"
              >
                ⏳ Initializing more Quantum Zones...
              </div>
            )}

            {/* Fallback Load More Button (if observer fails or for specific user preference) */}
            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={loadMore}
                  className="bg-gradient-to-r from-web3-accent-blue to-web3-accent-purple text-web3-text-primary text-lg font-bold px-8 py-3 rounded-full shadow-web3-glow-blue hover:shadow-web3-glow-blue-strong transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  🔽 Load More Zones
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-web3-text-secondary/70 text-sm py-4 border-t border-web3-border/30 relative z-10">
        <p>&copy; {currentYear} Dhaka 2070 Quantum Zones. All Rights Reserved.</p>
        <p className="mt-2">
          Harnessing the future, one zone at a time.
        </p>
      </footer>
    </div>
  );
}