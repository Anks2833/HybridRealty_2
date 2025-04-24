import React, { useRef, useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import {
  Search,
  MapPin,
  ArrowRight,
  MessageCircle,
  Home,
  Building,
  PlusCircle,
  TrendingUp,
  Flame
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

  // Video background effect
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
        // Add play button or other fallback if needed
      });
    }
  }, []);

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
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://videos.pexels.com/video-files/2818559/2818559-sd_640_360_24fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Overlay for video */}
        <div className="absolute inset-0 bg-black/75   z-10"></div>
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
            {/* <div className="px-10 py-6 bg-white/10 backdrop-blur-md rounded-full mb-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all">
              <img
                src={hybridLogo}
                alt="Hybrid Realty"
                className="w-28 sm:w-32 md:w-40 lg:w-44"
              />
            </div> */}

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-center">
              Invest, <span className="text-blue-400">Settle</span>{" "}
              <span className="text-white">&</span>{" "}
              <span className="text-green-400">Grow</span>
            </h1>

            {/* <p className="text-xl md:text-2xl text-zinc-200 max-w-3xl text-center mb-6">
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
            <div className="flex flex-col md:flex-row gap-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 transition-all">
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
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-zinc-200 bg-zinc-50/90 text-zinc-800 placeholder-zinc-400 shadow-sm focus:ring-2 focus:ring-[var(--theme-hover-color-1)]/50 focus:border-[var(--theme-color-1)] transition-all"
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
            className="flex flex-wrap gap-4 mt-8 justify-center"
          >
            {/* Hot Deals Button - Styled differently */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl text-white hover:from-red-600 hover:to-orange-600 transition-all shadow-md relative overflow-hidden"
              onClick={() => navigate("/hot-deals")}
            >
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-xl"></div>
              
              <Flame className="w-4 h-4 text-yellow-200 animate-bounce" />
              <span className="text-sm font-medium relative z-10">Hot Deals</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 text-zinc-800 hover:bg-white/100 transition-all shadow-md"
              onClick={() => navigate("/invest")}
            >
              <TrendingUp className="w-3 h-3 text-[var(--theme-color-1)]" />
              <span className="text-xs">Invest</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 text-zinc-800 hover:bg-white/100 transition-all shadow-md"
              onClick={() => navigate("/add")}
            >
              <PlusCircle className="w-3 h-3 text-[var(--theme-color-1)]" />
              <span className="text-xs">Add</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 text-zinc-800 hover:bg-white/100 transition-all shadow-md"
              onClick={() => navigate("/properties")}
            >
              <Search className="w-3 h-3 text-[var(--theme-color-1)]" />
              <span className="text-xs">Properties</span>
            </motion.button>

            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3 bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 text-zinc-800 hover:bg-white/100 transition-all shadow-md"
              onClick={() => navigate("/contact")}
            >
              <MessageCircle className="w-5 h-5 text-[var(--theme-color-1)]" />
              <span>Property Dispute</span>
            </motion.button> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;