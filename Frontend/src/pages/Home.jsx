import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Instagram, Share2, Copy, Check, Eye, FileText } from 'lucide-react';

function Home() {
  const [formData, setFormData] = useState({ url: "" });
  const [loading, setLoading] = useState(false);
  const [booklet, setBooklet] = useState(null);
  const [errors, setErrors] = useState({});
  
  // Instagram carousel specific state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState('details'); // 'details' or 'carousel'
  const [copied, setCopied] = useState(false);

  // URL validation function
  const validateURL = (url) => {
    if (!url.trim()) {
      return "URL is required";
    }
    const urlPattern = /^https?:\/\/[^\s]+$/;
    if (!urlPattern.test(url)) {
      return "Enter a valid URL";
    }
    return null;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate URL
    const urlError = validateURL(formData.url);
    if (urlError) {
      setErrors({ url: urlError });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Simulated API call - replace with your actual API endpoint
      const response = await fetch("http://localhost:3000/api/creatbooklet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ url: formData.url })
      });

      const data = await response.json();

      if (response.ok) {
        // Success notification (you can replace with your toast implementation)
        console.log("Fetched successfully!");
        setBooklet(data.booklet);
        setFormData({ url: "" }); // Reset form
        setCurrentSlide(0); // Reset carousel
        setViewMode('details'); // Reset view mode
      } else {
        console.error(data.message || "Unexpected response");
        setErrors({ general: data.message || "Something went wrong" });
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Format date nicely
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Instagram carousel functions
  const nextSlide = () => {
    if (booklet?.slides && Array.isArray(booklet.slides)) {
      setCurrentSlide((prev) => (prev + 1) % booklet.slides.length);
    }
  };

  const prevSlide = () => {
    if (booklet?.slides && Array.isArray(booklet.slides)) {
      setCurrentSlide((prev) => (prev - 1 + booklet.slides.length) % booklet.slides.length);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Generate Instagram caption
  const generateCaption = () => {
    const { title = "" } = booklet || {};
    return `📚 New insights from: ${title}\n\n🎯 Key takeaways in ${booklet?.slides?.length || 0} digestible slides! Swipe to explore the full breakdown.\n\n#ContentSummary #Learning #KnowledgeSharing #Insights #DigitalContent`;
  };

  const copyCaption = () => {
    const caption = generateCaption();
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Safe destructuring with fallback
  const { title = "", slides = [] } = booklet || {};
  const hasSlides = Array.isArray(slides) && slides.length > 0;

  // Render carousel view
  const renderCarouselView = () => {
    if (!hasSlides) return null;

    return (
      <div className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        {/* View Mode Toggle */}
        <div className="bg-gray-800 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Instagram className="w-5 h-5 text-pink-400" />
            <span className="text-blue-400 font-medium">Instagram Carousel Preview</span>
          </div>
          <button
            onClick={() => setViewMode('details')}
            className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-all text-sm"
          >
            <FileText className="w-4 h-4" />
            Details View
          </button>
        </div>

        {/* Slide Counter */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">Slide {currentSlide + 1} of {slides.length}</span>
            <div className="flex gap-1">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Slide Content */}
        <div className="relative min-h-80 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="p-6 h-full flex flex-col justify-center">
            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 self-start">
              {title ? `${title.slice(0, 30)}${title.length > 30 ? '...' : ''}` : 'Slide Content'}
            </div>
            
            <div className="text-gray-200 leading-relaxed text-sm sm:text-base max-w-full">
              {typeof slides[currentSlide] === 'string' 
                ? slides[currentSlide] 
                : JSON.stringify(slides[currentSlide], null, 2)
              }
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 p-2 rounded-full shadow-lg transition-all hover:scale-110"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className={`w-5 h-5 ${currentSlide === 0 ? 'text-gray-500' : 'text-gray-200'}`} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 p-2 rounded-full shadow-lg transition-all hover:scale-110"
            disabled={currentSlide === slides.length - 1}
          >
            <ChevronRight className={`w-5 h-5 ${currentSlide === slides.length - 1 ? 'text-gray-500' : 'text-gray-200'}`} />
          </button>
        </div>

        {/* Slide Navigation */}
        <div className="bg-gray-800 p-4">
          <div className="flex justify-center gap-2 flex-wrap">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  index === currentSlide 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Caption Section */}
        <div className="bg-gray-800 p-4 border-t border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-300 font-medium flex items-center gap-2">
              <Share2 className="w-4 h-4 text-blue-400" />
              Instagram Caption
            </span>
            <button
              onClick={copyCaption}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                copied 
                  ? 'bg-green-900 text-green-300' 
                  : 'bg-blue-900 text-blue-300 hover:bg-blue-800'
              }`}
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="bg-gray-700 p-3 rounded-lg">
            <p className="text-gray-300 text-xs leading-relaxed">
              {generateCaption()}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Render details view
  const renderDetailsView = () => {
    return (
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-blue-400 text-2xl sm:text-3xl font-bold">
            Booklet Details
          </h2>
          {hasSlides && (
            <button
              onClick={() => setViewMode('carousel')}
              className="flex items-center gap-2 px-3 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg transition-all text-sm"
            >
              <Instagram className="w-4 h-4" />
              Carousel View
            </button>
          )}
        </div>
        <hr className="border-gray-700 mb-6" />
        
        {booklet ? (
          <div className="space-y-6">
            {/* Title */}
            {title && (
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Title:</h3>
                <p className="text-white text-base leading-relaxed">{title}</p>
              </div>
            )}
            
            {/* Slides */}
            {hasSlides && (
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-4">
                  Slides ({slides.length}):
                </h3>
                <div className="space-y-4">
                  {slides.map((slide, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-blue-300 font-medium mb-2">
                        Slide {index + 1}
                      </h4>
                      <p className="text-gray-200 text-sm leading-relaxed">
                        {typeof slide === 'string' ? slide : JSON.stringify(slide)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Creation Date if available */}
            {booklet.createdAt && (
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Created:</h3>
                <p className="text-gray-400 text-sm">{formatDate(booklet.createdAt)}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No booklet data yet</div>
            <p className="text-gray-600 text-sm">
              Enter a URL above to generate your booklet
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-start justify-around bg-gray-950 px-4 py-28 gap-8">
      {/* Form Section */}
      <div className="w-full max-w-lg">

        <div className="w-full bg-gray-900 p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-stretch gap-3">
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter URL or paste..."
            autoComplete="off"
            className="flex-1 px-4 py-2 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base border border-gray-700"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 sm:px-6 sm:py-2 rounded-lg transition-all text-sm sm:text-base font-medium ${
              loading
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
            }`}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>

        {/* Error Messages */}
        {errors.url && (
          <p className="mt-3 text-red-400 text-sm text-center sm:text-left">
            {errors.url}
          </p>
        )}
        
        {errors.general && (
          <p className="mt-3 text-red-400 text-sm text-center sm:text-left">
            {errors.general}
          </p>
        )}
      </div>

      {/* Dynamic Content Section */}
      <div className="w-full max-w-2xl">
        {viewMode === 'details' ? renderDetailsView() : renderCarouselView()}
      </div>
    </div>
  );
}

export default Home;