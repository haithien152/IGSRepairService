import { useRouter } from 'next/router';
import React, { useState } from 'react';

const SelectBrand = () => {
  const router = useRouter();
  const { device } = router.query; // Get device from the URL parameter
  const [selectedBrand, setSelectedBrand] = useState('');

  // Brands for each device
  const brandsByDevice = {
    Laptop: ['Dell', 'Asus', 'Gigabyte', 'HP', 'Lenovo', 'MSI'],
    'Docking Station': ['Dell', 'HP', 'Lenovo'],
    Monitor: ['Dell', 'Asus', 'Gigabyte', 'HP', 'Lenovo'],
    Keyboard: ['Dell', 'Asus', 'MSI'],
    Mouse: ['Dell', 'Asus', 'MSI'],
    Headset: ['Asus', 'MSI', 'Dell'],
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">Select Brand for {device}</h1>
      
      {device && brandsByDevice[device] ? (
        <div>
          <h3 className="text-xl font-semibold mb-4">Choose a Brand</h3>
          <select
            className="w-full p-3 border border-gray-300 rounded"
            value={selectedBrand}
            onChange={handleBrandChange}
          >
            <option value="">Select a Brand</option>
            {brandsByDevice[device].map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          {/* Display selected brand */}
          {selectedBrand && (
            <div className="mt-4 p-4 bg-gray-200 rounded-lg">
              <p>You selected: <strong>{selectedBrand}</strong> for {device}</p>
            </div>
          )}
        </div>
      ) : (
        <p>No brands available for {device}</p>
      )}
    </div>
  );
};

export default SelectBrand;
