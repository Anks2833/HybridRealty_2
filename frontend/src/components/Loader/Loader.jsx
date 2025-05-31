import { useState, useEffect } from "react";

const Loader = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000); // 2 seconds minimum display time

    return () => clearTimeout(timer);
  }, []);

  return showLoader ? (
    <div className="w-full h-screen flex justify-center items-center">
      <img src="/hrLogo.svg" alt="Loading..." className="w-96 h-96" />
    </div>
  ) : null;
};

export default Loader;
