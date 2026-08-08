"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/components/AuthContext";
import { useToast } from "@/components/ui";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { token, logout } = useAuth();
  const { showToast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Dynamic Navigation Links
  const links = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/assistant", label: "Assistant" },
  ];

  if (token) {
    links.push({ href: "/dashboard", label: "Dashboard" });
    links.push({ href: "/profile", label: "Profile" });
  } else {
    links.push({ href: "/login", label: "Login" });
    links.push({ href: "/signup", label: "Signup" });
  }

  // Active section tracker using Intersection Observer
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["home", "featured-homestays", "about"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Trigger when section is in standard reading zone
      threshold: 0.08,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [pathname]);

  const handleLinkClick = (e, href) => {
    if (pathname === "/") {
      if (href === "/#about") {
        e.preventDefault();
        const element = document.getElementById("about");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      } else if (href === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
      }
    }
  };

  const handleMobileLinkClick = (e, href) => {
    setMenuOpen(false);
    if (pathname === "/") {
      if (href === "/#about") {
        e.preventDefault();
        const element = document.getElementById("about");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      } else if (href === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
      }
    }
  };

  const handleThemeToggle = () => {
    const newTheme = toggleTheme();
    showToast(`Switched to ${newTheme === "dark" ? "Dark" : "Light"} Mode`, "success");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md dark:border-gray-800/80 dark:bg-gray-950/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-primary-700 dark:text-primary-400 hover:opacity-90 transition-opacity"
          onClick={(e) => handleLinkClick(e, "/")}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm text-white shadow-sm shadow-primary-500/50">
            E
          </span>
          <span className="bg-gradient-to-r from-primary-700 to-emerald-600 bg-clip-text text-transparent dark:from-primary-400 dark:to-emerald-400 font-serif">
            EcoStay
          </span>
        </Link>

        {/* Desktop Links & Action Buttons */}
        <div className="hidden items-center gap-5 md:flex">
          {links.map((link) => {
            const isHome = pathname === "/";
            let isActive = false;
            if (isHome) {
              if (link.href === "/" && (activeSection === "home" || activeSection === "featured-homestays" || activeSection === "")) {
                isActive = true;
              } else if (link.href === "/#about" && activeSection === "about") {
                isActive = true;
              }
            } else {
              isActive = pathname === link.href;
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative px-1 py-1 text-sm font-semibold transition-colors hover:text-primary-650 dark:hover:text-primary-400 ${
                  isActive
                    ? "text-primary-650 dark:text-primary-400"
                    : "text-gray-650 dark:text-gray-300"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary-600 dark:bg-primary-400" />
                )}
              </Link>
            );
          })}

          <div className="h-4 w-px bg-gray-200 dark:bg-gray-800" />

          {/* Theme Toggle Button */}
          <button
            onClick={handleThemeToggle}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-150 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-all duration-250 cursor-pointer shadow-sm border border-gray-200/50 dark:border-gray-800"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {token && (
            <button
              onClick={logout}
              className="text-sm font-semibold text-red-650 hover:text-red-500 transition-colors cursor-pointer ml-1"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile menu trigger & Theme toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={handleThemeToggle}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-150 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors cursor-pointer border border-gray-200/50 dark:border-gray-850"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="rounded-lg border border-gray-200 p-2 text-gray-600 dark:border-gray-800 dark:text-gray-300"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="border-t border-gray-200 px-4 py-4 md:hidden dark:border-gray-800/80 bg-white dark:bg-gray-950">
          <div className="flex flex-col gap-2">
            {links.map((link) => {
              const isHome = pathname === "/";
              let isActive = false;
              if (isHome) {
                if (link.href === "/" && (activeSection === "home" || activeSection === "featured-homestays" || activeSection === "")) {
                  isActive = true;
                } else if (link.href === "/#about" && activeSection === "about") {
                  isActive = true;
                }
              } else {
                isActive = pathname === link.href;
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleMobileLinkClick(e, link.href)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-400"
                      : "text-gray-650 hover:bg-gray-55 dark:text-gray-300 dark:hover:bg-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {token && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
                className="text-left rounded-lg px-3 py-2 text-sm font-semibold text-red-650 hover:bg-red-50/50 dark:text-red-450 dark:hover:bg-red-950/20 cursor-pointer"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}