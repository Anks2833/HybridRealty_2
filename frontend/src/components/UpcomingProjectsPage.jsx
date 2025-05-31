import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Building, Tag, Users, Calendar, Loader, Search } from "lucide-react";
import UpcomingProjectCard from "./UpcomingProjectCard.jsx";
import { Backendurl } from "../App.jsx";
import { Helmet } from "react-helmet-async";

const UpcomingProjectsPage = () => {
  const [upcomingProjects, setUpcomingProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    const fetchUpcomingProjects = async () => {
      try {
        setLoading(true);

        // console.log(Backendurl)
        const response = await axios.get(`${Backendurl}/api/upcoming-projects`);
        
        // console.log('response : ',response);
        if (response.data.success) {
          setUpcomingProjects(response.data.projects);
          setError(null);
        } else {
          throw new Error(response.data.message);
        }

      } catch (err) {
        console.error("Error fetching upcoming projects:", err);
        setError("Failed to load upcoming projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUpcomingProjects();
  }, []);
  
  // Filter projects based on search query
  const filteredProjects = upcomingProjects.filter((project) => {
    const search = searchQuery ? searchQuery.toLowerCase() : ''; // Default to empty string if searchQuery is null or undefined
    return (project.title && project.title.toLowerCase().includes(search)) ||
           (project.location && project.location.toLowerCase().includes(search));
  });
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex flex-col items-center justify-center">
            <Loader className="w-12 h-12 text-[var(--theme-color-1)] animate-spin mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Loading...</h3>
          </div>
        </motion.div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-red-600 p-6 rounded-lg bg-red-50 max-w-md"
        >
          <p className="font-medium mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[var(--theme-color-1)] text-white rounded-lg hover:bg-[var(--theme-hover-color-1)] transition-colors duration-200"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }
  
  return (

    <>

<Helmet>
      {/* Page Title */}
      <title>Upcoming Real Estate Projects | Hybrid Realty - Future Developments</title>
      
      {/* Meta Description */}
      <meta 
        name="description" 
        content="Explore exciting upcoming real estate projects by Hybrid Realty. Get early insights into new residential, commercial, and investment properties before they hit the market."
      />
      
      {/* Keywords */}
      <meta 
        name="keywords" 
        content="upcoming real estate projects, new property developments, pre-launch properties, real estate investment opportunities, future real estate, property previews"
      />
      
      {/* Open Graph / Social Media */}
      <meta property="og:title" content="Upcoming Real Estate Projects | Hybrid Realty - Future Developments" />
      <meta 
        property="og:description" 
        content="Explore exciting upcoming real estate projects by Hybrid Realty. Get early insights into new residential, commercial, and investment properties before they hit the market."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      <meta 
        property="og:image" 
        content="/upcoming-projects-og-image.jpg" 
      />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Upcoming Real Estate Projects | Hybrid Realty - Future Developments" />
      <meta 
        name="twitter:description" 
        content="Explore exciting upcoming real estate projects by Hybrid Realty. Get early insights into new residential, commercial, and investment properties before they hit the market."
      />
      <meta 
        name="twitter:image" 
        content="/upcoming-projects-og-image.jpg" 
      />
    </Helmet>



    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Upcoming Real Estate Projects",
        "description": "Comprehensive listing of future real estate developments and investment opportunities",
        "mainEntity": {
          "@type": "CollectionPage",
          "name": "Real Estate Project Previews",
          "description": "Early access to upcoming residential and commercial property projects",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${window.location.origin}/upcoming-projects?search={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        },
        "publisher": {
          "@type": "Organization",
          "name": "Hybrid Realty",
          "url": window.location.origin,
          "logo": "/logo.jpg"
        },
        "about": {
          "@type": "RealEstateProject",
          "description": "Collection of pre-launch and upcoming real estate developments",
          "additionalProperty": {
            "@type": "PropertyValue",
            "name": "Project Status",
            "value": ["Pre-launch", "Upcoming", "Under Development"]
          }
        }
      })}
    </script>
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          {/* <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Upcoming Projects
          </h1> */}
          {/* <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Register your interest for our exciting upcoming properties before they hit the market
          </p> */}
        </motion.header>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by project name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--theme-hover-color-1)] focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>
        </div>
        
        {/* Stats Section */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{upcomingProjects.length}</h3>
              <p className="text-gray-600">Upcoming Projects</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full text-green-600">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {upcomingProjects.filter(project => 
                  new Date(project.launchDate) > new Date()
                ).length}
              </h3>
              <p className="text-gray-600">Projects Coming Soon</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full text-purple-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {upcomingProjects.reduce((total, project) => total + (project.registeredUsers || 0), 0)}
              </h3>
              <p className="text-gray-600">Total Registrations</p>
            </div>
          </div>
        </div> */}
        
        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <UpcomingProjectCard key={project._id} project={project} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-12 bg-white rounded-lg shadow-sm"
              >
                <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No upcoming projects found
                </h3>
                <p className="text-gray-600">
                  {searchQuery
                    ? `No projects match "${searchQuery}"`
                    : "There are currently no upcoming projects available"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default UpcomingProjectsPage;