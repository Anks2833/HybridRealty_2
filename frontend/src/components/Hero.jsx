import React, { useRef, useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import {
  Search,
  MapPin,
  ArrowRight,
  Home,
  Building,
  PlusCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import hybridLogo from "../assets/Hybrid_Logo.png";

const popularLocations = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
];

export const AnimatedContainer = ({
  children,
  distance = 100,
  direction = "vertical",
  reverse = false,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const directions = {
    vertical: "Y",
    horizontal: "X",
  };

  const springProps = useSpring({
    from: {
      transform: `translate${directions[direction]}(${
        reverse ? `-${distance}px` : `${distance}px`
      })`,
      opacity: 0,
    },
    to: inView
      ? {
          transform: `translate${directions[direction]}(0px)`,
          opacity: 1,
        }
      : {},
    config: { tension: 50, friction: 25 },
  });

  return (
    <animated.div ref={ref} style={springProps}>
      {children}
    </animated.div>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [typedText, setTypedText] = useState("");
  const phrases = ["Dream Home", "Perfect Investment", "Ideal Property"];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const videoRef = useRef(null);

  // Typing effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    const cursorBlinkSpeed = 500;

    // Cursor blinking effectt
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, cursorBlinkSpeed);

    // Typing/deleting effect
    const typerInterval = setTimeout(() => {
      if (!isDeleting) {
        // Still typing
        if (typedText.length < currentPhrase.length) {
          setTypedText(currentPhrase.substring(0, typedText.length + 1));
        } else {
          // Done typing, pause before deleting
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // Deleting
        if (typedText.length > 0) {
          setTypedText(typedText.substring(0, typedText.length - 1));
        } else {
          // Move to next phrase
          setIsDeleting(false);
          setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        }
      }
    }, typeSpeed);

    return () => {
      clearTimeout(typerInterval);
      clearInterval(cursorInterval);
    };
  }, [typedText, currentPhraseIndex, isDeleting, phrases]);

  const handleSubmit = (location = searchQuery) => {
    navigate(`/properties?location=${encodeURIComponent(location)}`);
  };

  const handleSuggestionClick = (location) => {
    setSearchQuery(location);
    setShowSuggestions(false);
    handleSubmit(location);
  };

  return (
    <div className="relative w-full mt-11 h-screen overflow-hidden bg-white">

      {/* Content */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-4">
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
          {/* Logo and Tagline */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8 flex flex-col items-center"
          >
            {/* <div className="px-10 py-6 bg-white/10 backdrop-blur-md rounded-full mb-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all">
              <img
                src={hybridLogo}
                alt="Hybrid Realty"
                className="w-28 sm:w-32 md:w-40 lg:w-44"
              />
            </div> */}

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-zinc-800 mb-4 text-center">
              Invest, <span className="text-blue-600">Settle</span>{" "}
              <span className="text-zinc-900">&</span>{" "}
              <span className="text-green-600">Grow</span>
            </h1>

            {/* <p className="text-xl md:text-2xl text-zinc-700 max-w-3xl text-center mb-6">
              Discover the perfect property to call home or invest in your
              future
            </p> */}
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full max-w-3xl mx-auto relative"
          >
            <div className="flex flex-col md:flex-row gap-4 p-2.5 bg-white rounded-2xl shadow-md border border-zinc-200 transition-all">
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 150)
                  }
                  placeholder="Enter location or property type..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-800 placeholder-zinc-400 shadow-sm focus:ring-2 focus:ring-[var(--theme-hover-color-1)]/50 focus:border-[var(--theme-color-1)] transition-all"
                />
              </div>

              <button
                onClick={() => handleSubmit()}
                className="md:w-auto w-full bg-[var(--theme-color-1)] text-white px-8 py-4 rounded-xl hover:bg-[var(--theme-hover-color-1)] transition-all flex items-center justify-center gap-2 font-medium shadow-md transform hover:scale-105 active:scale-95"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>
          </motion.div>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex gap-4 mt-8 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3 bg-zinc-50 rounded-xl border border-zinc-200 text-zinc-800 hover:bg-zinc-100 transition-all shadow-md"
              onClick={() => navigate("/properties")}
            >
              <Home className="w-5 h-5 text-[var(--theme-color-1)]" />
              <span>Properties</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3 bg-zinc-50 rounded-xl border border-zinc-200 text-zinc-800 hover:bg-zinc-100 transition-all shadow-md"
              onClick={() => navigate("/invest")}
            >
              <Building className="w-5 h-5 text-[var(--theme-color-1)]" />
              <span>Invest</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3 bg-zinc-50 rounded-xl border border-zinc-200 text-zinc-800 hover:bg-zinc-100 transition-all shadow-md"
              onClick={() => navigate("/add")}
            >
              <PlusCircle className="w-5 h-5 text-[var(--theme-color-1)]" />
              <span>Add</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;