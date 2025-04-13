import { useState, useEffect , useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  MapPin, 
  IndianRupee, 
  BedDouble, 
  Bath, 
  Maximize, 
  Heart,
  Eye,
  ArrowRight,
  Building,
  Search,
  TrendingUp,
  Hash
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// import { Backendurl } from '../App';
import PropTypes from "prop-types";
import { Backendurl } from "../../App";
import { toast } from "react-toastify";






const InvestmentPropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);


  useEffect(() => {
    checkIfFavorite();
  }, [property._id]);

  const checkIfFavorite = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // toast.error('Please log in to add properties to your favorites');
        return;
      }
  
      // Make API call to check favorites
      const response = await axios.get(
        `${Backendurl}/api/users/check-favorite/${property._id}`, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
  
      // Set favorite status based on server response
      setIsFavorite(response.data.isFavorite);
    } catch (error) {
      console.error('Error checking favorite status:', error);
      
      // More detailed error logging
      if (error.response) {
        console.error('Error details:', {
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers
        });
        
        // Handle specific error scenarios
        if (error.response.status === 401) {
          toast.error('Please log in again');
        } else {
          toast.error('Failed to check favorite status');
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
        toast.error('Network error. Please check your connection.');
      } else {
        console.error('Error setting up request:', error.message);
        toast.error('An unexpected error occurred');
      }
      
      // Ensure favorite state is reset
      setIsFavorite(false);
    }
  };

  const toggleFavorite = async (e) => {
    e.stopPropagation(); // Prevent navigating to property details
    
    try {
      // Check if user is logged in
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to add properties to your favorites');
        return;
      }
      
      // Make API call to toggle favorite
      const response = await axios.post(
        `${Backendurl}/api/users/toggle-wishlist`, 
        { propertyId: property._id },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        // Update local state based on server response
        // setIsFavorite(response.data.isFavorite);
        
        setIsFavorite(!isFavorite);

        // console.log(response.data);
        // Provide user feedback
        if (response.data.isInWishlist) {
          toast.success(`${property.title} added to favorites`);
        } else {
          toast.success(`${property.title} removed from favorites`);
        }
      } else {
        toast.error(response.data.message || 'Failed to update favorites');
      }
    } catch (error) {
      // More comprehensive error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Detailed error response:', {
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers
        });
  
        // Different error messages based on status code
        switch (error.response.status) {
          case 401:
            toast.error('Unauthorized. Please log in again.');
            // Optionally: log out the user, redirect to login
            break;
          case 404:
            toast.error('Property not found');
            break;
          case 500:
            toast.error('Server error. Please try again later.');
            break;
          default:
            toast.error(
              error.response.data.message || 
              'An unexpected error occurred while updating favorites'
            );
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        toast.error('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        toast.error('An unexpected error occurred');
      }
    }
  };

  const handleNavigate = () => {
    navigate(`/properties/single/${property._id}`);
  };

  // Calculate ROI metrics
  const monthlyIncome = property.invest || property.monthlyRent || 0;
  const annualYield = ((Number(monthlyIncome) * 12 / Number(property.price)) * 100).toFixed(2);
  const roiYears = (Number(property.price) / (Number(monthlyIncome) * 12)).toFixed(1);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={handleNavigate}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Property Image */}
      <div className="relative h-64">
        <img
          src={property.image[0]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
        {/* Property badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-[var(--theme-color-1)] text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md">
            {property.type}
          </span>
          
          {/* Investment Badge */}
          <span className="bg-[var(--theme-investment-card-tag)] text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Investment
          </span>
          
          {/* Serial Number */}
          {property.serialNumber && (
            <span className="bg-black/70 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
              <Hash className="w-3 h-3" />
              {property.serialNumber}
            </span>
          )}
        </div>
        
        {/* Favorite button */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Stop propagation at the earliest point
            toggleFavorite(e);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 z-[10]
            ${isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:text-red-500'}`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        
        {/* View overlay on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="px-5 py-3 bg-white text-amber-500 rounded-lg font-medium flex items-center gap-2 shadow-lg"
              >
                <Eye className="w-5 h-5" />
                View Investment
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Property Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-amber-500 transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-amber-500" />
          <span className="line-clamp-1">{property.location}</span>
        </div>
        
        {/* Investment Highlight */}
        <div className="bg-amber-50 p-3 rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-amber-700 font-medium">Monthly Income</p>
              <div className="flex items-center text-amber-500 font-bold">
                <IndianRupee className="h-4 w-4" />
                <span>{Number(monthlyIncome).toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-amber-700 font-medium">Annual Yield</p>
              <p className="font-bold text-amber-500">{annualYield}%</p>
            </div>
            
            <div>
              <p className="text-xs text-amber-700 font-medium">ROI Period</p>
              <p className="font-bold text-amber-500">{roiYears} years</p>
            </div>
          </div>
        </div>
        
        {/* Property Features */}
        <div className="flex justify-between items-center py-3 border-y border-gray-100 mb-4">
          <div className="flex items-center gap-1">
            <BedDouble className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-gray-600">{property.beds} {property.beds > 1 ? 'Beds' : 'Bed'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-gray-600">{property.baths} {property.baths > 1 ? 'Baths' : 'Bath'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-gray-600">{property.sqft} sqft</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-[var(--theme-color-1)] font-bold">
            <IndianRupee className="h-5 w-5 mr-1" />
            <span className="text-xl">{Number(property.price).toLocaleString('en-IN')}</span>
          </div>
          
          <div className="text-sm bg-amber-50 text-amber-700 px-2 py-1 rounded-md flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            Investment
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedInvestedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef(null);

  const categories = [
    { id: 'all', label: 'All Properties' },
    { id: 'apartment', label: 'Apartments' },
    { id: 'villa', label: 'Villas' },
    { id: 'house', label: 'Houses' },
    { id: 'farmhouse', label: 'farmhouse' },
    { id: 'commercial properties', label: 'commercial properties' },
    { id: 'shops', label: 'shops' },
    { id: 'office spaces', label: 'office spaces' },
    { id: 'plots/lands', label: 'plots/lands' },
  ];


  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setMobileDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  useEffect(() => {
    const fetchInvestmentProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${Backendurl}/api/products/list`);
  
        if (response.data.success) {
          // Filter only approved investment properties
          const investmentProperties = response.data.property
            .filter(property => 
              property.isApproved && property.lp === false &&
              ((property.invest && property.invest !== "") || property.isForInvestment)
            )
            .slice(0, 6); // Take only first 6 properties for the featured section
  
          setProperties(investmentProperties);
        } else {
          setError('Failed to fetch investment properties');
          // Fallback to sample data
          // setProperties(sampleInvestmentProperties);
        }
      } catch (err) {
        console.error('Error fetching investment properties:', err);
        setError('Failed to load investment properties. Using sample data instead.');
        // Fallback to sample data
        // setProperties(sampleInvestmentProperties);
      } finally {
        setLoading(false);
      }
    };
  
    fetchInvestmentProperties();
  }, []);

  const filteredProperties = activeCategory === 'all' 
    ? properties 
    : properties.filter(property => property.type.toLowerCase() === activeCategory);

  const viewAllInvestments = () => {
    navigate('/investments');
  };

  if (loading) {
    return (
      <div className="py-20 bg-amber-50/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-amber-200/50 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-5 bg-amber-100/50 rounded w-1/4 mx-auto mb-16"></div>
            
            <div className="h-10 bg-amber-100/30 rounded-lg w-full max-w-md mx-auto mb-8 flex justify-center gap-4">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="h-8 bg-amber-200/40 rounded-full w-24"></div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-xl shadow h-96">
                  <div className="h-64 bg-amber-100/50 rounded-t-xl"></div>
                  <div className="p-6">
                    <div className="h-6 bg-amber-100/50 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-amber-100/30 rounded w-1/2 mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-6 bg-amber-100/40 rounded w-1/3"></div>
                      <div className="h-6 bg-amber-100/40 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-amber-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-600 font-semibold tracking-wide uppercase text-sm">Smart Investments</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Investment Opportunities
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover premium properties with excellent rental income potential and strong investment returns
          </p>
        </motion.div> */}

        {/* Category filter */}
        <motion.div 
  className="flex flex-wrap justify-center gap-4 mb-12"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  {/* Desktop view - original buttons */}
  <div className="hidden md:flex flex-wrap gap-2">
    {categories.map((category) => (
      <button
        key={category.id}
        onClick={() => setActiveCategory(category.id)}
        className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-200
          ${activeCategory === category.id 
            ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' 
            : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'}`}
      >
        {category.label}
      </button>
    ))}
  </div>

  {/* Mobile view - dropdown menu with explicit ref name */}
  <div className="relative md:hidden flex justify-end w-full" ref={categoryDropdownRef}>
    <button
      onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
      className="flex items-center justify-center w-[200px] gap-2 px-4 py-2.5 rounded-full font-medium text-sm shadow-md
        bg-amber-500 text-white border border-amber-500/20 
        transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/10"
    >
      <span>
        {categories.find(c => c.id === activeCategory)?.label || 'Select Category'}
      </span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={`transition-transform duration-300 ease-in-out ${mobileDropdownOpen ? 'rotate-180' : ''}`}
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
    
    {mobileDropdownOpen && (
      <div className="absolute top-full right-0 mt-2 w-60 z-20 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
        <div className="max-h-64 overflow-y-auto py-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setMobileDropdownOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm transition-all
                ${activeCategory === category.id 
                  ? 'bg-gray-50 text-amber-500 font-medium border-l-4 border-amber-500' 
                  : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'}`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
</motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-amber-700 bg-amber-50 p-4 rounded-lg border border-amber-200 mb-8 max-w-md mx-auto text-center"
          >
            <p className="font-medium mb-1">Note: {error}</p>
            <p className="text-sm">Showing sample investment properties for demonstration.</p>
          </motion.div>
        )}

        {filteredProperties.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProperties.map((property) => (
              <motion.div key={property._id} variants={itemVariants}>
                <InvestmentPropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-10 bg-white rounded-xl shadow-sm">
            <TrendingUp className="w-12 h-12 text-amber-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">No investment properties available</h3>
            <p className="text-gray-600 mb-6">No investment properties found in this category.</p>
            <button 
              onClick={() => setActiveCategory('all')} 
              className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              View All Investments
            </button>
          </div>
        )}

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={viewAllInvestments}
            className="inline-flex items-center px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20 font-medium"
          >
            Browse All Investment Properties
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
          <p className="text-gray-600 mt-4 text-sm">
            Explore our complete collection of investment opportunities with attractive returns
          </p>
        </motion.div>
      </div>
    </section>
  );
};

InvestmentPropertyCard.propTypes = {
  property: PropTypes.object.isRequired
};

export default FeaturedInvestedProperties;