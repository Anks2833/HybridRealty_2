import React, { useRef, useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroimage from "../assets/images/heroimage.png";
import hybridLogo from "../assets/Hybrid_Logo.png";
import { RadialGradient } from "react-text-gradients";

const popularLocations = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai"
];

export const AnimatedContainer = ({ children, distance = 100, direction = "vertical", reverse = false }) => {
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
    },
    to: inView ? { transform: `translate${directions[direction]}(0px)` } : {},
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

  const handleSubmit = (location = searchQuery) => {
    navigate(`/properties?location=${encodeURIComponent(location)}`);
  };

  return (
    <AnimatedContainer distance={50} direction="vertical">
      <div className="relative mt-[20vh] mb-0 sm:mt-[30vh] sm:mb-[10vh]">
        {/* Invest Button at the Top Right */}
        {/* <button
  onClick={() => navigate("/add")}
  className="absolute z-10 top-4 right-10 bg-[var(--theme-color-1)] text-white px-6 py-3 rounded-xl hover:bg-[var(--theme-hover-color-1)] transition-colors flex items-center justify-center gap-2 font-medium shadow-md"
>
  Invest
</button> */}


        <div className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 mx-6">
          {/* Background Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0 rounded-2xl overflow-hidden"
            style={{
              // backgroundImage: `url(${heroimage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 via-slate/10 to-transparent" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="mb-4 sm:mb-12 flex justify-center"
                >
                  <img
                    src={hybridLogo}
                    alt="hybrid logo"
                    className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64"
                  />
                </motion.div>


            
            {/* Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative max-w-md mx-auto"
            >
              <div className="flex flex-col md:flex-row gap-4 p-2 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Enter location..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-0 bg-white/90 shadow-sm focus:ring-2 focus:ring-[var(--theme-hover-color-1)] transition-all"
                  />
                </div>
                <button
                  onClick={() => handleSubmit()}
                  className="md:w-auto w-full bg-[var(--theme-color-1)] text-white px-6 py-2 rounded-xl hover:bg-[var(--theme-hover-color-1)] transition-colors flex items-center justify-center gap-2 font-medium shadow-md"
                >
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};


export default Hero;