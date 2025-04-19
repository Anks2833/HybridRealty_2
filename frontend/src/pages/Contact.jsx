import React from "react";
import { motion } from "framer-motion";
import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/contactForm";
import ContactInfo from "../components/contact/ContactInfo";

const Contact = () => {
  // Background pattern for visual interest
  const bgPattern = (
    <div className="absolute inset-0 z-0 opacity-5">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Background elements */}
      {bgPattern}
      <div className="absolute top-20 right-0 w-80 h-80 bg-[var(--theme-color-1)]/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--theme-hover-color-1)]/10 rounded-full filter blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-16 relative z-10"
      >
        {/* <ContactHero /> */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Legal advice for property dispute
            </motion.h2>
            {/* <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg text-gray-600"
            >
              We're here to help with all your real estate needs. Reach out to our team for personalized assistance.
            </motion.p> */}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            <ContactForm />
            <ContactInfo />
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-20 rounded-3xl overflow-hidden shadow-lg h-96 border-4 border-white"
            id="map"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7006.511266750969!2d77.02303136498499!3d28.592106952341446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1ab75625f03d%3A0xb08470618ba72e09!2sSector%2017%20Dwarka%2C%20Kakrola%2C%20Delhi%2C%20110075!5e0!3m2!1sen!2sin!4v1745056390151!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            ></iframe>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;

{
  /* <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7006.511266750969!2d77.02303136498499!3d28.592106952341446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1ab75625f03d%3A0xb08470618ba72e09!2sSector%2017%20Dwarka%2C%20Kakrola%2C%20Delhi%2C%20110075!5e0!3m2!1sen!2sin!4v1745056390151!5m2!1sen!2sin"
  width="600"
  height="450"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
></iframe>; */
}
