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
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/4770380/4770380-sd_640_360_30fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10"></div>
      </div>

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
            <div className="px-10 py-6 bg-white/10 backdrop-blur-md rounded-full mb-6">
              <img
                src={hybridLogo}
                alt="Hybrid Realty"
                className="w-28 sm:w-32 md:w-40 lg:w-44"
              />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-center">
              Find Your{" "}
              <span className="text-blue-200">{typedText}</span>
              <span
                className={`${
                  cursorVisible ? "opacity-100" : "opacity-0"
                } transition-opacity duration-100`}
              >
                |
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl text-center mb-6">
              Discover the perfect property to call home or invest in your
              future
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full max-w-3xl mx-auto relative"
          >
            <div className="flex flex-col md:flex-row gap-4 p-2.5 bg-white/15 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
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

                {/* Location Suggestions */}
                {/* <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 right-0 mt-2 py-2 bg-white/20 backdrop-blur-xl rounded-xl shadow-lg z-20 border border-white/30"
                    >
                      {popularLocations.map((location, index) => (
                        <motion.div
                          key={location}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleSuggestionClick(location)}
                          className="px-4 py-2 hover:bg-white/20 cursor-pointer text-white flex items-center"
                        >
                          <MapPin className="w-4 h-4 mr-2 text-[var(--theme-color-1)]" />
                          {location}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence> */}
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
              className="flex items-center gap-2 px-5 py-3 bg-white/15 backdrop-blur-md rounded-xl border border-white/20 text-white hover:bg-white/25 transition-all"
              onClick={() => navigate("/properties")}
            >
              <Home className="w-5 h-5" />
              <span>All Properties</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3 bg-white/15 backdrop-blur-md rounded-xl border border-white/20 text-white hover:bg-white/25 transition-all"
              onClick={() => navigate("/invest")}
            >
              <Building className="w-5 h-5" />
              <span>Investment Options</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3 bg-white/15 backdrop-blur-md rounded-xl border border-white/20 text-white hover:bg-white/25 transition-all"
              onClick={() => navigate("/add")}
            >
              <PlusCircle className="w-5 h-5" />
              <span>Add Property</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        {/* <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <p className="text-white/70 text-sm mb-2">Scroll to explore</p>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="w-1.5 h-3 bg-white/70 rounded-full mt-1.5"
            />
          </motion.div>
        </motion.div> */}
      </div>
    </div>
  );
};

export default Hero;
