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

    // Cursor blinking effect
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
    <div className="relative w-full mt-11 h-screen overflow-hidden">
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Primary Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-900"></div>
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(40deg,var(--theme-color-1),transparent,var(--theme-hover-color-1),transparent)] bg-[length:200%_200%] animate-gradient-slow"></div>
        
        {/* Radial Accent */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giIHJlc3VsdD0ibm9pc2UiLz48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')]"></div>
      </div>

      {/* Semi-transparent light beams */}
      <div className="absolute left-1/3 top-0 w-1/4 h-full bg-white opacity-[0.03] rotate-12 transform -translate-x-1/2"></div>
      <div className="absolute right-1/4 top-0 w-1/5 h-full bg-white opacity-[0.02] -rotate-12"></div>

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
            <div className="px-10 py-6 bg-white/10 backdrop-blur-md rounded-full mb-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all">
              <img
                src={hybridLogo}
                alt="Hybrid Realty"
                className="w-28 sm:w-32 md:w-40 lg:w-44"
              />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-center">
              Invest, Settle{" "}
              <span className="text-blue-200 drop-shadow-md">&</span>{" "}
              <span className="text-blue-100 drop-shadow-lg">Grow</span>
            </h1>

            {/* <p className="text-xl md:text-2xl text-white/90 max-w-3xl text-center mb-6 drop-shadow-md">
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
            <div className="flex flex-col md:flex-row gap-4 p-2.5 bg-white/15 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 hover:bg-white/20 transition-all">
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 150)
                  }
                  placeholder="Enter location or property type..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-0 bg-white/10 backdrop-blur-md text-white placeholder-white/70 shadow-inner focus:ring-2 focus:ring-[var(--theme-hover-color-1)]/50 focus:bg-white/20 transition-all"
                />
              </div>

              <button
                onClick={() => handleSubmit()}
                className="md:w-auto w-full bg-[var(--theme-color-1)] text-white px-8 py-4 rounded-xl hover:bg-[var(--theme-hover-color-1)] transition-all flex items-center justify-center gap-2 font-medium shadow-lg transform hover:scale-105 active:scale-95"
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
            className="flex flex-wrap gap-4 mt-8 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3 bg-white/15 backdrop-blur-md rounded-xl border border-white/20 text-white hover:bg-white/25 transition-all shadow-lg"
              onClick={() => navigate("/properties")}
            >
              <Home className="w-5 h-5" />
              <span>All Properties</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3 bg-white/15 backdrop-blur-md rounded-xl border border-white/20 text-white hover:bg-white/25 transition-all shadow-lg"
              onClick={() => navigate("/invest")}
            >
              <Building className="w-5 h-5" />
              <span>Investment Options</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3 bg-white/15 backdrop-blur-md rounded-xl border border-white/20 text-white hover:bg-white/25 transition-all shadow-lg"
              onClick={() => navigate("/add")}
            >
              <PlusCircle className="w-5 h-5" />
              <span>Add Property</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;