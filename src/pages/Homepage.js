import React, { useState } from 'react';
import { devices, brands } from '../components/brand_n_device';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const navigate = useNavigate();

  const handleDeviceChange = (device) => {
    setSelectedDevice(device);
    setSelectedBrand(null);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const handleGoBackToDevice = () => {
    setSelectedDevice(null);
    setSelectedBrand(null);
  };

  const handleGoBackToBrand = () => {
    setSelectedBrand(null);
  };

  const toggleShowCategories = () => {
    setShowCategories((prev) => !prev);
  };

  return (
    <div className="relative p-0 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative bg-white-100 p-12 w-full flex items-center justify-between">
        {/* Left Section (Text Content) */}
        <div className="text-left w-2/3 z-10 relative">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Welcome to IGS Repair Service</h1>
          <p className="text-lg text-gray-700 mb-6">
            Comprehensive solutions for all your electronic needs. From laptops and desktops to accessories and networking, we deliver swift, reliable repairs to restore your devices with excellence.
          </p>
        </div>

        {/* Right Section (Image with Fade Effect) */}
        <div className="absolute inset-0 right-0 flex justify-end">
          <div className="relative w-1/3 h-full z-0">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white"></div>
            {/* Image */}
            <img
              src="/images/hero.jpg" // Replace with your image path
              alt="Hero"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Need Help with a Product Section */}
      <div className="container relative mx-auto mt-4 p-2">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Need Help with a Product?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Panel */}
          <div className="p-8 bg-white shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4">Repair Services</h3>
            <p className="text-gray-600 mb-4">
              Our team of certified experts is ready to assist you with quick and reliable repair solutions for your electronics.
            </p>
            <button
              onClick={toggleShowCategories}
              className="px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              {showCategories ? 'Show Less' : 'Learn More'}
            </button>
          </div>

          {/* Right Panel */}
          <div className="p-8 bg-white shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4">Service Plans</h3>
            <p className="text-gray-600 mb-4">
              Explore our service plans to ensure your products are protected and receive priority support.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700">
              Explore Plans
            </button>
          </div>
        </div>
      </div>

      {/* Product Categories and Live Support Sections */}
      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out ${
          showCategories ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto p-2 mt-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Choose device</h2>
          {!selectedDevice && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {devices.map((device) => (
                <div
                  key={device.name}
                  className="p-8 border shadow-md hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => handleDeviceChange(device)}
                >
                  <div className="flex flex-col items-center">
                    <img src={device.icon} alt={device.name} className="h-24 w-24 object-contain" />
                    <div className="mt-2 text-lg">{device.name}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedDevice && !selectedBrand && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {brands.map((brand) => (
                <div
                  key={brand.name}
                  className="p-8 border shadow-md hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => handleBrandChange(brand)}
                >
                  {brand.logo ? (
                    <img src={brand.logo} alt={brand.name} className="h-32 w-32 object-contain" />
                  ) : (
                    <div className="text-lg font-medium">Other</div>
                  )}
                  <div className="mt-2 text-center">{brand.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Live Support Section */}
      <div
        className={`relative w-screen bg-blue-50 px-24 py-8 mt-12 transition-all duration-700 ${
          showCategories ? 'translate-y-0' : ''
        }`}
      >
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Need Expert Assistance?</h2>
          <p className="text-lg text-gray-700 mb-6">
            Our support team is here to help you. Explore FAQs, get advice, or contact our team directly.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/query')}
              className="px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* Our Repair Services Section */}
      <div className="bg-white py-12 mt-2">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Why Us?</h2>
          <p className="text-lg text-gray-700 mb-6 px-4 md:px-24">
            At IGS Repair Service, we specialize in providing fast, reliable, and affordable solutions for all your electronic devices. Whether it’s a laptop with a failing hard drive, a desktop needing upgrades, a smartphone with a cracked screen, or a server requiring maintenance, our team of certified experts ensures your devices are restored to optimal performance. 
          </p>
          <p className="text-lg text-gray-700 mb-8 px-4 md:px-24">
            With years of experience, a dedication to excellence, and a passion for customer satisfaction, we are committed to delivering repair services that are both professional and efficient. From diagnostics to repairs and maintenance, you can trust IGS to get the job done right.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-blue-900 text-white py-12 mt-0">
        <div className="container mx-auto text-center">
          {/* First Layer: Social Icons */}
          <div className="mb-6 flex justify-center space-x-6">
            <a href="https://internash.us/" target="_blank" rel="noopener noreferrer">
              <img src="/logo/www.png" alt="Website" className="h-8 w-8 hover:opacity-75" />
            </a>
            <a href="https://www.facebook.com/internashglobal" target="_blank" rel="noopener noreferrer">
              <img src="/logo/facebook.png" alt="Facebook" className="h-8 w-8 hover:opacity-75" />
            </a>
            <a href="https://www.linkedin.com/company/internashglobal/" target="_blank" rel="noopener noreferrer">
              <img src="/logo/linkedin.png" alt="LinkedIn" className="h-8 w-8 hover:opacity-75" />
            </a>
          </div>

          {/* Second Layer: Navigation */}
          <div className="mb-6">
            <nav className="flex justify-center space-x-6">
              <span className="text-white text-lg font-medium hover:opacity-75 cursor-pointer">Home</span>
              <span className="text-white text-lg font-medium hover:opacity-75 cursor-pointer">About</span>
              <span className="text-white text-lg font-medium hover:opacity-75 cursor-pointer">Service</span>
              <span className="text-white text-lg font-medium hover:opacity-75 cursor-pointer">Team</span>
              <span className="text-white text-lg font-medium hover:opacity-75 cursor-pointer">Contact</span>
            </nav>
          </div>

          {/* Third Layer: Copyright */}
          <div>
            <p className="text-gray-400 text-sm">Copyrights © 2021. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
