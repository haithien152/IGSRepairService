import React, { useState } from 'react';
import { useLogin } from '../contexts/LoginContext'; // Import the useLogin hook

const Dashboard = () => {
  const { isLoggedIn } = useLogin();

  const devices = [
    { name: 'Laptop', icon: '/logo/laptop.png' },
    { name: 'Desktop', icon: '/logo/desktop.png' },
    { name: 'Accessories', icon: '/logo/accessories.png' },
    { name: 'Monitor', icon: '/logo/monitor.png' },
    { name: 'Server', icon: '/logo/server.png' },
  ];

  const brands = [
    { name: 'Dell', logo: '/logo/dell-logo.svg', supportLink: 'https://www.dell.com/support/contents/en-us/Category/product-support/self-support-knowledgebase/locate-service-tag/', identifier: 'Service Tag' },
    { name: 'Asus', logo: '/logo/asus-logo.svg', supportLink: 'https://www.asus.com/us/support/article/566/', identifier: 'Serial Number' },
    { name: 'Gigabyte', logo: '/logo/gigabyte-logo.svg', supportLink: 'https://www.gigabyte.com/Support/Consumer/Identification/Product-Model-and-Serial-Number/', identifier: 'Serial Number' },
    { name: 'HP', logo: '/logo/hp-logo.svg', supportLink: 'https://support.hp.com/si-en/document/ish_2039298-1862169-16', identifier: 'Serial Number' },
    { name: 'Lenovo', logo: '/logo/lenovo-logo.svg', supportLink: 'https://support.lenovo.com/us/en/solutions/ht510152-how-to-find-serial-numbers-pc', identifier: 'Serial Number' },
    { name: 'MSI', logo: '/logo/msi-logo.svg', supportLink: 'https://www.msi.com/support/technical-details', identifier: 'Serial Number' },
    { name: 'Other', logo: '/logo/other-logo.svg', supportLink: null, identifier: 'Serial Number' },
  ];

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [serviceTag, setServiceTag] = useState('');

  const handleDeviceChange = (device) => {
    setSelectedDevice(device);
    setSelectedBrand(null);
    setServiceTag('');
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const handleGoBackToDevice = () => {
    setSelectedDevice(null);
    setSelectedBrand(null);
    setServiceTag('');
  };

  const handleGoBackToBrand = () => {
    setSelectedBrand(null);
    setServiceTag('');
  };

  const handleServiceTagChange = (e) => {
    setServiceTag(e.target.value);
  };

  return (
    <div className="container mx-auto p-8 min-h-screen">
      {isLoggedIn && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ul>
              <li className="border-b py-2">Work Order Created</li>
              <li className="border-b py-2">Ticket Closed</li>
              <li className="border-b py-2">Invoice Paid</li>
            </ul>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <ul>
              <li className="border-b py-2">New Work Order</li>
              <li className="border-b py-2">Trouble Ticket Updated</li>
              <li className="border-b py-2">Invoice Sent</li>
            </ul>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <ul>
              <li className="border-b py-2 text-blue-600">Create Work Order</li>
              <li className="border-b py-2 text-blue-600">Submit Ticket</li>
              <li className="border-b py-2 text-blue-600">View Invoices</li>
            </ul>
          </div>
        </div>
      )}

      {!selectedDevice && (
        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-full min-h-[50vh] flex flex-col justify-center items-center my-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Select a Device</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4 w-full justify-center items-center">
            {devices.map((device) => (
              <div
                key={device.name}
                className="p-8 border rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handleDeviceChange(device)}
              >
                <div className="flex flex-col items-center justify-center">
                  <img src={device.icon} alt={device.name} className="h-32 w-32 object-contain" />
                  <div className="mt-2 text-center">{device.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedDevice && !selectedBrand && (
        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-full min-h-[50vh] flex flex-col justify-center items-center my-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Select a Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4 w-full justify-center items-center">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="p-8 border rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handleBrandChange(brand)}
              >
                <div className="flex flex-col items-center justify-center">
                  <img src={brand.logo} alt={brand.name} className="h-32 w-32 object-contain" />
                  <div className="mt-2 text-center">{brand.name}</div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleGoBackToDevice}
            className="mt-4 p-3 bg-gray-300 rounded text-blue-600 hover:bg-gray-400 w-full"
          >
            Back
          </button>
        </div>
      )}

      {selectedDevice && selectedBrand && (
        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-full min-h-[50vh] flex flex-col justify-center items-center my-8">
          <h2 className="text-xl font-semibold mb-4 text-center">{selectedBrand.name}</h2>
          <p className="mt-2">
            Find your {selectedBrand.identifier} on{' '}
            {selectedBrand.supportLink ? (
              <a
                href={selectedBrand.supportLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                How to find {selectedBrand.identifier}
              </a>
            ) : (
              'your product documentation.'
            )}
          </p>
          <div className="mt-4">
            <label htmlFor="serviceTag" className="block text-sm font-medium text-gray-700">
              Enter your {selectedBrand.identifier}:
            </label>
            <input
              type="text"
              id="serviceTag"
              value={serviceTag}
              onChange={handleServiceTagChange}
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder={selectedBrand.identifier}
            />
          </div>
          <button
            onClick={handleGoBackToBrand}
            className="mt-4 p-3 bg-gray-300 rounded text-blue-600 hover:bg-gray-400 w-full"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
